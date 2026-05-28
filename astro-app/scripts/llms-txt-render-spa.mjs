#!/usr/bin/env node
/**
 * llms-txt-render-spa.mjs
 *
 * CLI fallback for the llms.txt generator. Use this when the public endpoint
 * at /api/llms-txt-generator/generate cannot finish a site (Netlify Functions
 * have a 30s sync timeout, and the remote rendering fallback via Jina Reader
 * sometimes does not return in time, e.g. pure SPAs with many routes or sites
 * behind aggressive anti-bot protection).
 *
 * What it does:
 *   - Launches a real headless Chromium via Playwright.
 *   - Waits for the SPA to hydrate (default 3.5s) on each page.
 *   - Reuses the same extractPage + generateLlmsFiles pipeline as production,
 *     so output format matches the public endpoint byte-for-byte.
 *
 * Usage:
 *   node scripts/llms-txt-render-spa.mjs <url> [maxPages] [outDir]
 *   STRIP_STATIC_META=1 WAIT_MS=4500 node scripts/llms-txt-render-spa.mjs https://fellowfunders.es/ 30 ./generated/ff
 *
 * Env:
 *   WAIT_MS              ms to wait after networkidle (default 3500)
 *   STRIP_STATIC_META=1  remove static <meta description|og:description|twitter:description>
 *                        before extraction. Useful when an SPA serves the same
 *                        meta tags on every route and overrides the per-page
 *                        content. Falls back to first rendered <p>.
 *
 * Requires:
 *   npm i -D playwright
 *   npx playwright install chromium
 */

import { chromium } from "playwright";
import { extractPage } from "../src/lib/llms-txt/extract.js";
import { generateLlmsFiles } from "../src/lib/llms-txt/generator.js";
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const START_URL = process.argv[2];
const MAX_PAGES = Number(process.argv[3] || 20);
const OUT_DIR = process.argv[4] || `./generated/${new URL(START_URL).hostname}`;
const WAIT_MS = Number(process.env.WAIT_MS || 3500);

if (!START_URL) {
  console.error("Usage: node scripts/llms-txt-render-spa.mjs <url> [maxPages] [outDir]");
  process.exit(2);
}

mkdirSync(OUT_DIR, { recursive: true });

const startUrl = new URL(START_URL);
const origin = startUrl.origin;

const queue = [startUrl.href];
const seen = new Set([startUrl.href]);
const pages = [];
const errors = [];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 G4U-llms-txt-generator"
});
const page = await context.newPage();

console.error(`Rendering ${START_URL} with Playwright, max=${MAX_PAGES} pages, wait=${WAIT_MS}ms`);

while (queue.length && pages.length < MAX_PAGES) {
  const next = queue.shift();
  try {
    console.error(`-> ${next}`);
    await page.goto(next, { waitUntil: "networkidle", timeout: 45_000 });
    await page.waitForTimeout(WAIT_MS);

    let html = await page.content();
    if (process.env.STRIP_STATIC_META === "1") {
      html = html
        .replace(/<meta[^>]+name=["']description["'][^>]*>/gi, "")
        .replace(/<meta[^>]+property=["']og:description["'][^>]*>/gi, "")
        .replace(/<meta[^>]+name=["']twitter:description["'][^>]*>/gi, "");
    }
    const extracted = extractPage(html, next, "text/html");

    if (!extracted.text && !extracted.markdown) {
      console.error("   (skipped: no readable content)");
      continue;
    }

    pages.push(extracted);

    for (const link of extracted.links) {
      const u = safeUrl(link, next);
      if (!u) continue;
      if (u.origin !== origin) continue;
      if (seen.has(u.href)) continue;
      if (isJunkPath(u.pathname)) continue;
      seen.add(u.href);
      queue.push(u.href);
    }
  } catch (error) {
    console.error(`   error: ${error.message}`);
    errors.push({ url: next, message: error.message });
  }
}

await browser.close();

if (!pages.length) {
  console.error("No pages rendered. Aborting.");
  process.exit(1);
}

const home = pages.find((p) => new URL(p.url).pathname === "/") || pages[0];
const hostname = startUrl.hostname.replace(/^www\./, "");

const crawlResult = {
  startUrl: startUrl.href,
  site: {
    title: extractSiteTitle(home.title || hostname, hostname),
    description: home.description || `Important pages discovered for ${hostname}.`
  },
  pages,
  errors
};

const result = generateLlmsFiles(crawlResult);

writeFileSync(path.join(OUT_DIR, "llms.txt"), result.llmsTxt);
writeFileSync(path.join(OUT_DIR, "llms-full.txt"), result.llmsFullTxt);
writeFileSync(path.join(OUT_DIR, "result.json"), JSON.stringify(result, null, 2));

console.error(`\nDone. ${pages.length} pages rendered.`);
console.error(`Quality: ${result.quality.score}/100, ${result.quality.grade}`);
console.error(`Output: ${OUT_DIR}/`);

function safeUrl(href, base) {
  try {
    return new URL(href, base);
  } catch {
    return null;
  }
}

function isJunkPath(p) {
  return /(login|signin|signup|register|cart|checkout|admin|wp-admin|callback|wallet|verifies-email|my-account|employees|global-position|investment-opportunities|api\/)/i.test(
    p
  );
}

function extractSiteTitle(rawTitle, fallback) {
  const t = String(rawTitle || "").trim();
  if (!t) return fallback;
  const seps = [" | ", " - ", " :: "];
  for (const s of seps) {
    if (t.includes(s)) {
      const parts = t.split(s).map((x) => x.trim()).filter(Boolean);
      const shortest = [...parts].sort((a, b) => a.length - b.length)[0];
      if (shortest && shortest.length <= 48) return shortest;
    }
  }
  return t.length > 80 ? fallback : t;
}

# astro-app scripts

CLI tools that complement the public Astro app and Netlify Functions.

## llms-txt-render-spa.mjs

**When to use:** Fallback for the public `llms.txt` generator at
`https://growth4u.io/llms-txt-generator/`. The public endpoint runs on a
Netlify Function with a 30s sync timeout and uses Jina Reader
(`r.jina.ai`) as its remote rendering fallback for SPAs. For sites where
that combination is too slow (many SPA routes, aggressive anti-bot, very
large bundles, or geo-restricted), use this script locally — it launches
a real headless Chromium via Playwright and runs without the function
timeout.

It reuses `src/lib/llms-txt/extract.js` and `src/lib/llms-txt/generator.js`
so the `llms.txt` / `llms-full.txt` output is byte-for-byte the same
format as the production endpoint.

### Setup

```bash
cd astro-app
npm install                       # installs playwright as devDep
npx playwright install chromium   # ~150MB browser binary
```

### Usage

```bash
# Defaults: maxPages=20, outDir=./generated/<hostname>
npm run llms-txt:render-spa -- https://example.com/

# Custom output directory and page cap
npm run llms-txt:render-spa -- https://example.com/ 30 ./generated/example

# Strip static meta description so SPA pages do not all share the same one
STRIP_STATIC_META=1 WAIT_MS=4500 \
  npm run llms-txt:render-spa -- https://fellowfunders.es/ 30 ./generated/fellowfunders.es
```

### Environment variables

- `WAIT_MS` (default `3500`) — milliseconds to wait after `networkidle`
  on each page. Increase for slow-hydrating frameworks.
- `STRIP_STATIC_META=1` — removes `<meta name="description">`,
  `<meta property="og:description">`, and `<meta name="twitter:description">`
  before passing HTML to `extractPage`. Use when an SPA serves the same
  static meta tags on every route; the extractor will then fall back to
  the first rendered `<p>` for the description, producing a unique one
  per page.

### Output

Writes three files into the output directory:

- `llms.txt` — the simplified file to publish at `https://dominio.com/llms.txt`.
- `llms-full.txt` — full content bundle for `https://dominio.com/llms-full.txt`.
- `result.json` — raw crawler output with quality score, stats, and per-page metadata.

### Known cases handled

- **Pure SPA shells** (Vite/React/Vue/Svelte/Angular with `<div id="app">` and
  empty body): rendered correctly because Chromium executes the bundle.
- **Anti-bot stalls** that block the public endpoint until the Netlify
  timeout: the CLI has no such timeout and will finish.
- **Sites discoverable only through client-side routing** (no sitemap,
  no `<a href>` in initial HTML): Playwright crawls the rendered DOM
  for `<a href>` after hydration.

### When NOT to use this

For static/SSR sites, prefer the public endpoint at
`https://growth4u.io/llms-txt-generator/`. It is faster and does not
require launching a browser.

### Cleaning up tracking parameters

Some sites add UTM-style query params to internal links (for example,
`?origin=Investment+Opportunities` on FellowFunders). The crawler keeps
them as-is to faithfully represent the rendered DOM. Strip them before
uploading to the client's server:

```bash
sed -i '' 's|?origin=Investment+Opportunities||g' \
  generated/fellowfunders.es/llms.txt \
  generated/fellowfunders.es/llms-full.txt
```

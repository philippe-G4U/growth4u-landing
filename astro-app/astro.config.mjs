import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://growth4u.io',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    tailwind(),
    sitemap({
      filter: (page) =>
        !page.includes('/admin') && !page.includes('/feedback'),
      customPages: [
        'https://growth4u.io/',
        'https://growth4u.io/blog/',
        'https://growth4u.io/casos-de-exito/',
        'https://growth4u.io/privacidad/',
        'https://growth4u.io/cookies/',
      ],
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
});

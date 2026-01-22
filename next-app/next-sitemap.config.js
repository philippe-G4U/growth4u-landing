/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://growth4u.io',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './out',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  transform: async (config, path) => {
    // Set priority based on path
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/blog' || path === '/blog/') {
      priority = 0.8;
      changefreq = 'daily';
    } else if (path.startsWith('/blog/')) {
      priority = 0.7;
      changefreq = 'weekly';
    } else if (path === '/privacidad' || path === '/cookies') {
      priority = 0.3;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};

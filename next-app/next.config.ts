import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  async redirects() {
    return [
      // Redirect old URLs with query params to new clean URLs
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'articulo',
            value: '(?<slug>.*)',
          },
        ],
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/blog',
        has: [
          {
            type: 'query',
            key: 'articulo',
            value: '(?<slug>.*)',
          },
        ],
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'page',
            value: 'privacidad',
          },
        ],
        destination: '/privacidad',
        permanent: true,
      },
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'page',
            value: 'cookies',
          },
        ],
        destination: '/cookies',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

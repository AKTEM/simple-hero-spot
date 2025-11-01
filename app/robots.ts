import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/wp-admin/',
          '/wp-content/',
          '/wp-includes/',
          '/api/',
          '/dashboard/',
          '/auth/',
          '/admin/',
          '/*.json',
          '/*?*utm_*',
          '/*?*fbclid*',
          '/*?*gclid*'
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      }
    ],
    sitemap: [
      `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL || 'https://emytrends.com'}/sitemap.xml`,
      `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL || 'https://emytrends.com'}/sitemap-news`
    ],
    host: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL || 'https://emytrends.com'
  };
}
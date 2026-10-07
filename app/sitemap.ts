import { MetadataRoute } from 'next';
import { CASES } from '../lib/data'; // Adjust path if your data is elsewhere

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://after-the-silence.vercel.app'; // TODO: Replace with your actual domain

  // 1. Static core pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/cases`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/timeline`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sources`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];

  // 2. Dynamically generate URLs for all case files
  const casePages: MetadataRoute.Sitemap = CASES.map((c) => ({
    url: `${baseUrl}/cases/${c.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...casePages];
}
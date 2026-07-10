// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Update this if a custom domain is connected later.
export default defineConfig({
  site: 'https://portfolio-debashmitaojhas-projects.vercel.app',
  integrations: [sitemap()],
});

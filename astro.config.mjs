// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site URL is a placeholder until the real domain/host is chosen (Phase 5).
export default defineConfig({
  site: 'https://debashmitaojha.netlify.app',
  integrations: [sitemap()],
});

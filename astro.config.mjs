import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://campus.umai.edu.ar',
  output: 'server',
  adapter: vercel(),
  build: {
    assets: '_assets',
  },
});

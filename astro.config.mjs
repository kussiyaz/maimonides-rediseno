import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://campus.umai.edu.ar',
  output: 'static',
  build: {
    assets: '_assets',
  },
});

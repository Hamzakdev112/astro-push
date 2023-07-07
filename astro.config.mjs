import { defineConfig } from 'astro/config';
import worker from 'astro-service-worker/adapter';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";


// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'hybrid',
  adapter: cloudflare()
});
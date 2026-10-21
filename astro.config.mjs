import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://royaldrivemechanics.ca',
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: {
      enabled: true
    }
  }),
  integrations: [
    tailwind(),
    preact({
      include: ['**/islands/*', '**/components/islands/*']
    }),
    sitemap({
      filter: (page) => !page.includes('/booking/confirmed') && !page.includes('/api/'),
    })
  ],
  vite: {
    server: {
      allowedHosts: ['.trycloudflare.com', 'localhost', '127.0.0.1'],
    },
    ssr: {
      noExternal: ['@fontsource/saira', '@fontsource/inter']
    }
  }
});

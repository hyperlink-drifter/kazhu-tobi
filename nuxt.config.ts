import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-01',

  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    componentIslands: {
      remoteIsland: true,
      selectiveClient: true,
    },
  },

  runtimeConfig: {
    vendureShopApi: process.env.NUXT_VENDURE_SHOP_API,
  },

  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    '@nuxt/image',
    '@nuxtjs/i18n',
    'shadcn-nuxt',
    '@nuxthub/core',
    '@nuxt/scripts',
  ],

  hub: {},

  i18n: {
    defaultLocale: 'uk',
    strategy: 'prefix_and_default',
    detectBrowserLanguage: false,
    baseUrl: process.env.NUXT_PUBLIC_I18N_BASE_URL,
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'uk', language: 'uk-UK', name: 'українська', file: 'uk.json' },
      { code: 'de', language: 'de-De', name: 'Deutsch', file: 'de.json' },
    ],
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './app/components/ui',
  },
});

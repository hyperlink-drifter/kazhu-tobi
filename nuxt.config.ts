import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-01',

  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: process.env.NUXT_PUBLIC_VENDURE_SHOP_API,
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      vendureShopApi: process.env.NUXT_PUBLIC_VENDURE_SHOP_API,
    },
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
    'nuxt-graphql-client',
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

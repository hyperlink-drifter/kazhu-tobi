import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
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
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'uk', name: 'українська', file: 'uk.json' },
      { code: 'de', name: 'Deutsch', file: 'de.json' },
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

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

  modules: ['@nuxt/image', '@nuxtjs/i18n', 'shadcn-nuxt', '@nuxthub/core'],

  hub: {},

  i18n: {
    vueI18n: '@@/i18n.config.ts',
    locales: ['en', 'uk', 'de'],
    defaultLocale: 'uk',
    strategy: 'prefix',
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

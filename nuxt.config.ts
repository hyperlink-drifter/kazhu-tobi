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

  modules: ['@nuxt/image', '@nuxtjs/i18n'],

  i18n: {
    vueI18n: '@@/i18n.config.ts',
    locales: ['en', 'uk', 'de'],
    defaultLocale: 'uk',
    strategy: 'prefix',
  },
});

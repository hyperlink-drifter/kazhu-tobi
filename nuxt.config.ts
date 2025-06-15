import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-01',

  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    typedPages: true,
    componentIslands: {
      remoteIsland: true,
      selectiveClient: true,
    },
  },

  runtimeConfig: {
    vendureShopApi: process.env.NUXT_VENDURE_SHOP_API,
    wayforpayUrl: process.env.WAYFORPAY_URL,
    wayforpayMerchantAccount: process.env.WAYFORPAY_MERCHANT_ACCOUNT,
    wayforpayMerchantDomainName: process.env.WAYFORPAY_MERCHANT_DOMAIN_NAME,
    wayforpayMerchantSecretKey: process.env.WAYFORPAY_MERCHANT_SECRET_KEY,
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
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
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
    prefix: '',
    componentDir: './app/components/ui',
  },
});

import { defineNuxtModule } from '@nuxt/kit';
import { defu } from 'defu';

export default defineNuxtModule({
  meta: {
    // Usually the npm package name of your module
    name: '@hyperlinkdrifter/vendure-nuxt',
    // The key in `nuxt.config` that holds your module options
    configKey: 'vendure',
    // Compatibility constraints
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '>=3.0.0',
    },
  },
  // Default configuration options for your module, can also be a function returning those
  defaults: {},
  // Shorthand sugar to register Nuxt hooks
  hooks: {},
  // The function holding your module logic, it can be asynchronous
  setup(options, nuxt) {
    if (!process.env.VENDURE_GRAPHQL_API_URL) {
      console.warn(
        `[nuxt-vendure] Environment Variable 'VENDURE_GRAPHQL_API_URL' missing.`
      );
    }

    nuxt.options['graphql-client'] = defu(
      {
        documentPaths: ['../modules/vendure/graphql'],
        clients: {
          vendure: {
            host: process.env.VENDURE_GRAPHQL_API_URL
              ? process.env.VENDURE_GRAPHQL_API_URL
              : '',
          },
        },
      },
      nuxt.options['graphql-client']
    );

    console.info(nuxt.options['graphql-client']);
  },
});

import { defineNuxtModule, createResolver, addImportsDir } from '@nuxt/kit';
import { defu } from 'defu';

export interface ModuleOptions {
  endpoints?: {
    shop?: string;
    admin?: string;
  };
}

export default defineNuxtModule<ModuleOptions>({
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
  setup(_, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    addImportsDir(resolve('types'));

    nuxt.options['graphql-client'] = defu(
      {
        documentPaths: ['../modules/vendure/graphql'],
        clients: {
          vshop: {
            host: 'https://vendure.hyperlink-drifter.com/shop-api',
          },
        },
      },
      nuxt.options['graphql-client']
    );
  },
});

import { defineNuxtModule } from '@nuxt/kit';
import { generate } from '@graphql-codegen/cli';
import type { CodegenConfig } from '@graphql-codegen/cli';

export interface ModuleOptions {
  endpoints?: {
    shop?: string;
    admin?: string;
  };
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    // Usually the npm package name of your module
    name: '@hyperlink-drifter/v',
    // The key in `nuxt.config` that holds your module options
    configKey: 'v',
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
  async setup() {
    const config: CodegenConfig = {
      schema: 'https://vendure.hyperlink-drifter.com/shop-api',
      documents: ['./**/*.{gql,graphql}'],
      generates: {
        'graphql/generated.ts': {
          plugins: [
            'typescript',
            'typescript-operations',
            'typescript-graphql-request',
          ],
          config: {
            rawRequest: true,
            useTypeImports: true,
          },
        },
        'graphql/schema.graphql': {
          plugins: ['schema-ast'],
          config: {
            includeDirectives: true,
          },
        },
      },
    };

    await generate({ ...config, cwd: process.cwd() }, true);
  },
});

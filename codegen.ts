import type { CodegenConfig } from '@graphql-codegen/cli';

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
  },
};

export default config;

import { GraphQLClient } from 'graphql-request';
import { getSdk } from '@@/graphql/generated';

export default defineNuxtPlugin((nuxtApp) => {
  const client = new GraphQLClient(process.env.NUXT_VENDURE_SHOP_API as string);
  const v = getSdk(client);

  return {
    provide: {
      v,
    },
  };
});

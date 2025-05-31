import { GraphQLClient } from 'graphql-request';
import { getSdk } from '@@/graphql/generated';

export default defineNuxtPlugin((nuxtApp) => {
  const client = new GraphQLClient(nuxtApp.$config.vendureShopApi);
  const v = getSdk(client);

  return {
    provide: {
      v,
    },
  };
});

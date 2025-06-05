import { GraphQLClient } from 'graphql-request';
// import { getSdk } from '@@/graphql/graphql';

export default defineNuxtPlugin((nuxtApp) => {
  const client = new GraphQLClient(nuxtApp.$config.vendureShopApi);
  // const vendure = getSdk(client);

  return {
    provide: {
      // vendure,
    },
  };
});

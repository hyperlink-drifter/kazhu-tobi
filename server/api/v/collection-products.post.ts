import { GraphQLClient } from 'graphql-request';
import { getSdk } from '@@/graphql/generated';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const runtimeConfig = useRuntimeConfig();

  const client = new GraphQLClient(runtimeConfig.vendureShopApi);

  const sdk = getSdk(client);

  const { data } = await sdk.GetCollectionProducts(body.variables);

  return data;
});

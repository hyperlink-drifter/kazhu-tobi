import { GraphQLClient } from 'graphql-request';
import { getSdk } from '@@/graphql/generated';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const authCookie = getCookie(event, 'auth-token');

  const runtimeConfig = useRuntimeConfig();

  const client = new GraphQLClient(runtimeConfig.vendureShopApi, {
    headers: () => ({
      ...(authCookie && { Authorization: `Bearer ${authCookie}` }),
    }),
  });

  const sdk = getSdk(client);

  const { data, headers } = await sdk.GetProduct(body.variables);

  const token = headers.get('vendure-auth-token');

  if (token) {
    setCookie(event, 'auth-token', token, { httpOnly: true });
  }

  return data;
});

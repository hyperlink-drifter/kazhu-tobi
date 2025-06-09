import { GraphQLClient } from 'graphql-request';
import { getSdk } from '@@/graphql/generated';

const runtimeConfig = useRuntimeConfig();

const client = new GraphQLClient(runtimeConfig.vendureShopApi);

export const $v = getSdk(client);

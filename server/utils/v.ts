import { GraphQLClient } from 'graphql-request';
import { getSdk } from '@@/graphql/generated';

const client = new GraphQLClient(
  'https://vendure.hyperlink-drifter.com/shop-api'
);

export const $v = getSdk(client);

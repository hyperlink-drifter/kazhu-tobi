import type { GetActiveOrderQuery } from '@@/graphql/generated';

export const cartQuery = defineQueryOptions({
  key: ['cart'],
  query: () => useRequestFetch()<GetActiveOrderQuery>('/api/order/get-active'),
});

import type { GetTopLevelCollectionsQuery } from '@@/graphql/generated';

export const collectionsTopLevelQuery = defineQueryOptions({
  key: ['collections-top-level'],
  query: () =>
    useRequestFetch()<GetTopLevelCollectionsQuery>(
      '/api/collections/top-level'
    ),
});

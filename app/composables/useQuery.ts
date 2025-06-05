import type { TypedDocumentString } from '@@/graphql/graphql';

export async function useQuery<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<TResult> {
  const requestFetch = useRequestFetch();

  const { data } = await requestFetch<{ data: TResult }>(
    'https://vendure.hyperlink-drifter.com/shop-api',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/graphql-response+json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  return data;
}

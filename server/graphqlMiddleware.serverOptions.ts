import { defineGraphqlServerOptions } from 'nuxt-graphql-middleware/server-options';

export default defineGraphqlServerOptions({
  onServerResponse(event, graphqlResponse) {
    const token = graphqlResponse.headers.get('vendure-auth-token');

    if (token) {
      appendResponseHeader(event, 'vendure-auth-token', token);
    }

    // Return the GraphQL response.
    return graphqlResponse._data;
  },

  // Provide the options for the ofetch request to the GraphQL server.
  serverFetchOptions(event) {
    return {
      headers: {
        Authorization: getHeader(event, 'Authorization'),
      },
    };
  },
});

import { useLocalStorage } from '@vueuse/core';

export default defineNuxtPlugin({
  name: 'custom-plugin:graphql-state',
  dependsOn: ['nuxt-graphql-middleware-provide-state'],
  setup() {
    const state = useGraphqlState();

    const token = useLocalStorage('auth-token', '');

    if (!state) {
      // This can only happen if this plugin somehow runs before
      // nuxt-graphql-middleware-provide-state, which should never be the case
      // as long as `dependsOn` is set.
      throw new Error('GraphQL state not available.');
    }

    // Set fetch options for all GraphQL queries and mutations.
    state.fetchOptions = {
      // Header value is evaluated on every request.
      onRequest({ options }) {
        if (token.value) {
          options.headers.set('Authorization', `Bearer ${token.value}`);
        }
      },

      // Handle headers sent from the middleware to the Nuxt app (client or server side).
      onResponse(result) {
        const headers = result.response?.headers;
        const newToken = headers?.get('vendure-auth-token');
        if (newToken) {
          token.value = newToken;
        }
      },
    };
  },
});

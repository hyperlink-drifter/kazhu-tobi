import { getProxyRequestHeaders } from 'h3';
import { useLocalStorage } from '@vueuse/core';

export default defineNuxtPlugin({
  name: 'plugin:nuxt-graphql-middleware-token-handling',
  dependsOn: ['nuxt-graphql-middleware-provide-state'],
  setup() {
    const state = useGraphqlState();

    if (!state) {
      // This can only happen if this plugin somehow runs before
      // nuxt-graphql-middleware-provide-state, which should never be the case
      // as long as `dependsOn` is set.
      throw new Error('GraphQL state not available.');
    }

    if (import.meta.client) {
      const token = useLocalStorage('auth-token', '');

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
    }

    if (import.meta.server) {
      // The event is guaranteed to be available here, because the code is
      // only executed on the server.
      const event = useRequestEvent()!;

      state.fetchOptions = {
        // This will forward headers such as "x-forwarded-host" to the
        // middleware, excluding headers that can't be forwarded such as
        // "Host" or "Accept".
        headers: getProxyRequestHeaders(event),
      };
    }
  },
});

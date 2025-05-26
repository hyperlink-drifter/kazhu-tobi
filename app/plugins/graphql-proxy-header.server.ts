import { getProxyRequestHeaders } from 'h3';

export default defineNuxtPlugin({
  name: 'plugin:graphql-proxy',
  dependsOn: ['nuxt-graphql-middleware-provide-state'],
  setup() {
    if (import.meta.server) {
      const state = useGraphqlState();

      if (!state) {
        // This can only happen if this plugin somehow runs before
        // nuxt-graphql-middleware-provide-state, which should never be the case
        // as long as `dependsOn` is set.
        throw new Error('GraphQL state not available.');
      }

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

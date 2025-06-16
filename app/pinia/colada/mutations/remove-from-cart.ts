import type { AddItemToOrderMutation } from '@@/graphql/generated';

export const useRemoveItemFromCart = defineMutation(() => {
  const orderLineId = ref('');
  const queryCache = useQueryCache();

  const { mutate, ...mutation } = useMutation({
    mutation: (orderLineId: string) =>
      $fetch<AddItemToOrderMutation>('/api/order/remove-item', {
        method: 'POST',
        body: {
          orderLineId,
        },
      }),
    async onSettled() {
      // Invalidate the query to refetch the new cart
      await queryCache.invalidateQueries({ key: ['cart'] });
    },
  });

  return {
    ...mutation,
    // we can still pass the orderLineId to the mutation so it appears in plugins
    // and other places
    removeItemFromCart: () => mutate(orderLineId.value),
    // expose the orderLineId ref
    orderLineId,
  };
});

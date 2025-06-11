import type { AddItemToOrderMutation } from '@@/graphql/generated';

export const useAddItemToCart = defineMutation(() => {
  const productVariantId = ref('');

  const { mutate, ...mutation } = useMutation({
    mutation: (productVariantId: string) =>
      $fetch<AddItemToOrderMutation>('/api/v/order/add-item', {
        method: 'POST',
        body: {
          productVariantId,
          quantity: 1,
        },
      }),
  });

  return {
    ...mutation,
    // we can still pass the productVariantId to the mutation so it appears in plugins
    // and other places
    addItemToCart: () => mutate(productVariantId.value),
    // expose the productVariantId ref
    productVariantId,
  };
});

import type { AddItemToOrderMutation } from '@@/graphql/generated';

export const useAddItemToCart = defineMutation(() => {
  const productVariantId = ref('');
  const queryCache = useQueryCache();
  const isCartOpen = useState('is-cart-open', () => false);

  const { mutate, ...mutation } = useMutation({
    mutation: (productVariantId: string) =>
      $fetch<AddItemToOrderMutation>('/api/order/add-item', {
        method: 'POST',
        body: {
          productVariantId,
          quantity: 1,
        },
      }),
    async onSettled() {
      // Invalidate the query to refetch the new cart
      await queryCache.invalidateQueries({ key: ['cart'] });

      isCartOpen.value = true;
    },
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

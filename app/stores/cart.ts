export const useCartStore = defineStore('cart', () => {
  const count = ref(0);

  return { count };
});

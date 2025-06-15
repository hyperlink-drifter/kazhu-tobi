export const useCartStore = defineStore('cart', () => {
  const isOpen = ref(false);

  return { isOpen };
});

<script lang="ts" setup>
import { ShoppingCart } from 'lucide-vue-next';
import { cartQuery } from '@/pinia/colada/queries/cart';

const cart = useCartStore();

const { refresh } = useQuery(cartQuery);
</script>

<template>
  <Button @click="cart.isOpen = !cart.isOpen" @mouseenter="refresh">
    <ShoppingCart />
  </Button>
</template>

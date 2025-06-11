<script lang="ts" setup>
import { ShoppingCart } from 'lucide-vue-next';
import { cartQuery } from '@/queries/cart';

const isCartOpen = useState('is-cart-open', () => false);

const { refresh } = useQuery(cartQuery);
</script>

<template>
  <Button @click="isCartOpen = !isCartOpen" @mouseenter="refresh">
    <ShoppingCart />
  </Button>
</template>

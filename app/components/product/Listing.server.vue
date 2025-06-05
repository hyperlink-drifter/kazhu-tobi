<script setup lang="ts">
import { GetProducts } from '#shared/graphql/queries';

const { products } = await useQuery(GetProducts, {});
</script>

<template>
  <ul class="grid grid-cols-12 gap-x-2 sm:gap-x-4 gap-y-4">
    <slot :products="products" />
  </ul>
</template>

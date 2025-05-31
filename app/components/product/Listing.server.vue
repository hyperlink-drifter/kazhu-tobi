<script setup lang="ts">
const { $v } = useNuxtApp();

const { data } = await useAsyncData(`products`, () => $v.GetProducts());

const products = computed(() => data?.value?.data.products);

if (!products.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product Not Found' });
}

if (!products.value.items) {
  throw createError({ statusCode: 404, statusMessage: 'Product Not Found' });
}
</script>

<template>
  <ul class="grid grid-cols-12 gap-x-2 sm:gap-x-4 gap-y-4">
    <slot :products="products" />
  </ul>
</template>

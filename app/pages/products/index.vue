<script setup lang="ts">
const { data } = await useAsyncData('products', () => GqlGetProducts());

const products = computed(() => data?.value?.products);

if (!products.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product Not Found' });
}
</script>

<template>
  <div class="max-w-7xl px-6 text-center mx-auto">
    {{ products }}
  </div>
</template>

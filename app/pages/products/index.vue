<script setup lang="ts">
const { data } = await useAsyncData('products', () => GqlGetProducts());

const products = computed(() => data.value?.products);

if (!products.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product Not Found' });
}

if (!products.value.items) {
  throw createError({ statusCode: 404, statusMessage: 'Product Not Found' });
}
</script>

<template>
  <LayoutCenter class="py-8 md:py-12 bg-background">
    <ul class="grid grid-cols-12 gap-x-2 sm:gap-x-4 gap-y-4">
      <li
        v-for="product in products?.items"
        :key="JSON.stringify(product)"
        class="col-span-6 md:col-span-4 xl:col-span-3"
      >
        <ProductTileCard :product="product" />
      </li>
    </ul>
  </LayoutCenter>
</template>

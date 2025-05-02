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
  <div class="max-w-7xl px-4 mx-auto">
    <ul class="grid grid-cols-12 gap-x-4 gap-y-8">
      <li
        v-for="product in products?.items"
        :key="JSON.stringify(product)"
        class="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
      >
        <ProductTileCard :product="product" />
      </li>
    </ul>
  </div>
</template>

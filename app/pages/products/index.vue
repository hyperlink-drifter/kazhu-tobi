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
  <div class="max-w-7xl px-6 text-center mx-auto">
    <ul>
      <li v-for="product in products?.items" :key="JSON.stringify(product)">
        <NuxtLink
          :to="
            $localePath({
              name: 'products-slug',
              params: { slug: product.slug },
            })
          "
        >
          {{ product.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

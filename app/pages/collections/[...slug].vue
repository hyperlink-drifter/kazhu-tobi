<script setup lang="ts">
const route = useRoute();

if (!route.params.slug?.length || !route.params.slug[0]) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Missing Collection Handle',
  });
}

const slug = route.params.slug[0];

const { data: searchResponse } = await useAsyncData(
  `collection-products-${slug}`,
  () =>
    GqlGetCollectionProducts({
      slug,
    })
);

const collectionProducts = computed(() => searchResponse?.value?.search);

const { data: productList } = await useAsyncData(
  `collection-products-full-${slug}`,
  () =>
    GqlGetProducts({
      filter: {
        id: {
          in: collectionProducts.value?.items.map((i) => i.productId),
        },
      },
    })
);

const products = computed(() => productList.value?.products.items);
</script>

<template>
  <LayoutCenter>
    <ul class="grid grid-cols-12 gap-x-2 sm:gap-x-4 md:gap-y-4 gap-y-8">
      <li
        v-for="product in products"
        :key="JSON.stringify(product)"
        class="col-span-6 md:col-span-4 xl:col-span-3"
      >
        <ProductTileCard :product="product" />
      </li>
    </ul>
  </LayoutCenter>
</template>

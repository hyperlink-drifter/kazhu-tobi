<script setup lang="ts">
const route = useRoute();

if (!route.params.slug?.length || !route.params.slug[0]) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Missing Collection Handle',
  });
}

const slug = route.params.slug[0];

const { data } = await useAsyncData(
  `collection-products-${slug}`,
  () =>
    GqlGetCollectionProducts({
      slug,
    }),
  {
    transform: (data) => {
      data.search.items = data.search.items.map((i) => ({
        name: i.productName,
        featuredAsset: i.productAsset,
        ...i,
      }));

      return data;
    },
  }
);

const products = computed(() => data?.value?.search);
</script>

<template>
  <LayoutCenter>
    <ul class="grid grid-cols-12 gap-x-4 gap-y-8">
      <li
        v-for="product in products?.items"
        :key="JSON.stringify(product)"
        class="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
      >
        <ProductTileCard :product="product" />
      </li>
    </ul>
  </LayoutCenter>
</template>

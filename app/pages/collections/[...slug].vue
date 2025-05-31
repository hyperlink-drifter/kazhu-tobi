<script setup lang="ts">
import type {
  GetProductsQuery,
  GetCollectionProductsQuery,
} from '@@/graphql/generated';

const route = useRoute();

if (!route.params.slug?.length || !route.params.slug[0]) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Missing Collection Handle',
  });
}

const slug = route.params.slug[0];

const { data } = await useFetch<GetCollectionProductsQuery>(
  '/api/v/collection-products',
  {
    method: 'post',
    body: {
      variables: {
        slug,
      },
    },
  }
);

const xyz = computed(() => data.value?.search);

const { data: productList } = await useFetch<GetProductsQuery>(
  '/api/v/products',
  {
    method: 'post',
    body: {
      variables: {
        filter: {
          id: {
            in: xyz.value?.items.map((i) => `${i.productId}`),
          },
        },
      },
    },
  }
);

const products = computed(() => productList.value?.products.items);
</script>

<template>
  <LayoutCenter class="py-8 md:py-12">
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

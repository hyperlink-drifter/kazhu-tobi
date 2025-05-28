<script setup lang="ts">
import type { GetProductQuery } from '@@/graphql/generated';

const route = useRoute();

if (!route.params.slug?.length || !route.params.slug[0]) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Missing Product Handle',
  });
}

const slug = route.params.slug[0];

const { data } = await useFetch<GetProductQuery>('/api/v/product', {
  method: 'post',
  body: {
    variables: {
      slug,
    },
  },
});

const product = computed(() => data?.value?.product);
</script>

<template>
  <LayoutCenter class="py-8 md:py-12 bg-background">
    <div class="grid grid-cols-12 gap-2 sm:gap-x-4 gap-y-4 lg:gap-y-2">
      <ProductImageGallery
        v-if="product?.assets"
        :images="product?.assets"
        :title="product.name"
        class="grid grid-cols-subgrid col-span-12 lg:col-span-8 gap-2 sm:gap-4"
      />
      <ProductInfoDetails
        :product="product"
        class="grid grid-cols-subgrid col-span-12 lg:col-span-4 gap-2 sm:gap-4"
      />
    </div>
  </LayoutCenter>
</template>

<script setup lang="ts">
const route = useRoute();

if (!route.params.slug?.length || !route.params.slug[0]) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Missing Product Handle',
  });
}

const slug = route.params.slug[0];
</script>

<template>
  <LayoutCenter class="py-8 md:py-12 bg-background">
    <ProductXYZ :slug="slug" v-slot="{ product }">
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
    </ProductXYZ>
  </LayoutCenter>
</template>

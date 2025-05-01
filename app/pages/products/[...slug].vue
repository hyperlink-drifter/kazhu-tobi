<script setup lang="ts">
const route = useRoute();

if (!route.params.slug?.length || !route.params.slug[0]) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Missing Product Handle',
  });
}

const slug = route.params.slug[0];

const { data, status } = await useLazyAsyncData(`product-${slug}`, () =>
  GqlGetProduct({
    slug,
  })
);

const product = computed(() => data?.value?.product);
</script>

<template>
  <div class="">
    <div v-if="status === 'pending'">Loading ...</div>
    <div v-else>
      <ProductImageGallery
        v-if="product?.assets"
        :images="product?.assets"
        :title="product.name"
      />
    </div>
  </div>
</template>

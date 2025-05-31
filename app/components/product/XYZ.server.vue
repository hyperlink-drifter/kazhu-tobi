<script setup lang="ts">
const props = defineProps<{ slug: string }>();

const { $vendure } = useNuxtApp();

const { data } = await useAsyncData(`product-${props.slug}`, () =>
  $vendure.GetProduct({ slug: props.slug })
);

const product = computed(() => data?.value?.data.product);

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product Not Found' });
}
</script>

<template>
  <div class="grid grid-cols-12 gap-2 sm:gap-x-4 gap-y-4 lg:gap-y-2">
    <slot :product="product" />
  </div>
</template>

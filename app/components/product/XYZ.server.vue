<script setup lang="ts">
import type { GetProductQuery } from '@@/graphql/generated';

const props = defineProps<{ slug: string }>();

const { data } = await useFetch<GetProductQuery>('/api/v/product', {
  query: {
    slug: props.slug,
  },
});

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product Not Found' });
}
</script>

<template>
  <div class="grid grid-cols-12 gap-2 sm:gap-x-4 gap-y-4 lg:gap-y-2">
    <slot :product="data?.product" />
  </div>
</template>

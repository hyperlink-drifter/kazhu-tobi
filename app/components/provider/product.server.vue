<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { GetProductQuery } from '@@/graphql/generated';

const props = defineProps<{ slug: string; class?: HTMLAttributes['class'] }>();

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
  <div :class="cn('', props.class)">
    <slot :product="data?.product" />
  </div>
</template>

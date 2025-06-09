<script setup lang="ts">
import type { GetProductsQuery } from '@@/graphql/generated';
import type { HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class'];
  as?: 'ul' | 'ol' | 'div';
}

const props = withDefaults(defineProps<Props>(), {
  as: 'ul',
});

const { data } = await useFetch<GetProductsQuery>('/api/v/products');

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product Not Found' });
}

const products = computed(() => data.value?.products.items);
</script>

<template>
  <component :is="as" :class="cn('', props.class)">
    <slot :products="products" />
  </component>
</template>

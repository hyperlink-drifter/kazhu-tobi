<script setup lang="ts">
import type { GetProductsQuery } from '@@/graphql/generated';
import type { HTMLAttributes } from 'vue';

interface Props {
  as?: 'ul' | 'ol' | 'div';
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const { data } = await useFetch<GetProductsQuery>('/api/v/products');

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product Not Found' });
}

const products = computed(() => data.value?.products.items);
</script>

<template>
  <template v-if="as">
    <component :is="as" :class="cn('', props.class)">
      <slot :products="products" />
    </component>
  </template>
  <template v-else>
    <slot :products="products" />
  </template>
</template>

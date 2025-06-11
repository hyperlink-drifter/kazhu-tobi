<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { GetProductQuery } from '@@/graphql/generated';

interface Props {
  as?: 'div';
  class?: HTMLAttributes['class'];
  slug: string;
}

const props = defineProps<Props>();

const { data } = await useFetch<GetProductQuery>(
  `/api/v/products/${props.slug}`
);

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product Not Found' });
}

const product = computed(() => data.value?.product);
</script>

<template>
  <template v-if="as">
    <component :is="as" :class="cn('', props.class)">
      <slot :product="product" />
    </component>
  </template>
  <template v-else>
    <slot :product="product" />
  </template>
</template>

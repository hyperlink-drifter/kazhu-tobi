<script setup lang="ts">
import type {
  GetProductsQuery,
  GetCollectionProductsQuery,
  GetProductsQueryVariables,
} from '@@/graphql/generated';
import type { HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class'];
  as?: 'ul' | 'ol' | 'div';
  slug: string;
}

const props = defineProps<Props>();

const { data } = await useFetch<GetCollectionProductsQuery>(
  '/api/v/collection-products',
  {
    query: {
      slug: props.slug,
    },
  }
);

const xyz = computed(() => data.value?.search);

const variables = computed<GetProductsQueryVariables>(() => ({
  filter: {
    id: {
      in: xyz.value?.items.map((i) => `${i.productId}`),
    },
  },
}));

const { data: productList } = await useFetch<GetProductsQuery>(
  '/api/v/products',
  {
    query: {
      variables: JSON.stringify(variables.value),
    },
  }
);

const products = computed(() => productList.value?.products.items);
</script>

<template>
  <template v-if="as">
    <component
      :is="as"
      :class="
        cn(
          'grid grid-cols-12 gap-x-2 sm:gap-x-4 md:gap-y-4 gap-y-8',
          props.class
        )
      "
    >
      <slot :products="products" />
    </component>
  </template>
  <template v-else>
    <slot :products="products" />
  </template>
</template>

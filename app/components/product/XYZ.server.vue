<script setup lang="ts">
import { GetProduct } from '#shared/graphql/queries';

const props = defineProps<{ slug: string }>();

const { product } = await useQuery(GetProduct, { slug: props.slug });
</script>

<template>
  <div class="grid grid-cols-12 gap-2 sm:gap-x-4 gap-y-4 lg:gap-y-2">
    <slot :product="product" />
  </div>
</template>

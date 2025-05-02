<script setup lang="ts">
defineProps<{ images: any[]; title?: string }>();
</script>

<template>
  <div class="grid grid-cols-subgrid col-span-12 lg:col-span-8 gap-4">
    <ProductImageGrid
      :images="images"
      :title="title"
      class="hidden lg:grid lg:grid-cols-subgrid lg:col-span-8 gap-4"
    />
    <ProductImageCarousel
      :images="images"
      :title="title"
      class="lg:hidden grid grid-cols-subgrid col-span-12 gap-4"
    />
  </div>
</template>

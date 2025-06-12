<script setup lang="ts">
defineProps<{ images: any[]; title?: string }>();
</script>

<template>
  <div>
    <ProductGalleryGrid
      :images="images"
      :title="title"
      class="hidden lg:grid lg:grid-cols-subgrid lg:col-span-8 gap-2 sm:gap-4"
    />
    <ProductGalleryCarousel
      :images="images"
      :title="title"
      class="lg:hidden grid grid-cols-subgrid col-span-12 gap-2 sm:gap-4"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ images: any[]; title?: string }>();
</script>

<template>
  <div data-slot="product-image-grid">
    <NuxtImg
      v-for="(image, index) in images"
      :key="image.id"
      :src="image.source"
      :alt="`Image ${index + 1} of - ${title}`"
      :preload="true"
      loading="eager"
      fetch-priority="high"
      class="w-full lg:col-span-4"
    />
  </div>
</template>

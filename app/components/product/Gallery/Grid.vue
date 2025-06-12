<script setup lang="ts">
defineProps<{ images: any[]; title?: string }>();
</script>

<template>
  <div data-slot="product-image-grid">
    <div v-for="image in images" class="lg:col-span-4">
      <AspectRatio :ratio="4 / 5">
        <NuxtImg
          :key="image.id"
          :src="image.preview"
          :preload="true"
          loading="eager"
          fetch-priority="high"
          class="w-full"
        />
      </AspectRatio>
    </div>
  </div>
</template>

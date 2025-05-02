<script setup lang="ts">
defineProps<{ images: any[]; title?: string }>();
</script>

<template>
  <div>
    <div class="hidden lg:grid grid-flow-row-dense grid-cols-2 gap-4">
      <template v-for="(image, index) in images" :key="image.id">
        <NuxtImg
          :src="image.source"
          :alt="`Image ${index + 1} of - ${title}`"
          :preload="true"
          loading="eager"
          fetch-priority="high"
          class="w-full"
        />
      </template>
    </div>
    <ProductImageCarousel :images="images" :title="title" class="lg:hidden" />
  </div>
</template>

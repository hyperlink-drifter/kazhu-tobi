<script setup lang="ts">
defineProps<{ images: Asset[]; title?: string }>();
</script>

<template>
  <div class="grid grid-flow-row-dense grid-cols-2 gap-4">
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
</template>

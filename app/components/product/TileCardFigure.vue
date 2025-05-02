<script lang="ts" setup>
defineProps<{ product: VendureProduct }>();
</script>

<template>
  <AspectRatio :ratio="4 / 5" class="group">
    <NuxtImg
      :src="product?.featuredAsset?.source"
      :preload="true"
      loading="eager"
    />
    <NuxtImg
      class="opacity-0 group-hover:pointer-fine:opacity-100 absolute top-0"
      :src="product?.assets?.[1]?.source"
      loading="lazy"
    />
  </AspectRatio>
</template>

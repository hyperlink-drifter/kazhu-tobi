<script lang="ts" setup>
defineProps<{ product: VendureProduct }>();
</script>

<template>
  <AspectRatio :ratio="4 / 5" class="group">
    <NuxtImg
      :src="product?.featuredAsset?.preview"
      :preload="true"
      loading="eager"
      class="w-full"
    />
    <NuxtImg
      v-if="product?.assets?.[1]"
      :src="product?.assets?.[1]?.preview"
      loading="lazy"
      class="opacity-0 group-hover:pointer-fine:opacity-100 absolute top-0 w-full"
    />
  </AspectRatio>
</template>

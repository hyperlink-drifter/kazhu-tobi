<script lang="ts" setup>
const props = defineProps<{ product: VendureProduct }>();
const computedPrice = computed(() => {});
</script>

<template>
  <NuxtLink
    :to="
      $localePath({
        name: 'products-slug',
        params: { slug: product?.slug },
      })
    "
    class="block h-full"
  >
    <Card class="h-full py-0 rounded-none shadow-none border-none gap-4">
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
      <CardHeader class="px-0">
        <CardTitle>{{ product?.name }}</CardTitle>
      </CardHeader>
      <CardContent class="px-0">
        <CardDescription>Card Description</CardDescription>
      </CardContent>
    </Card>
  </NuxtLink>
</template>

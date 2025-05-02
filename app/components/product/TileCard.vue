<script lang="ts" setup>
const props = defineProps<{ product: VendureProduct }>();

const computedPrice = computed(() => {});

const shouldDisplaySecondImage = ref(false);

function handleMouseOver(event: MouseEvent) {
  // On mobile devices, click event also triggers mouseover event
  const isMobileClickEvent = !event.relatedTarget;

  if (
    isMobileClickEvent ||
    (props.product?.assets && props.product?.assets?.length < 2)
  ) {
    return;
  }

  shouldDisplaySecondImage.value = true;
}
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
    @click="shouldDisplaySecondImage = false"
    @mouseover="handleMouseOver"
    @mouseleave="shouldDisplaySecondImage = false"
  >
    <Card class="h-full py-0 rounded-none shadow-none border-none gap-4">
      <CardHeader class="px-0">
        <NuxtImg
          v-show="!shouldDisplaySecondImage"
          :src="product?.featuredAsset?.source"
          :alt="`Image 1 of a product ${product?.name}`"
          :preload="true"
          loading="eager"
        />
        <NuxtImg
          v-show="shouldDisplaySecondImage"
          :src="product?.assets?.[1]?.source"
          :alt="`Image 2 of a product ${product?.name}`"
          loading="lazy"
        />
        <CardTitle>{{ product?.name }}</CardTitle>
      </CardHeader>
      <CardContent class="px-0">
        <CardDescription>Card Description</CardDescription>
      </CardContent>
    </Card>
  </NuxtLink>
</template>

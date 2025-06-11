<script lang="ts" setup>
import type { ActiveOrderFragment } from '@@/graphql/generated';

const props = defineProps<{
  item: ActiveOrderFragment['lines'][0];
}>();

const { locale } = useI18n();

const tProduct = computed(() =>
  props.item?.productVariant.product.translations.find(
    (t) => t.languageCode === locale.value
  )
);
</script>

<template>
  <div class="flex gap-5">
    <div class="w-20 min-w-20 md:w-24 md:min-w-24">
      <AspectRatio :ratio="4 / 5">
        <NuxtImg
          :key="item.featuredAsset?.id"
          :src="item.featuredAsset?.preview"
          :preload="true"
          loading="eager"
          fetch-priority="high"
          class="w-full"
        />
      </AspectRatio>
    </div>
    <div class="flex">
      <div>
        <div>{{ tProduct?.name }}</div>
        <div>{{ item.linePriceWithTax }}</div>
        <div class="md:hidden ml-auto">{{ item.quantity }}</div>
      </div>
    </div>
    <div class="hidden md:block ml-auto">{{ item.quantity }}</div>
  </div>
</template>

<script lang="ts" setup>
import type { ActiveOrderFragment } from '@@/graphql/generated';
import RemoveLineItem from './RemoveLineItem.vue';

const props = defineProps<{
  item: ActiveOrderFragment['lines'][0];
}>();

const { locale } = useI18n();

const tProduct = computed(() =>
  props.item?.productVariant.product.translations.find(
    (t) => t.languageCode === locale.value
  )
);

const tOtions = computed(() => {
  const options = props.item?.productVariant.options;
  const t = options.map((o) =>
    o.translations.find((t) => t.languageCode === locale.value)
  );
  return t;
});
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
        <div>{{ formatCurrency(item.linePriceWithTax) }}</div>
        <div>
          <template
            v-for="(option, index) in tOtions"
            :key="JSON.stringify(option)"
          >
            <span>{{ option?.name }}</span>
            <span v-if="index !== tOtions.length - 1">/ </span>
          </template>
        </div>
        <div class="md:hidden ml-auto flex flex-col items-start">
          <Button variant="ghost">{{ item.quantity }}</Button>
          <RemoveLineItem :id="item.id" />
        </div>
      </div>
    </div>
    <div class="hidden md:flex ml-auto flex-col">
      <Button variant="ghost">{{ item.quantity }}</Button>
      <RemoveLineItem :id="item.id" />
    </div>
  </div>
</template>

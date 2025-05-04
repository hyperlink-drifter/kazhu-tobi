<script lang="ts" setup>
const props = defineProps<{ product: VendureProduct }>();

const { locale } = useI18n();

const translation = computed(() =>
  props.product?.translations.find((t) => t.languageCode === locale.value)
);
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
      <ProductTileCardFigure :product="product" />
      <CardHeader class="px-0">
        <CardTitle>{{ translation?.name }}</CardTitle>
      </CardHeader>
      <CardContent class="px-0">
        <CardDescription>
          <div class="prose prose-sm" v-html="translation?.description"></div>
        </CardDescription>
      </CardContent>
    </Card>
  </NuxtLink>
</template>

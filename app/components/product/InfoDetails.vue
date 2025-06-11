<script lang="ts" setup>
import type { GetProductQuery } from '@@/graphql/generated';
import { ShoppingCart, LoaderPinwheel } from 'lucide-vue-next';
import { useAddItemToCart } from '@/pinia-colada/mutations/add-to-cart';

const props = defineProps<{ product: GetProductQuery['product'] }>();

const route = useRoute();

const { locale } = useI18n();

const translation = computed(() =>
  props.product?.translations.find((t) => t.languageCode === locale.value)
);

const { addItemToCart, asyncStatus, productVariantId } = useAddItemToCart();

watchEffect(() => {
  const productVariants = props.product?.variants;

  if (!productVariants) return undefined;

  if (productVariants.length === 1 && productVariants[0]) {
    return (productVariantId.value = productVariants[0].id);
  }

  const pickedVariant = productVariants.find((variant) =>
    variant.options.every(
      (option) => option.code === route.query[option.group.code]
    )
  );

  if (pickedVariant && pickedVariant.id) {
    return (productVariantId.value = pickedVariant.id);
  }
});
</script>

<template>
  <div>
    <div
      class="col-span-12 lg:col-span-4 prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert"
    >
      <h1>
        {{ translation?.name }}
      </h1>
      <div v-html="translation?.description" />
      <ProductOptionGroups :product="product" />
      <Button @click="addItemToCart" :disabled="asyncStatus === 'loading'">
        <LoaderPinwheel v-if="asyncStatus === 'loading'" class="animate-spin" />
        <ShoppingCart v-else />
        {{ $t('add-to-cart') }}
      </Button>
    </div>
  </div>
</template>

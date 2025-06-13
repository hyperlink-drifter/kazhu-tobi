<script lang="ts" setup>
import type { GetProductQuery } from '@@/graphql/generated';
import { ShoppingCart, LoaderPinwheel } from 'lucide-vue-next';
import { useAddItemToCart } from '@/pinia-colada/mutations/add-to-cart';
import { VENDURE_OUT_OF_STOCK, PINIA_COLADA_LOADING } from '#shared/constants';

const props = defineProps<{ product: GetProductQuery['product'] }>();

const route = useRoute();

const { locale } = useI18n();

const translation = computed(() =>
  props.product?.translations.find((t) => t.languageCode === locale.value)
);

const { addItemToCart, asyncStatus, productVariantId } = useAddItemToCart();

const pickedVariant = computed(() => {
  const productVariants = props.product?.variants;

  if (!productVariants) return undefined;

  if (productVariants.length === 1) return productVariants.at(0);

  return productVariants.find((variant) =>
    variant.options.every(
      (option) => option.code === route.query[option.group.code]
    )
  );
});

watch(
  pickedVariant,
  (newPickedVariant) => {
    if (newPickedVariant && newPickedVariant.id) {
      productVariantId.value = newPickedVariant.id;
    } else {
      productVariantId.value = '';
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <div class="col-span-12 lg:col-span-4">
      <div class="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert">
        <h1>
          {{ translation?.name }}
        </h1>
        <div v-html="translation?.description" />
        <div v-if="pickedVariant">
          {{ formatCurrency(pickedVariant.priceWithTax) }}
        </div>
      </div>
      <ProductOptionGroups :product="product" />
      <Button
        @click="addItemToCart"
        class="w-full"
        size="lg"
        :disabled="
          asyncStatus === PINIA_COLADA_LOADING ||
          !productVariantId ||
          pickedVariant?.stockLevel === VENDURE_OUT_OF_STOCK
        "
      >
        <LoaderPinwheel
          v-if="asyncStatus === PINIA_COLADA_LOADING"
          class="animate-spin"
        />
        <ShoppingCart v-else />
        {{ $t('add-to-cart') }}
      </Button>
    </div>
  </div>
</template>

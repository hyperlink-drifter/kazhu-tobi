<script lang="ts" setup>
import type {
  AddItemToOrderMutation,
  GetProductQuery,
} from '@@/graphql/generated';
import { ShoppingCart } from 'lucide-vue-next';

const props = defineProps<{ product: GetProductQuery['product'] }>();

const route = useRoute();

const { locale } = useI18n();

const translation = computed(() =>
  props.product?.translations.find((t) => t.languageCode === locale.value)
);

const optionsInUrl = computed(() => Object.keys(route.query).length);

const areOptionsSelected = computed(
  () => optionsInUrl.value === props.product?.optionGroups.length
);

const computedVariant = computed(() => {
  const productVariants = props.product?.variants;

  if (!productVariants || !optionsInUrl.value) return undefined;

  return productVariants.find((variant) =>
    variant.options.every(
      (option) => option.code === route.query[option.group.code]
    )
  );
});

const addToCart = async () => {
  await $fetch<AddItemToOrderMutation>('/api/v/order/add-item', {
    method: 'POST',
    body: {
      productVariantId: computedVariant!.value!.id,
      quantity: 1,
    },
  });
};
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
      <Button @click="addToCart">
        {{ $t('add-to-cart') }} <ShoppingCart />
      </Button>
      <div>
        {{ computedVariant }}
      </div>
    </div>
  </div>
</template>

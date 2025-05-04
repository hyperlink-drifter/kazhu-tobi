<script lang="ts" setup>
const props = defineProps<{ product: VendureProduct }>();

const { locale } = useI18n();

const product = computed(() =>
  props.product?.translations.find((t) => t.languageCode === locale.value)
);
</script>

<template>
  <div>
    <div
      class="col-span-12 lg:col-span-4 prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert"
    >
      <h1>
        {{ product?.name }}
      </h1>
      <div v-html="product?.description" />
    </div>
  </div>
</template>

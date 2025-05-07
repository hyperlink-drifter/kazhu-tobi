<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';

const { data } = await useAsyncData('products', () => GqlGetProducts());

const products = computed(() => data.value?.products);

if (!products.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product Not Found' });
}

if (!products.value.items) {
  throw createError({ statusCode: 404, statusMessage: 'Product Not Found' });
}
</script>

<template>
  <div class="grid h-[calc(90svh-var(--spacing-header))]">
    <div
      class="flex col-start-1 row-start-1 h-[calc(90svh-var(--spacing-header))]"
    >
      <HeroImageCarousel />
    </div>
    <LayoutCenter class="col-start-1 col-end-2 row-start-1 h-full z-10">
      <LayoutCover
        class="min-h-[calc(90svh-var(--spacing-header))] prose prose-2xl dark:prose-invert"
      >
        <template #center>
          <h1 class="hyphens-auto max-w-md">
            {{ $t('welcome') }}
          </h1>
          <NuxtLink
            :to="
              $localePath({
                name: 'products',
              })
            "
          >
            <Button as="div"> {{ $t('hero-cta') }} <ArrowRight /></Button>
          </NuxtLink>
        </template>
      </LayoutCover>
    </LayoutCenter>
  </div>
  <LayoutCenter class="py-8 lg:py-12 bg-background">
    <h2 class="mb-4 text-2xl font-semibold">
      {{ $t('heading-bestsellers') }}
    </h2>
    <LayoutReel class="l-reel-w sm:l-reel-w-sm md:l-reel-w-md">
      <div v-for="product in products?.items" :key="JSON.stringify(product)">
        <ProductTileCard class="h-inherit" :product="product" />
      </div>
    </LayoutReel>
  </LayoutCenter>
</template>

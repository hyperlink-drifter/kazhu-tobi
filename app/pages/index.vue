<script setup lang="ts">
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
  <div class="grid h-[calc(100svh-var(--spacing-header))]">
    <div
      class="flex col-start-1 row-start-1 h-[calc(100svh-var(--spacing-header))]"
    >
      <HeroImageCarousel />
    </div>
    <LayoutCenter class="col-start-1 col-end-2 row-start-1 h-full z-10">
      <LayoutCover
        class="min-h-[calc(100svh-var(--spacing-header))] prose prose-base sm:prose-lg lg:prose-xl dark:prose-invert"
      >
        <template #center>
          <h1>{{ $t('welcome') }}</h1>
          <NuxtLink
            :to="
              $localePath({
                name: 'products',
              })
            "
          >
            <Button as="div"> {{ $t('products') }}</Button>
          </NuxtLink>
        </template>
      </LayoutCover>
    </LayoutCenter>
  </div>
  <LayoutCenter class="pt-4">
    <LayoutReel class="l-reel-w sm:l-reel-w-sm md:l-reel-w-md">
      <div v-for="product in products?.items" :key="JSON.stringify(product)">
        <ProductTileCard class="h-inherit" :product="product" />
      </div>
    </LayoutReel>
  </LayoutCenter>
</template>

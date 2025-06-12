<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';

const instaPosts = [
  {
    postId: 'C5x_B9Athe4',
    instaHandle: 'shoptime_24',
  },
];
</script>

<template>
  <div class="grid h-[calc(80svh-var(--spacing-header))]">
    <div
      class="flex col-start-1 row-start-1 h-[calc(80svh-var(--spacing-header))]"
    >
      <HeroImageCarousel />
    </div>
    <LayoutCenter class="col-start-1 col-end-2 row-start-1 h-full z-10">
      <LayoutCover
        class="min-h-[calc(80svh-var(--spacing-header))] prose prose-xl md:prose-2xl dark:prose-invert"
      >
        <template #center>
          <h1 class="hyphens-auto max-w-md mb-2">
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
    <ServerProducts v-slot="{ products }" as="div">
      <LayoutReel class="l-reel-w sm:l-reel-w-sm md:l-reel-w-md">
        <ProductTile
          v-for="product in products"
          :key="JSON.stringify(product)"
          class="h-inherit"
          :product="product"
        />
      </LayoutReel>
    </ServerProducts>
  </LayoutCenter>
  <LayoutCenter class="py-8 lg:py-12 bg-background">
    <h2 class="mb-4 text-2xl font-semibold">
      {{ $t('visit-our-instagram') }}
    </h2>
    <div class="grid grid-cols-12 gap-x-2 sm:gap-x-4 gap-y-4">
      <EmbededInstagram
        v-for="post in instaPosts"
        :key="JSON.stringify(post.postId)"
        :postId="post.postId"
        :instaHandle="post.instaHandle"
        class="col-span-12 md:col-span-4 xl:col-span-3"
      />
    </div>
  </LayoutCenter>
</template>

<script setup lang="ts">
import type { CarouselApi } from '@/components/ui/carousel';
import { watchOnce } from '@vueuse/core';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const selectedIndex = ref(0);

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return;

  onSelect();
  emblaMainApi.on('select', onSelect);
  emblaMainApi.on('reInit', onSelect);
});

const images = [
  {
    preview:
      'https://plus.unsplash.com/premium_photo-1674921631244-66e47b989131?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    preview:
      'https://images.unsplash.com/photo-1687405182302-f1b28707c854?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    preview:
      'https://images.unsplash.com/photo-1615705592748-029c989e6d5c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];
</script>

<template>
  <div data-slot="hero-image-carousel" class="w-full h-full">
    <Carousel
      @init-api="(val) => (emblaMainApi = val)"
      :plugins="[
        Autoplay({
          delay: 5000,
        }),
        Fade(),
      ]"
      class="relative col-span-12 md:col-span-10 w-full h-full"
    >
      <CarouselContent class="w-full h-full ml-0">
        <CarouselItem
          v-for="(image, index) in images"
          :key="image.preview"
          class="h-full p-0"
        >
          <NuxtImg
            :src="image.preview"
            :preload="index === 0 ? true : false"
            :loading="index === 0 ? 'eager' : 'lazy'"
            :fetch-priority="index === 0 ? 'high' : 'low'"
            class="w-full h-full object-cover"
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>

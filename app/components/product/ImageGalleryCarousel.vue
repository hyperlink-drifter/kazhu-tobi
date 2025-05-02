<script setup lang="ts">
import type { CarouselApi } from '@/components/ui/carousel';
import { watchOnce, useMediaQuery } from '@vueuse/core';

defineProps<{ images: any[]; title?: string }>();

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const selectedIndex = ref(0);

const isMdScreen = useMediaQuery('(min-width: 768px)');

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
}

function onThumbClick(index: number) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  emblaMainApi.value.scrollTo(index);
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return;

  onSelect();
  emblaMainApi.on('select', onSelect);
  emblaMainApi.on('reInit', onSelect);
});
</script>

<template>
  <div data-slot="product-image-carousel">
    <Carousel
      @init-api="(val) => (emblaMainApi = val)"
      class="relative w-full col-span-12 md:col-span-10"
    >
      <CarouselContent>
        <CarouselItem v-for="(image, index) in images" :key="image.id">
          <AspectRatio :ratio="4 / 5">
            <NuxtImg
              :src="image.source"
              :preload="index === 0 ? true : false"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :fetch-priority="index === 0 ? 'high' : 'low'"
              class="w-full"
            />
          </AspectRatio>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
    <Carousel
      :orientation="isMdScreen ? 'vertical' : 'horizontal'"
      @init-api="(val) => (emblaThumbnailApi = val)"
      class="relative w-full col-span-12 md:col-span-2 md:order-first"
    >
      <CarouselContent class="flex flex-row md:flex-col gap-1 ml-0">
        <CarouselItem
          v-for="(image, index) in images"
          :key="`thumbnail-${image.id}`"
          class="pl-0 basis-1/4 cursor-pointer"
          @click="onThumbClick(index)"
        >
          <div class="p-1" :class="index === selectedIndex ? '' : 'opacity-50'">
            <AspectRatio :ratio="4 / 5">
              <NuxtImg
                :src="`${image.source}?preset=thumb`"
                :preload="true"
                loading="eager"
                fetch-priority="high"
                class="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>

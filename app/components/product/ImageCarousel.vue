<script setup lang="ts">
import type { CarouselApi } from '@/components/ui/carousel';
import { watchOnce } from '@vueuse/core';

defineProps<{ images: any[]; title?: string }>();

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const selectedIndex = ref(0);

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
      class="relative w-full col-span-12"
    >
      <CarouselContent>
        <CarouselItem v-for="(image, index) in images" :key="image.id">
          <NuxtImg
            :src="image.source"
            :alt="`Image ${index + 1} of - ${title}`"
            :preload="index === 0 ? true : false"
            :loading="index === 0 ? 'eager' : 'lazy'"
            :fetch-priority="index === 0 ? 'high' : 'low'"
            class="w-full"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="hover:bg-transparent" />
      <CarouselNext class="hover:bg-transparent" />
    </Carousel>
    <Carousel
      class="relative w-full col-span-12"
      @init-api="(val) => (emblaThumbnailApi = val)"
    >
      <CarouselContent class="flex gap-1 ml-0">
        <CarouselItem
          v-for="(image, index) in images"
          :key="`thumbnail-${image.id}`"
          class="pl-0 basis-1/4 cursor-pointer"
          @click="onThumbClick(index)"
        >
          <div class="p-1" :class="index === selectedIndex ? '' : 'opacity-50'">
            <NuxtImg
              :src="`${image.source}?preset=thumb`"
              :alt="`Image ${index + 1} of - ${title}`"
              :preload="true"
              loading="eager"
              fetch-priority="high"
              class="w-full"
            />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>

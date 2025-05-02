<script setup lang="ts">
import type { WithClassAsProps } from './interface';
import { cn } from '@/utils/utils';
import { Button, type ButtonVariants } from '@/components/ui/button';
import { useCarousel } from './useCarousel';

const props = withDefaults(
  defineProps<
    {
      variant?: ButtonVariants['variant'];
      size?: ButtonVariants['size'];
    } & WithClassAsProps
  >(),
  {
    variant: 'outline',
    size: 'icon',
  }
);

const { orientation, canScrollPrev, scrollPrev } = useCarousel();
</script>

<template>
  <Button
    data-slot="carousel-previous"
    :disabled="!canScrollPrev"
    :class="
      cn(
        'absolute h-full top-0 bottom-0 w-1/2 rounded-none left-0 bg-transparent border-transparent',
        props.class
      )
    "
    :variant="variant"
    :size="size"
    @click="scrollPrev"
  >
    <slot>
      <span class="sr-only">Previous Slide</span>
    </slot>
  </Button>
</template>

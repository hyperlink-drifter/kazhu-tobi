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

const { orientation, canScrollNext, scrollNext } = useCarousel();
</script>

<template>
  <Button
    data-slot="carousel-next"
    :disabled="!canScrollNext"
    :class="
      cn(
        'absolute h-full top-0 bottom-0 w-1/2 rounded-none right-0 bg-transparent border-transparent',
        props.class
      )
    "
    :variant="variant"
    :size="size"
    @click="scrollNext"
  >
    <slot>
      <span class="sr-only">Next Slide</span>
    </slot>
  </Button>
</template>

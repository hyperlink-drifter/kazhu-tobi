<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>

<template>
  <div
    :class="
      cn('grid grid-cols-(--the-center-grid-cols) w-full h-full', props.class)
    "
  >
    <div class="grid col-start-2 col-end-3">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>

<template>
  <section
    :style="'--the-center-grid-cols: minmax(16px, 1fr) min(calc(100% - 16px - 16px), 1280px) minmax(16px, 1fr)'"
    :class="cn('grid grid-cols-(--the-center-grid-cols)', props.class)"
  >
    <div class="grid col-start-2 col-end-3">
      <slot name="center" />
    </div>
  </section>
</template>

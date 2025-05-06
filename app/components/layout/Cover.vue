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
      cn(
        'flex flex-col min-h-svh py-4 [&>*:first-child:not(.center)]:mt-0 [&>*:last-child:not(.center)]:mb-0 [&_.center]:my-auto ',
        props.class
      )
    "
  >
    <div>
      <slot name="top" />
    </div>
    <div class="center">
      <slot name="center" />
    </div>
    <div>
      <slot name="bottom" />
    </div>
  </div>
</template>

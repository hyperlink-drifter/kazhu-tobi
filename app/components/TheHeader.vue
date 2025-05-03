<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>

<template>
  <LayoutCenter>
    <header :class="cn('flex justify-between', props.class)">
      <slot>
        <TheNavigation />
        <TheLocaleSelector />
      </slot>
    </header>
  </LayoutCenter>
</template>

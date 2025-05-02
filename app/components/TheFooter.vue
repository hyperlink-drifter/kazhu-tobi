<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>

<template>
  <footer :class="cn(props.class)">
    <slot />
  </footer>
</template>

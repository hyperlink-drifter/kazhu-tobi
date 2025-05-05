<script setup lang="ts">
import { cn } from '@/utils/utils';
import { type NavigationMenuListProps, useForwardProps } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';
import NavigationMenuListXYZ from './NavigationMenuListXYZ.vue';

const props = defineProps<
  NavigationMenuListProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <NavigationMenuListXYZ
    data-slot="navigation-menu-list"
    v-bind="forwardedProps"
    :class="
      cn('group flex flex-1 list-none items-center justify-center', props.class)
    "
  >
    <slot />
  </NavigationMenuListXYZ>
</template>

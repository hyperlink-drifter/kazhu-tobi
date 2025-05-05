<script lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { useForwardExpose } from 'reka-ui';

export interface NavigationMenuListProps extends PrimitiveProps {}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui';
import { onMounted } from 'vue';
import { injectNavigationMenuContext } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<NavigationMenuListProps>(), {
  as: 'ul',
});

const menuContext = injectNavigationMenuContext();
const { forwardRef, currentElement } = useForwardExpose();

onMounted(() => {
  menuContext.onIndicatorTrackChange(currentElement.value);
});
</script>

<template>
  <Primitive :ref="forwardRef" style="position: relative" class="h-full">
    <Primitive
      v-bind="$attrs"
      :as-child="props.asChild"
      :as="as"
      :data-orientation="menuContext.orientation"
    >
      <slot />
    </Primitive>
  </Primitive>
</template>

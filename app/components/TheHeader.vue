<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <header
    :class="
      cn('sticky h-header lg:h-header-lg top-0 left-0 w-full z-20', props.class)
    "
  >
    <LayoutCenter class="bg-white h-full">
      <slot>
        <div class="flex gap-2 justify-between">
          <NavigationForMobile />
          <NuxtLink
            class="inline-flex flex-col justify-center h-full px-4"
            :to="
              $localePath({
                name: 'index',
              })
            "
          >
            kazhu-tobi
          </NuxtLink>
          <NavigationForLgThanMobile />
          <div class="flex items-center gap-2 justify-end">
            <TheLocaleSelector class="hidden lg:flex" />
            <CartSheetTrigger />
          </div>
        </div>
      </slot>
    </LayoutCenter>
  </header>
</template>

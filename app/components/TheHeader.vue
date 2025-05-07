<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { ShoppingCart, Heart, Search, User } from 'lucide-vue-next';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>

<template>
  <header
    :class="
      cn('sticky h-header lg:h-header-lg top-0 left-0 w-full z-20', props.class)
    "
  >
    <LayoutCenter class="bg-white h-full">
      <slot>
        <div class="flex justify-between">
          <TheNavigation />
          <div class="flex items-center gap-2">
            <TheLocaleSelector class="hidden lg:flex" />
            <Button>
              <Search />
            </Button>
            <Button class="hidden lg:flex">
              <User />
            </Button>
            <Button>
              <Heart />
            </Button>
            <Button>
              <ShoppingCart />
            </Button>
          </div>
        </div>
      </slot>
    </LayoutCenter>
  </header>
</template>

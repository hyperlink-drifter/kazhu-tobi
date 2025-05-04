<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { ShoppingCart, Heart, Search, User } from 'lucide-vue-next';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>

<template>
  <LayoutCenter class="sticky top-0 bg-white z-20 py-2 lg:py-0">
    <header :class="cn('flex justify-between', props.class)">
      <slot>
        <TheNavigation />
        <div class="flex items-center gap-2 lg:py-4">
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
      </slot>
    </header>
  </LayoutCenter>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>

<template>
  <header :class="cn(props.class)">
    <slot>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NuxtLink
              custom
              v-slot="{ isActive, href, navigate }"
              :to="
                $localePath({
                  name: 'products',
                })
              "
            >
              <NavigationMenuLink
                :active="isActive"
                :href
                :class="navigationMenuTriggerStyle()"
                @click="navigate"
              >
                {{ $t('products') }}
              </NavigationMenuLink>
            </NuxtLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </slot>
  </header>
</template>

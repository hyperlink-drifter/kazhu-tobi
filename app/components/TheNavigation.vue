<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { Menu, CircleX } from 'lucide-vue-next';

interface Props {
  class?: HTMLAttributes['class'];
}

defineProps<Props>();

const { locale } = useI18n();

const { data } = await useAsyncData(`collections`, () =>
  GqlGetTopLevelCollections()
);

const collections = computed(() => data.value?.collections.items);

const localeCollections = computed(() => {
  return collections.value?.map((c) =>
    c.translations.find((t) => t.languageCode === locale.value)
  );
});

const isSheetOpen = ref(false);
const breakpoints = useBreakpoints(breakpointsTailwind);
const isLgAndLarger = breakpoints.greaterOrEqual('lg');

watch(isLgAndLarger, (isLgAndLarger) => {
  if (isLgAndLarger) {
    isSheetOpen.value = false;
  }
});
</script>

<template>
  <Sheet v-model:open="isSheetOpen">
    <SheetTrigger class="lg:hidden">
      <Menu />
    </SheetTrigger>
    <SheetContent side="left" class="inset-2 w-auto h-auto lg:hidden">
      <SheetClose
        class="w-fit p-2 ring-offset-background data-[state=open]:bg-secondary rounded-xs opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none"
      >
        <CircleX class="size-8" />
        <span class="sr-only">Close</span>
      </SheetClose>
      <NavigationMenu orientation="vertical" class="flex-0">
        <NavigationMenuList class="flex flex-col items-start">
          <NavigationMenuItem
            v-for="collection in localeCollections"
            :key="`burger-menu-${collection?.slug}`"
          >
            <NuxtLink
              custom
              v-slot="{ isActive, href, navigate }"
              :to="
                $localePath({
                  name: 'collections-slug',
                  params: {
                    slug: collection?.slug,
                  },
                })
              "
            >
              <NavigationMenuLink
                :active="isActive"
                :href
                :class="navigationMenuTriggerStyle()"
                @click="navigate"
              >
                {{ collection?.name }}
              </NavigationMenuLink>
            </NuxtLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </SheetContent>
  </Sheet>
  <NavigationMenu class="hidden lg:flex">
    <NavigationMenuList>
      <NavigationMenuItem
        v-for="collection in localeCollections"
        :key="`menu-${collection?.slug}`"
      >
        <NuxtLink
          custom
          v-slot="{ isActive, href, navigate }"
          :to="
            $localePath({
              name: 'collections-slug',
              params: {
                slug: collection?.slug,
              },
            })
          "
        >
          <NavigationMenuLink
            :active="isActive"
            :href
            :class="navigationMenuTriggerStyle()"
            @click="navigate"
          >
            {{ collection?.name }}
          </NavigationMenuLink>
        </NuxtLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

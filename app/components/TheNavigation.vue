<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { Menu } from 'lucide-vue-next';

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
const lgAndLarger = breakpoints.greaterOrEqual('lg');

watch(lgAndLarger, (lgAndLarger) => {
  if (lgAndLarger === true) {
    isSheetOpen.value = false;
  }
});
</script>

<template>
  <Sheet v-model:open="isSheetOpen">
    <SheetTrigger class="lg:hidden">
      <Menu />
    </SheetTrigger>
    <SheetContent side="left" class="inset-2 w-auto h-auto">
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
  <NavigationMenu class="hidden lg:flex">
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

      <NavigationMenuItem v-for="collection in localeCollections">
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

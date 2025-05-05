<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { CircleX, AlignJustify, User } from 'lucide-vue-next';

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

const isDrawerOpen = ref(false);
const breakpoints = useBreakpoints(breakpointsTailwind);
const isLgAndLarger = breakpoints.greaterOrEqual('lg');

watch(isLgAndLarger, (isLgAndLarger) => {
  if (isLgAndLarger) {
    isDrawerOpen.value = false;
  }
});
</script>

<template>
  <Drawer v-model:open="isDrawerOpen">
    <DrawerTrigger class="lg:hidden self-center" as-child>
      <Button size="icon">
        <AlignJustify class="size-6" />
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <div class="p-4">
        <NavigationMenu
          orientation="vertical"
          class="max-w-full justify-start md:justify-center"
        >
          <NavigationMenuList class="block">
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
                  :href
                  :active="isActive"
                  :class="`${navigationMenuTriggerStyle()}`"
                  @click="(e: MouseEvent) => {
                    navigate(e)
                    isDrawerOpen = false
                  }"
                >
                  {{ collection?.name }}
                </NavigationMenuLink>
              </NuxtLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <DrawerFooter class="items-center">
        <div class="flex items-center gap-2 py-4">
          <TheLocaleSelector />
          <Button>
            <User />
          </Button>
        </div>
        <DrawerClose
          class="grid grid-cols-[1fr_auto_1fr] w-full md:w-md"
          as-child
        >
          <Button variant="default"> <CircleX /> {{ $t('close') }} </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
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
            :class="`${navigationMenuTriggerStyle()} px-4 py-4 `"
            @click="navigate"
          >
            {{ collection?.name }}
          </NavigationMenuLink>
        </NuxtLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

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
        <NavigationMenu orientation="vertical" class="max-w-full justify-start">
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
                  :class="`${navigationMenuTriggerStyle()} pl-0`"
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
        <div class="self-start flex flex-col gap-2">
          <Button class="w-fit">
            <User />
          </Button>
          <TheLocaleSelector />
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
    <NavigationMenuList class="h-full">
      <NavigationMenuItem
        v-for="collection in localeCollections"
        :key="`menu-${collection?.slug}`"
        class="h-full"
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
            :class="`${navigationMenuTriggerStyle()} px-4 py-0 h-full`"
            @click="navigate"
          >
            {{ collection?.name }}
          </NavigationMenuLink>
        </NuxtLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

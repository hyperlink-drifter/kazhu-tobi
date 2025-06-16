<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { collectionsTopLevelQuery } from '@/pinia/colada/queries/collections/top-level';

interface Props {
  class?: HTMLAttributes['class'];
}

defineProps<Props>();

const { locale } = useI18n();

const { state: collectionsState } = useQuery(collectionsTopLevelQuery);

const collections = computed(
  () => collectionsState.value.data?.collections.items
);

const localeCollections = computed(() => {
  return collections.value?.map((c) =>
    c.translations.find((t) => t.languageCode === locale.value)
  );
});
</script>

<template>
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

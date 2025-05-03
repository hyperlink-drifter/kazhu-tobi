<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

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
</script>

<template>
  <NavigationMenu :class="cn(props.class)">
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

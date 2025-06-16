<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { Instagram } from 'lucide-vue-next';
import { collectionsTopLevelQuery } from '@/pinia/colada/queries/collections/top-level';

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

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>

<template>
  <footer :class="cn(props.class)">
    <LayoutCenter class="bg-foreground text-background py-8 md:py-12 h-full">
      <slot>
        <div class="flex flex-col gap-y-12">
          <div class="flex flex-col gap-y-8">
            <section>
              <h3 class="text-xl pb-2 font-semibold">{{ $t('products') }}</h3>
              <ul class="flex flex-col gap-1">
                <li>
                  <NuxtLinkLocale to="products">
                    {{ $t('shop-all') }}
                  </NuxtLinkLocale>
                </li>
                <li
                  v-for="collection in localeCollections"
                  :key="`menu-${collection?.slug}`"
                >
                  <NuxtLinkLocale
                    :to="{
                      name: 'collections-slug',
                      params: { slug: collection?.slug },
                    }"
                  >
                    {{ collection?.name }}
                  </NuxtLinkLocale>
                </li>
              </ul>
            </section>
            <section class="flex gap-2">
              <NuxtLink
                to="https://www.instagram.com/shoptime_24"
                target="_blank"
                class="flex gap-x-3"
              >
                <Instagram /> <span>{{ $t('kazhu-tobi') }}</span>
              </NuxtLink>
            </section>
          </div>
          <section class="self-end mt-auto">
            <NuxtLink
              to="https://hyperlink-drifter.com"
              target="_blank"
              class="flex gap-x-3"
            >
              <small class="text-sm">
                {{ $t('made-with-love') }}
              </small>
            </NuxtLink>
          </section>
        </div>
      </slot>
    </LayoutCenter>
  </footer>
</template>

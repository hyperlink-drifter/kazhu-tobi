<script setup lang="ts">
import type { GetProductQuery } from '@@/graphql/generated';

const props = defineProps<{
  product?: GetProductQuery['product'];
}>();

const optionGroups = computed(() => props?.product?.optionGroups);

const router = useRouter();
const route = useRoute();
const { locale } = useI18n();

function toggleOption(name: string, value: string) {
  router.replace({
    query: {
      ...route.query,
      [name]: route.query[name] === value ? undefined : value,
    },
  });
}

function isSelected(name: string, value: string) {
  return route.query[name] === value;
}
</script>

<template>
  <div v-for="optionGroup in optionGroups" :key="optionGroup.id" class="my-6">
    <p class="mb-2 text-slate-400">
      {{
        optionGroup.translations.find((t) => t.languageCode === locale)?.name
      }}
    </p>
    <div class="flex gap-4 flex-wrap">
      <Button
        v-for="option in optionGroup.options"
        :key="option.id"
        :color="
          isSelected(optionGroup.code, option.code) ? 'primary' : 'neutral'
        "
        :variant="
          isSelected(optionGroup.code, option.code) ? 'default' : 'outline'
        "
        class="min-w-16 justify-center"
        @click="toggleOption(optionGroup.code, option.code)"
      >
        {{ option.translations.find((t) => t.languageCode === locale)?.name }}
      </Button>
    </div>
  </div>
</template>

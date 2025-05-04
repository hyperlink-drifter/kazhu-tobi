<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const { locale, locales, setLocale } = useI18n();

const selectedLocale = computed(() =>
  locales.value.find((l) => l.code === locale.value)
);
</script>

<template>
  <Select
    v-model="selectedLocale"
    @update:modelValue="(l: any) => setLocale(l.code)"
    :defaultValue="selectedLocale?.name"
    :class="cn(props.class)"
  >
    <SelectTrigger>
      <SelectValue :placeholder="selectedLocale?.name" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="locale in locales" :value="locale">
          {{ locale.name }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

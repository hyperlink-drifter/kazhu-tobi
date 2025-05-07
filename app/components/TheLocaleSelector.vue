<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const { locale, locales, setLocale } = useI18n();

const selectedLocale = ref(locales.value.find((l) => l.code === locale.value));

watch(locale, (newLocale) => {
  selectedLocale.value = locales.value.find((l) => l.code === newLocale);
});
</script>

<template>
  <Select
    v-model="selectedLocale"
    @update:modelValue="(l: any) => setLocale(l.code)"
    :defaultValue="selectedLocale?.name"
  >
    <SelectTrigger :class="cn(props.class)">
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

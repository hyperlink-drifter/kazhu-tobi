<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <h1 class="text-gray-800">{{ t('welcome') }}</h1>
  </div>
</template>

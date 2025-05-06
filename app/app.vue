<template>
  <div class="h-full flex flex-col">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <TheHeader />
    <TheMain class="flex-grow">
      <NuxtPage />
    </TheMain>
    <TheFooter />
  </div>
</template>

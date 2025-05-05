<template>
  <div class="grid h-[calc(100svh-var(--spacing-header))]">
    <div
      class="flex col-start-1 row-start-1 h-[calc(100svh-var(--spacing-header))]"
    >
      <HeroImageCarousel />
    </div>
    <LayoutCenter class="col-start-1 col-end-2 row-start-1 h-full z-20">
      <LayoutCover
        class="min-h-[calc(100svh-var(--spacing-header))] prose prose-base sm:prose-lg lg:prose-xl dark:prose-invert"
      >
        <template #center>
          <h1>{{ $t('welcome') }}</h1>
          <NuxtLink
            :to="
              $localePath({
                name: 'products',
              })
            "
          >
            <Button as="div"> {{ $t('products') }}</Button>
          </NuxtLink>
        </template>
      </LayoutCover>
    </LayoutCenter>
  </div>
</template>

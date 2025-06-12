<template>
  <LayoutCenter class="py-8 md:py-12 bg-background">
    <ServerProducts
      v-slot="{ products }"
      as="ul"
      class="grid grid-cols-12 gap-x-2 sm:gap-x-4 gap-y-4"
    >
      <li
        v-for="product in products"
        :key="JSON.stringify(product)"
        class="col-span-6 md:col-span-4"
      >
        <ProductTile :product="product" />
      </li>
    </ServerProducts>
  </LayoutCenter>
</template>

<template>
  <LayoutCenter class="py-8 md:py-12 bg-background">
    <ProductListing v-slot="{ products }">
      <li
        v-for="product in products?.items"
        :key="JSON.stringify(product)"
        class="col-span-6 md:col-span-4 xl:col-span-3"
      >
        <ProductTileCard :product="product" />
      </li>
    </ProductListing>
  </LayoutCenter>
</template>

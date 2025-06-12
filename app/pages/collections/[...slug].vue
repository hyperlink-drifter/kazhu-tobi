<script setup lang="ts">
const route = useRoute('collections-slug___uk___default');

if (!route.params.slug?.length || !route.params.slug[0]) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Missing Collection Handle',
  });
}

const slug = route.params.slug[0];
</script>

<template>
  <LayoutCenter class="py-8 md:py-12">
    <ServerCollection :slug="slug" v-slot="{ products }" as="ul">
      <li
        v-for="product in products"
        :key="JSON.stringify(product)"
        class="col-span-6 md:col-span-4"
      >
        <ProductTile :product="product" />
      </li>
    </ServerCollection>
  </LayoutCenter>
</template>

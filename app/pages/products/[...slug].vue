<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

if (!route.params.slug?.length || !route.params.slug[0]) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Missing Product Handle',
  });
}

const slug = route.params.slug[0];

const { data, status } = await useLazyAsyncData(`product-${slug}`, () =>
  GqlGetProduct({
    slug,
  })
);

const product = computed(() => data?.value?.product);
</script>

<template>
  <div class="max-w-7xl px-6 text-center mx-auto">
    {{ status === 'pending' ? 'Loading' : product }}
  </div>
</template>

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (slug) {
    const { data } = await $v.GetProduct({ slug: slug as string });
    return data;
  }
});

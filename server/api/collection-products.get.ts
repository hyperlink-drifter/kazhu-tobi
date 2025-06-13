export default defineEventHandler(async (event) => {
  const { slug } = getQuery(event);

  if (slug) {
    const { data } = await $v.GetCollectionProducts({ slug: slug as string });
    return data;
  }
});

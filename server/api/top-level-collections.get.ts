export default defineEventHandler(async () => {
  const { data } = await $v.GetTopLevelCollections();
  return data;
});

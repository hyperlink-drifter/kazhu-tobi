import { $v } from '@@/server/utils/v';

export default defineEventHandler(async (event) => {
  const { slug } = getQuery(event);

  if (slug) {
    const { data } = await $v.GetProduct({ slug: slug as string });
    return data;
  }
});

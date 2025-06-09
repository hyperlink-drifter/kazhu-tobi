import { $v } from '@@/server/utils/v';

export default defineEventHandler(async (event) => {
  const { variables } = getQuery(event);

  if (variables) {
    const { data } = await $v.GetProducts(JSON.parse(variables as string));
    return data;
  } else {
    const { data } = await $v.GetProducts();
    return data;
  }
});

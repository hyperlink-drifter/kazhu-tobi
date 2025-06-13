export default defineEventHandler(async (event) => {
  const { productVariantId, quantity } = await readBody(event);

  const authCookie = getCookie(event, 'auth-token');

  const { data, headers } = await $v.AddItemToOrder(
    {
      productVariantId,
      quantity,
    },
    {
      ...(authCookie && { Authorization: `Bearer ${authCookie}` }),
    }
  );

  const token = headers.get('vendure-auth-token');

  if (token) {
    setCookie(event, 'auth-token', token, { httpOnly: true });
  }

  return data;
});

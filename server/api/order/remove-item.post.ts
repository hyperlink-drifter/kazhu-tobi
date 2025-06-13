export default defineEventHandler(async (event) => {
  const { orderLineId } = await readBody(event);

  const authCookie = getCookie(event, 'auth-token');

  const { data, headers } = await $v.RemoveItemFromOrder(
    {
      orderLineId,
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

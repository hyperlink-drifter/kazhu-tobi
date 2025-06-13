export default defineEventHandler(async (event) => {
  const authCookie = getCookie(event, 'auth-token');

  const { data, headers } = await $v.GetActiveOrder(undefined, {
    ...(authCookie && { Authorization: `Bearer ${authCookie}` }),
  });

  const token = headers.get('vendure-auth-token');

  if (token) {
    setCookie(event, 'auth-token', token, { httpOnly: true });
  }

  return data;
});

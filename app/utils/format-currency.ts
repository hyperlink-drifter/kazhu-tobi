// https://docs.vendure.io/guides/core-concepts/money/#displaying-monetary-values
export function formatCurrency(value: number) {
  const majorUnits = value / 100;
  try {
    // Note: if no `locale` is provided, the browser's default
    // locale will be used.
    return new Intl.NumberFormat('uk-UK', {
      style: 'currency',
      currency: 'UAH',
      currencyDisplay: 'code',
    }).format(majorUnits);
  } catch (e: any) {
    // A fallback in case the NumberFormat fails for any reason
    return majorUnits.toFixed(2);
  }
}

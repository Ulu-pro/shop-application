export const price_format = (number) => {
  return new Intl.NumberFormat(
      'ru-RU',
      {
        style: 'currency',
        currency: 'UZS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }
  ).format(number);
}
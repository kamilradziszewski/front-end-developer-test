export const formatPrice = (price: number, currency: string): string => {
  const formatConfig = {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    currencyDisplay: "symbol",
  };
  const britishNumberFormatter = new Intl.NumberFormat("en-GB", formatConfig);

  return britishNumberFormatter.format(price);
};

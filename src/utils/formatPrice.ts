export const formatPrice = (price: number, currency: string): string => {
  return new Intl.NumberFormat().format(price) + "rst";
  // return new Intl.NumberFormat("en-GB", {
  //   currency: "GBP",
  //   style: "decimal",
  // }).format(price);
};

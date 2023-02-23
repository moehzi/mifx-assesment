export const getDiscountPrice = (product) => {
  const discountOffer = product.off.split('Off');
  const price = product.price.split('$');
  return (
    parseInt(price[1]) - (parseInt(price[1]) * parseInt(discountOffer[0])) / 100
  );
};

export const getMinPrice = (currentMinPriceState: number) => {
  let minPrice = 0;
  if (currentMinPriceState > 0 && currentMinPriceState <= Number.MAX_VALUE) {
    minPrice = currentMinPriceState;
  }
  return minPrice;
};

export const getMaxPrice = (currentMaxPriceState: number) => {
  let maxPrice = 0;
  if (currentMaxPriceState > 0 && currentMaxPriceState <= Number.MAX_VALUE) {
    maxPrice = currentMaxPriceState;
  } else {
    maxPrice = Number.MAX_VALUE;
  }
  return maxPrice;
};

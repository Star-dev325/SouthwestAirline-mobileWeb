import { transformToFlightProducts } from 'src/shared/analytics/transformers/airBooking/results/flightProductsTransformer';

export const transformToBounds = (flightShoppingBounds) => {
  if (!flightShoppingBounds || flightShoppingBounds.cards === undefined) {
    return { flightProducts: [] };
  }

  return {
    flightProducts: transformToFlightProducts(flightShoppingBounds.cards)
  };
};

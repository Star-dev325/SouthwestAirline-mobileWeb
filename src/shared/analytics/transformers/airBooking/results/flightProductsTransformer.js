import _ from 'lodash';
import { transformToFareProducts } from 'src/shared/analytics/transformers/airBooking/results/fareProductsTransformer';

export const transformToFlightProducts = (cards) =>
  _.map(cards, (card) => ({
    numberOfStops: card._meta.numberOfStops,
    fareProducts: transformToFareProducts(card.fares)
  }));

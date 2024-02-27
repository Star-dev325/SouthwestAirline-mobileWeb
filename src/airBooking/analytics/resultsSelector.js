import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { transformToBounds } from 'src/shared/analytics/transformers/airBooking/results/boundsTransformer';

const getSortBy = (state) => _.get(state, 'analytics.AirBookingStore.sortBy');
const getResponse = (state) => _.get(state, 'app.airBooking.flightShoppingPage.response');

const sortByToSortMap = {
  departureTime: 'BY_DEPARTURE_TIME',
  startingFromAmount: 'BY_PRICE',
  numberOfStops: 'BY_NUMBER_OF_STOPS',
  durationMinutes: 'BY_DURATION'
};

export const getResults = createSelector([getSortBy, getResponse], (sortBy, response) => {
  const { flightShoppingPage: { outboundPage, inboundPage } = {} } = response;

  return {
    outbound: {
      sort: sortByToSortMap[sortBy['outbound'] || 'departureTime'],
      ...transformToBounds(outboundPage)
    },
    inbound: {
      sort: sortByToSortMap[sortBy['inbound'] || 'departureTime'],
      ...transformToBounds(inboundPage)
    }
  };
});

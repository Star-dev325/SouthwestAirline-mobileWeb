// @flow
import _ from 'lodash';

import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import {
  getFareData,
  getStopData,
  getFareDifferencesData,
  getSortedFareProducts,
  getFarePriceDifference
} from 'src/shared/analytics/helpers/mktgHelper';
import mktgDataConstants from 'src/shared/constants/mktgDataConstants';
import { flightChangeShoppingMktgSelector } from 'src/airChange/analytics/flightChangeShoppingMktgSelector';

const { NOT_SELECTED, OUTBOUND, POINTS_BOOKING, CURRENCY_BOOKING, INBOUND } = mktgDataConstants;
const getAirChangeDirection = (state) =>
  _.get(state, 'app.airChange.selectFarePage.selectedFlight.page.params.direction', null);
const getAirChangeSelectedFlight = (state) => _.get(state, 'app.airChange.selectFarePage.selectedFlight.card', {});
const getAirChangeOutboundCards = (state) =>
  _.get(state, 'app.airChange.changeShoppingPage.response.flights.outboundPage.cards', []);
const getAirChangeSelectedOutboundCardIndex = (state) =>
  _.get(state, 'app.airChange.changeShoppingPage.selectedProducts.outbound.flightCardIndex', -1);
const getBookingType = (state) =>
  (_.get(state, 'app.airChange.changeShoppingPage.response._meta.purchaseWithPoints', false)
    ? POINTS_BOOKING
    : CURRENCY_BOOKING);
const getSortedProducts = (state) =>
  getSortedFareProducts(_.get(state, 'app.airChange.changeShoppingPage.response.productDefinitions.products', []));

export const getAirChangeSelectedOutboundFlight = createSelector(
  [getAirChangeSelectedOutboundCardIndex, getAirChangeOutboundCards],
  (selectedOutboundCardIndex, outboundCards) => _.get(outboundCards, `${selectedOutboundCardIndex}`, {})
);

export const getAirChangeInboundFlight = createSelector(
  [getAirChangeDirection, getAirChangeSelectedFlight],
  (direction, selectedFlight) => (direction === OUTBOUND ? {} : selectedFlight)
);

export const getAirChangeOutboundFlight = createSelector(
  [getAirChangeDirection, getAirChangeSelectedFlight, getAirChangeSelectedOutboundFlight],
  (direction, selectedFlight, outboundFlight) => (direction === OUTBOUND ? selectedFlight : outboundFlight)
);

export const getAirChangeOutboundFareData = createSelector(
  [getAirChangeOutboundFlight, getAirChangeDirection, getSortedProducts, getBookingType],
  ({ fares }, direction, sortedProducts, bookingType) =>
    (direction === OUTBOUND && Array.isArray(fares)
      ? getFareData('air_bound1', [...fares], sortedProducts, bookingType, getFarePriceDifference)
      : {})
);

export const getAirChangeInboundFareData = createSelector(
  [getAirChangeInboundFlight, getSortedProducts, getBookingType],
  ({ fares = [] }, sortedProducts, bookingType) =>
    getFareData(
      'air_bound2',
      fares.length > 0 ? fares : sortedProducts.map(() => NOT_SELECTED),
      sortedProducts,
      bookingType,
      getFarePriceDifference
    )
);

export const getAirChangeOutboundStopData = createSelector([getAirChangeOutboundFlight], (outboundFlight) =>
  getStopData('air_bound1', outboundFlight)
);

export const getAirChangeInboundStopData = createSelector([getAirChangeInboundFlight], (inboundFlight) =>
  getStopData('air_bound2', inboundFlight)
);

export const getAirChangeOutboundFareDifferencesData = createSelector(
  [getAirChangeOutboundFlight, getBookingType, getAirChangeDirection],
  ({ fareDifferences }, bookingType, direction) =>
    (direction === OUTBOUND && Array.isArray(fareDifferences)
      ? getFareDifferencesData('air_bound1', bookingType, fareDifferences)
      : {})
);

export const getAirChangeInboundFareDifferencesData = createSelector(
  [getAirChangeInboundFlight, getBookingType, getAirChangeDirection],
  ({ fareDifferences }, bookingType, direction) =>
    (direction === INBOUND && Array.isArray(fareDifferences)
      ? getFareDifferencesData('air_bound2', bookingType, fareDifferences)
      : {})
);

export const flightChangeSelectedFlightMktgSelector = createSelector(
  [
    getAirChangeOutboundFareData,
    getAirChangeInboundFareData,
    getAirChangeOutboundStopData,
    getAirChangeInboundStopData,
    getAirChangeOutboundFareDifferencesData,
    getAirChangeInboundFareDifferencesData,
    flightChangeShoppingMktgSelector
  ],
  (
    outboundFareData,
    inboundFareData,
    outboundStopData,
    inboundStopData,
    outboundFareDifferencesData,
    inboundFareDifferencesData,
    [mktgData]
  ) => [
    _.merge(
      {},
      outboundFareData,
      inboundFareData,
      outboundStopData,
      inboundStopData,
      outboundFareDifferencesData,
      inboundFareDifferencesData,
      mktgData
    )
  ]
);

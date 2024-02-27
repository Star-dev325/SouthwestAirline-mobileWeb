// @flow
import _ from 'lodash';
import { ANALYTICS } from 'src/airBooking/constants/airBookingConstants';
import {
  getFareData,
  getFareDifferencesData,
  getSortedFareProducts,
  getStopData
} from 'src/shared/analytics/helpers/mktgHelper';
import mktgDataConstants from 'src/shared/constants/mktgDataConstants';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const { NOT_SELECTED, OUTBOUND, INBOUND, POINTS_BOOKING, CURRENCY_BOOKING } = mktgDataConstants;
const getSortedProducts = (state) =>
  getSortedFareProducts(
    _.get(state, 'app.airBooking.flightShoppingPage.response.flightShoppingPage.productDefinitions.products', [])
  );

const getDirection = (state) => _.get(state, 'app.airBooking.selectedFlight.currentDirection', null);
const getPromoCode = (state) => state?.app?.airBooking?.searchRequest?.promoCode;
const getIsCalendarStrip = (state) => state?.analytics?.AirBookingStore?.isCalendarStrip;
const getSelectedFlight = (state) => _.get(state, 'app.airBooking.selectedFlight', {});
const getOutboundCards = (state) =>
  _.get(state, 'app.airBooking.flightShoppingPage.response.flightShoppingPage.outboundPage.cards', []);
const getSelectedOutboundCardIndex = (state) =>
  _.get(state, 'app.airBooking.selectedProducts.adult.outbound.flightCardIndex', -1);
const getBookingType = (state) =>
  (_.get(state, 'app.airBooking.flightShoppingPage.response.flightShoppingPage._meta.purchaseWithPoints', false)
    ? POINTS_BOOKING
    : CURRENCY_BOOKING);
const getIsMultiSelect = (state) => _.get(state, 'app.airports.multiSelectGroup.isSelected', false);

export const getChangeSearchData = createSelector(getIsCalendarStrip, (isCalendarStrip) => (isCalendarStrip ? { isCalendarStrip } : {}));

export const getSelectedOutboundFlight = createSelector(
  [getSelectedOutboundCardIndex, getOutboundCards],
  (selectedOutboundCardIndex, outboundCards) => _.get(outboundCards, `${selectedOutboundCardIndex}`, {})
);

export const getInboundFlight = createSelector([getDirection, getSelectedFlight], (direction, selectedFlight) =>
  (direction === OUTBOUND ? {} : selectedFlight.inbound.card)
);

export const getOutboundFlight = createSelector(
  [getDirection, getSelectedFlight, getSelectedOutboundFlight],
  (direction, selectedFlight, outboundFlight) =>
    (direction === OUTBOUND ? selectedFlight.outbound.card : outboundFlight)
);

export const getOutboundFareData = createSelector(
  [getOutboundFlight, getDirection, getSortedProducts, getBookingType],
  ({ fares }, direction, sortedProducts, bookingType) =>
    (direction === OUTBOUND && Array.isArray(fares)
      ? getFareData('air_bound1', [...fares], sortedProducts, bookingType)
      : {})
);

export const getInboundFareData = createSelector(
  [getInboundFlight, getSortedProducts, getBookingType],
  ({ fares = [] }, sortedProducts, bookingType) =>
    getFareData(
      'air_bound2',
      fares.length > 0 ? fares : sortedProducts.map(() => NOT_SELECTED),
      sortedProducts,
      bookingType
    )
);

export const getOutboundStopData = createSelector([getOutboundFlight], (outboundFlight) =>
  getStopData('air_bound1', outboundFlight)
);

export const getInboundStopData = createSelector([getInboundFlight], (inboundFlight) =>
  getStopData('air_bound2', inboundFlight)
);

export const getOutboundFareDifferencesData = createSelector(
  [getOutboundFlight, getBookingType, getDirection],
  ({ fareDifferences }, bookingType, direction) =>
    (direction === OUTBOUND && Array.isArray(fareDifferences)
      ? getFareDifferencesData('air_bound1', bookingType, fareDifferences)
      : {})
);

export const getInboundFareDifferencesData = createSelector(
  [getInboundFlight, getBookingType, getDirection],
  ({ fareDifferences }, bookingType, direction) =>
    (direction === INBOUND && Array.isArray(fareDifferences)
      ? getFareDifferencesData('air_bound2', bookingType, fareDifferences)
      : {})
);

export const getMultiSelectData = createSelector(
  [getIsMultiSelect, getDirection],
  (isMultiSelect, direction) =>
    isMultiSelect &&
    (direction === OUTBOUND
      ? { ...ANALYTICS.MULTI_SELECT_PAGE_CONSTANTS, ...ANALYTICS.MULTI_SELECT_OUTBOUND_FARE_PAGE }
      : { ...ANALYTICS.MULTI_SELECT_PAGE_CONSTANTS, ...ANALYTICS.MULTI_SELECT_INBOUND_FARE_PAGE })
);

export const getSearchFormData = createSelector(getPromoCode, (promocode) => (promocode ? { promocode } : {}));

export const selectedFlightMktgSelector = createSelector(
  [
    getOutboundFareData,
    getInboundFareData,
    getOutboundStopData,
    getInboundStopData,
    getOutboundFareDifferencesData,
    getInboundFareDifferencesData,
    getMultiSelectData,
    getSearchFormData,
    getChangeSearchData
  ],
  (
    outboundFareData,
    inboundFareData,
    outboundStopData,
    inboundStopData,
    outboundFareDifferencesData,
    inboundFareDifferencesData,
    multiSelectData,
    searchFormData,
    changeSearchData
  ) => [
    _.merge(
      {},
      changeSearchData,
      outboundFareData,
      inboundFareData,
      outboundStopData,
      inboundStopData,
      outboundFareDifferencesData,
      inboundFareDifferencesData,
      multiSelectData,
      searchFormData
    )
  ]
);

// @flow
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants.js';
import {
  createMktgDataSelector,
  getFareData,
  getFarePriceDifference,
  getSortedFareProducts
} from 'src/shared/analytics/helpers/mktgHelper';
import mktgDataConstants from 'src/shared/constants/mktgDataConstants';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const { CURRENCY_BOOKING, POINTS_BOOKING } = mktgDataConstants;

const getMktgData = createMktgDataSelector('app.sameDay.sameDaySelectFarePage.mktg_data');
const getSelectedFlightFares = (state) => state?.app?.sameDay?.sameDaySelectFarePage?.fares || {};
const getShoppingPage = (state) => state?.app?.sameDay?.sameDayShoppingPage?.sameDayShoppingInformation || {};
const getBookingType = (state) => (getShoppingPage(state)?._meta?.purchaseWithPoints ? POINTS_BOOKING : CURRENCY_BOOKING);
const getSortedProducts = (state) => getSortedFareProducts(getShoppingPage(state)?.productDefinitions?.products || []);

const getSameDayFareData = createSelector(
  [getSelectedFlightFares, getSortedProducts, getBookingType],
  (fares, sortedProducts, bookingType) =>
    (Array.isArray(fares)
      ? getFareData('air_bound1', [...fares], sortedProducts, bookingType, getFarePriceDifference)
      : {})
);

export const sameDaySelectFarePageMktgSelector = createSelector(
  [getMktgData, getShoppingPage, getSameDayFareData],
  (mktgData, { mktg_data: sameDayShoppingMktgData }, fareData) => [
    {
      ...sameDayShoppingMktgData,
      ...mktgData,
      ...fareData,
      ...ANALYTICS.SELECT_FARE_PAGE
    },
    'otter',
    { page: ANALYTICS.SELECT_FARE_PAGE.page }
  ]
);

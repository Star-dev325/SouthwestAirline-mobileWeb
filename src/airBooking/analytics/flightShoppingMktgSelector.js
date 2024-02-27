// @flow
import _ from 'lodash';
import { getLfcBoundData, getLowFareCalendarSelectedPrice } from 'src/airBooking/analytics/lowFareCalendarSelector';
import { ANALYTICS } from 'src/airBooking/constants/airBookingConstants';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getIsMultiSelect = (state) => _.get(state, 'app.airports.multiSelectGroup.isSelected', false);
const getMktgData = createMktgDataSelector('app.airBooking.flightShoppingPage.response.flightShoppingPage.mktg_data');
const getDirection = (state) => _.get(state, 'app.airports.multiSelectGroup.currentDirection', null);
const getPromoCode = (state) => state?.app?.airBooking?.searchRequest?.promoCode;
const getIsCalendarStrip = (state) => state?.analytics?.AirBookingStore?.isCalendarStrip;

export const flightShoppingMktgSelector = createSelector(
  [getIsMultiSelect, getLowFareCalendarSelectedPrice, getMktgData, getDirection, getPromoCode, getIsCalendarStrip],
  (isMultiSelect, lowFareCalendarData, mktgData, direction, promoCode, isCalendarStrip) => {
    let analyticsData = { ...getLfcBoundData(lowFareCalendarData), ...mktgData };

    if (promoCode) {
      analyticsData.promocode = promoCode;
    }

    analyticsData.change_search = isCalendarStrip ? 'calendar strip' : 'initial search';

    if (isMultiSelect) {
      const pageAnalytics =
        direction === 'inbound' ? ANALYTICS.MULTI_SELECT_INBOUND_PAGE : ANALYTICS.MULTI_SELECT_OUTBOUND_BOUNDS_PAGE;
      const { page } = pageAnalytics;

      analyticsData = {
        ...analyticsData,
        ...ANALYTICS.MULTI_SELECT_PAGE_CONSTANTS,
        ...pageAnalytics
      };

      return [analyticsData, 'otter', { page }];
    }

    return [analyticsData];
  }
);

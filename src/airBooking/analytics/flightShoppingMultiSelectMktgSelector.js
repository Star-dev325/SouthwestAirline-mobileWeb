// @flow
import { ANALYTICS } from 'src/airBooking/constants/airBookingConstants';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getMktgData = createMktgDataSelector('app.airBooking.flightShoppingPage.multiSelectGroup.response.mktg_data');
const getPromoCode = (state) => state?.app?.airBooking?.searchRequest?.promoCode;
const getIsCalendarStrip = (state) => state?.analytics?.AirBookingStore?.isCalendarStrip;

export const flightShoppingMultiSelectMktgSelector = createSelector(
  [getMktgData, getPromoCode, getIsCalendarStrip],
  (mktgData, promoCode, isCalendarStrip) => {
    const pageAnalytics = { ...ANALYTICS.MULTI_SELECT_OUTBOUND_PAGE, ...ANALYTICS.MULTI_SELECT_PAGE_CONSTANTS };

    if (promoCode) {
      pageAnalytics['promocode'] = promoCode;
    }

    pageAnalytics['change_search'] = isCalendarStrip ? 'calendar strip' : 'initial search';

    return [{ ...mktgData, ...pageAnalytics }];
  }
);

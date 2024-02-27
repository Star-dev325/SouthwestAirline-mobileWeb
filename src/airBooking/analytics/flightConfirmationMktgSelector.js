// @flow
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { ANALYTICS } from 'src/airBooking/constants/airBookingConstants';

const getPromoCode = (state) => state?.app?.airBooking?.searchRequest?.promoCode;
const getMktgData = createMktgDataSelector('app.airBooking.flightShoppingPage.response.flightShoppingPage.mktg_data');

export const flightConfirmationMktgSelector = createSelector(
  [
    createMktgDataSelector('app.airBooking.flightConfirmationPage.response.flightConfirmationPage.mktg_data'),
    getPromoCode,
    getMktgData
  ],
  (mktgData, promocodeState, mktg_data) => {
    const promovalid = mktg_data.air_validpromo ? '1' : '0';
    const promocode = promocodeState ? promocodeState : null;
    const pageSpecificMktgData = {
      ...mktgData,
      ...ANALYTICS.FLIGHT_CONFIRMATION_PAGE,
      ...(promocode && { promocode, promovalid })
    };

    return [pageSpecificMktgData, 'otter', { page: ANALYTICS.FLIGHT_CONFIRMATION_PAGE.page }];
  }
);

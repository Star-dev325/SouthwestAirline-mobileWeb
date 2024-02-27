// @flow
import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { ANALYTICS } from 'src/airBooking/constants/airBookingConstants';

const getMktgData = createMktgDataSelector('app.airBooking.flightPricingPage.response.flightPricingPage.mktg_data');
const getNumberOfAdults = (state) => _.get(state, 'app.airBooking.searchRequest.numberOfAdults');
const getBounds = (state) => _.get(state, 'app.airBooking.flightPricingPage.response.flightPricingPage.bounds', []);
const getUpsellDetails = (state) =>
  _.get(state, 'app.airBooking.flightPricingPage.response.flightPricingPage.upsellDetails');

export const flightPricingMktgSelector = createSelector(
  [getMktgData, getNumberOfAdults, getBounds, getUpsellDetails],
  (mktgData, numberOfAdults, bounds, upsellDetails) => {
    const pageAnalytics = { ...ANALYTICS.PRICE_PAGE };
    const eligibleUpsellBoundNumber = bounds.filter((bound) => bound.upsellBoundDetails).length;
    const departureBoundUpsellPrice = parseFloat(bounds[0]?.upsellBoundDetails?.upsellPrice ?? '0');
    const returnBoundUpsellPrice = parseFloat(bounds[1]?.upsellBoundDetails?.upsellPrice ?? '0');

    const getUpSellLowestPriceCurrency = () => {
      let lowestPrice = departureBoundUpsellPrice || returnBoundUpsellPrice;

      if (departureBoundUpsellPrice && returnBoundUpsellPrice) {
        lowestPrice = Math.min(departureBoundUpsellPrice, returnBoundUpsellPrice);
      }

      return lowestPrice.toFixed(2);
    };

    pageAnalytics['upsell_eligiblebounds'] = upsellDetails ? numberOfAdults * eligibleUpsellBoundNumber : 0;
    upsellDetails &&
      (pageAnalytics['upsell_lowestpricecurrency'] = getUpSellLowestPriceCurrency());
    pageAnalytics['upsell_messagingdetails'] = upsellDetails
      ? `price|${upsellDetails.offerTitle}|${upsellDetails.upsellToProductId}`
      : null;
    pageAnalytics['upsell_shown'] = upsellDetails ? 1 : 0;

    return [
      {
        ...mktgData,
        ...pageAnalytics
      },
      'otter',
      { page_name: pageAnalytics.page_name }
    ];
  }
);

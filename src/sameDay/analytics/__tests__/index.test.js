jest.mock('src/sameDay/analytics/cancelStandbyConfirmationMktgSelector', () => ({
  sameDayCancelConfirmationPageMktgSelector: jest.fn(() => sameDayCancelConfirmationMktgSelector)
}));
jest.mock('src/sameDay/analytics/sameDayConfirmationPageMktgSelector', () => ({
  sameDayConfirmationPageMktgSelector: jest.fn(() => sameDayConfirmationMktgData)
}));
jest.mock('src/sameDay/analytics/sameDayFlightDetailsMktgSelector', () => ({
  sameDayFlightDetailsMktgSelector: jest.fn(() => sameDayFlightDetailsMktgData)
}));
jest.mock('src/sameDay/analytics/sameDayPaymentPageMktgSelector', () => ({
  sameDayPaymentPageMktgSelector: jest.fn(() => sameDayPaymentPageMktgSelector)
}));
jest.mock('src/sameDay/analytics/sameDayPriceDifferencePageMktgSelector', () => ({
  sameDayPriceDifferencePageMktgSelector: jest.fn(() => sameDayPriceDifferencePageMktgData)
}));
jest.mock('src/sameDay/analytics/sameDaySelectFlightPageMktgSelector', () => ({
  sameDaySelectFlightPageMktgSelector: jest.fn(() => sameDaySelectFlightMktgData)
}));

import sameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';
import * as SameDayAnalytics from 'src/sameDay/analytics/index';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

const sameDayCancelConfirmationMktgSelector = 'cancel standby mktg data';
const sameDayConfirmationMktgData = 'flight confirmation mktg data';
const sameDayFlightDetailsMktgData = 'flight details mktg data';
const sameDayPaymentPageMktgSelector = 'payment data';
const sameDayPriceDifferencePageMktgData = 'price difference mktg data';
const sameDaySelectFlightMktgData = 'flight change mktg data';

describe('index', () => {
  describe('dataLayerSelectorsForSameDay', () => {
    it('should return the Same Day shopping selector used for the marketing data layer', () => {
      expect(
        SameDayAnalytics.dataLayerSelectorsForSameDay[
          sameDayActionTypes.SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_SUCCESS
        ]()
      ).toStrictEqual(sameDaySelectFlightMktgData);
    });

    it('should return the standby cancel confirmation selector used for the marketing data layer', () => {
      expect(
        SameDayAnalytics.dataLayerSelectorsForSameDay[
          sameDayActionTypes.SAME_DAY__UPDATE_SAME_DAY_CANCELLATION_SUCCESS
        ]()
      ).toStrictEqual(sameDayCancelConfirmationMktgSelector);
    });

    it('should return the flight details selector used for the marketing data layer', () => {
      expect(
        SameDayAnalytics.dataLayerSelectorsForSameDay[
          sameDayActionTypes.SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO_SUCCESS
        ]()
      ).toStrictEqual(sameDayFlightDetailsMktgData);
    });

    it('should return the pricing info selector used for the marketing data layer', () => {
      expect(
        SameDayAnalytics.dataLayerSelectorsForSameDay[
          sameDayActionTypes.SAME_DAY__FETCH_SAME_DAY_PRICING_INFO_SUCCESS
        ]()
      ).toStrictEqual(sameDayPriceDifferencePageMktgData);
    });

    it('should return the flight confirmation selector used for the marketing data layer', () => {
      expect(
        SameDayAnalytics.dataLayerSelectorsForSameDay[
          sameDayActionTypes.SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_SUCCESS
        ]()
      ).toStrictEqual(sameDayConfirmationMktgData);
    });

    it('should return the payment page selector used for the marketing data layer', () => {
      expect(
        SameDayAnalytics.dataLayerSelectorsForSameDay[
          AnalyticsActionTypes.TRACE_SAME_DAY_PAYMENT_TYPE
        ]()
      ).toStrictEqual(sameDayPaymentPageMktgSelector);
    });
  });
});

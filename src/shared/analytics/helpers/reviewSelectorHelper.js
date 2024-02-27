import _ from 'lodash';
import { transformToUnitPrice } from 'src/airBooking/transformers/transformToEarlyBirdPriceDetails';

export const buildReviewAnalyticsData = (
  earlyBirdEligibility,
  purposeOfTravel,
  earlyBirdInPathRadioButtonChecked,
  flightPricingPageAnalyticsData,
  earlyBirdSelected
) => ({
  earlyBirdBasePriceCents: _.get(earlyBirdEligibility, 'unitPrice.amount', null),
  earlyBirdEstimatedTotalCents: _.get(earlyBirdEligibility, 'totalPrice.amount', null),
  earlyBirdOptionSelected: earlyBirdInPathRadioButtonChecked || earlyBirdSelected,
  earlyBirdOptionShown: _.some(_.get(earlyBirdEligibility, 'bounds', []), 'isEligible'),
  purposeOfTravel,
  earlyBirdBasePriceOutbound: _.get(transformToUnitPrice(_.get(earlyBirdEligibility, 'bounds[0]')), 'amount', null),
  earlyBirdBasePriceInbound: _.get(transformToUnitPrice(_.get(earlyBirdEligibility, 'bounds[1]')), 'amount', null),
  ...flightPricingPageAnalyticsData
});

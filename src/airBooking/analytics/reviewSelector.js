import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { buildReviewAnalyticsData } from 'src/shared/analytics/helpers/reviewSelectorHelper';

import { AIRBOOKING_PURCHASE_SUMMARY_FORM } from 'src/shared/constants/formIds';

const getEarlyBird = (state) => _.get(state, 'app.airBooking.earlyBirdEligibility');
const getPurposeOfTravel = (state) =>
  _.get(state, `app.formData.${AIRBOOKING_PURCHASE_SUMMARY_FORM}.data.purposeOfTravel`);
const getEarlyBirdInPathRadioButtonChecked = (state) =>
  _.get(state, `app.formData.${AIRBOOKING_PURCHASE_SUMMARY_FORM}.data.isEarlyBirdInPathRadioButtonChecked`, false);
const getFlightPricingPageAnalyticsData = (state) =>
  _.get(state, 'app.airBooking.flightPricingPage.response.flightPricingPage._analytics');
const earlyBirdSelected = (state) =>
  _.get(state, 'app.toggles.EARLY_BIRD_AB_TESTING', false) && _.get(state, 'app.airBooking.earlyBirdSelected');

export const getReview = createSelector(
  [
    getEarlyBird,
    getPurposeOfTravel,
    getEarlyBirdInPathRadioButtonChecked,
    getFlightPricingPageAnalyticsData,
    earlyBirdSelected
  ],
  buildReviewAnalyticsData
);

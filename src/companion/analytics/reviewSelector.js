import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { buildReviewAnalyticsData } from 'src/shared/analytics/helpers/reviewSelectorHelper';

import { COMPANION_PURCHASE_SUMMARY_FORM } from 'src/shared/constants/formIds';

const getEarlyBird = (state) => _.get(state, 'app.companion.earlyBirdEligibility');
const getPurposeOfTravel = (state) =>
  _.get(state, `app.formData.${COMPANION_PURCHASE_SUMMARY_FORM}.data.purposeOfTravel`);
const getEarlyBirdInPathRadioButtonChecked = (state) =>
  _.get(state, `app.formData.${COMPANION_PURCHASE_SUMMARY_FORM}.data.isEarlyBirdInPathRadioButtonChecked`, false);

export const getReview = createSelector(
  [getEarlyBird, getPurposeOfTravel, getEarlyBirdInPathRadioButtonChecked],
  buildReviewAnalyticsData
);

// @flow

import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getConfirmationResponseAnalytics = (state) =>
  _.get(state, 'app.airBooking.flightConfirmationPage.response.flightConfirmationPage._analytics');

export const getChase = createSelector([getConfirmationResponseAnalytics], (confirmationResponseAnalytics) => ({
  accountCreationStatus: _.get(confirmationResponseAnalytics, 'Chase.accountCreationStatus'),
  accountProvisioned: _.get(confirmationResponseAnalytics, 'Chase.accountProvisioned'),
  provisionedRR: _.get(confirmationResponseAnalytics, 'Chase.provisionedRR')
}));

import _ from 'lodash';

import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { buildPaymentAnalyticsData } from 'src/shared/analytics/helpers/paymentSelectorHelper';

const getSavedCreditCards = (state) => _.get(state, 'app.savedCreditCards');
const getPaymentInfo = (state) => _.get(state, 'app.airChange.paymentInfo');
const flightConfirmationPage = (state) => _.get(state, 'app.airChange.changeConfirmationPage.response');
const travelFundsRemainingBalance = (state) =>
  _.get(state, 'app.airChange.changePricingPage.response.fareSummary.totalDueNow');

export const getPayment = createSelector(
  [getPaymentInfo, getSavedCreditCards, flightConfirmationPage, travelFundsRemainingBalance],
  buildPaymentAnalyticsData
);

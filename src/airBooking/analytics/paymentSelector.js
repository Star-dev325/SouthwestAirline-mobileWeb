import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { buildPaymentAnalyticsData } from 'src/shared/analytics/helpers/paymentSelectorHelper';

const getSavedCreditCards = (state) => _.get(state, 'app.savedCreditCards');
const getPaymentInfo = (state) => _.get(state, 'app.airBooking.paymentInfo');
const flightConfirmationPage = (state) =>
  _.get(state, 'app.airBooking.flightConfirmationPage.response.flightConfirmationPage');
const travelFundsRemainingBalance = (state) =>
  _.get(state, 'app.airBooking.applyTravelFundsPage.response.balanceRemaining');

export const getPayment = createSelector(
  [getPaymentInfo, getSavedCreditCards, flightConfirmationPage, travelFundsRemainingBalance],
  buildPaymentAnalyticsData
);

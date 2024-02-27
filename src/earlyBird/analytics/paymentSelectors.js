import _ from 'lodash';

import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { buildPaymentAnalyticsData } from 'src/shared/analytics/helpers/paymentSelectorHelper';

const getSavedCreditCards = (state) => _.get(state, 'app.savedCreditCards');
const getPaymentInfo = (state) => _.get(state, 'app.earlyBird.paymentInfo');

export const getPayment = createSelector([getPaymentInfo, getSavedCreditCards], buildPaymentAnalyticsData);

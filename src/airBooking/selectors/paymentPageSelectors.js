// @flow
import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import * as CurrencyValueHelper from 'src/shared/helpers/currencyValueHelper';
import { APPLICATION_TYPES, PRICE_TYPES } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import {
  getUpliftAdditionalMessaging,
  getShouldShowUplift,
  getShouldDisableUplift
} from 'src/shared/selectors/upliftSelector';

import type { ApplicationInfo } from 'src/airBooking/flow-typed/airBooking.types';

const getApplicationInfo = (state) => _.get(state, 'app.chase.applicationInfo');
const getAmount = (state) =>
  _.get(state, 'app.airBooking.flightPricingPage.response.flightPricingPage.totals.moneyTotal.amount', '0');

export const shouldShowChaseInstantCreditCard = createSelector(
  [getApplicationInfo, getAmount],
  (applicationInfo: ?ApplicationInfo, amount: string): boolean => {
    const { isApproved = false, isValidChaseSessionId = false, credit } = applicationInfo || {};

    const totalAmount = CurrencyValueHelper.toNumberFromFormattedString(amount);
    const totalCredit = CurrencyValueHelper.toNumberFromFormattedString(credit);
    const newCardHasSufficientFunds = !!(totalCredit && totalCredit >= totalAmount);

    return isApproved && isValidChaseSessionId && newCardHasSufficientFunds;
  }
);

export const getUpliftAdditionalMessagingTripTotal = (state: *) =>
  getUpliftAdditionalMessaging(PRICE_TYPES.UP_TRIP_TOTAL)(state);

export const getShouldShowUpliftAirBooking = (state: *) => getShouldShowUplift(APPLICATION_TYPES.AIR_BOOKING)(state);
export const getShouldDisableUpliftAirBooking = (state: *) =>
  getShouldDisableUplift(state, APPLICATION_TYPES.AIR_BOOKING)(state);

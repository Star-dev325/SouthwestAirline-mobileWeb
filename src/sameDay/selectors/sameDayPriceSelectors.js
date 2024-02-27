import { DOLLAR, POINTS } from 'src/shared/constants/currencyTypes';
import { get } from 'src/shared/helpers/jsUtils';

const getCurrencyCodeWithFareSummarySelector = (fareSummarySelector, state) => {
  const { amountDue, creditDue, isPointsBooking } = fareSummarySelector(state) ?? {};
  let currencyCode = creditDue?.fare?.currencyCode || amountDue?.fare?.currencyCode;

  if (!currencyCode || isPointsBooking) {
    currencyCode = amountDue?.tax?.currencyCode ?? isPointsBooking ? POINTS : DOLLAR;
  }

  return currencyCode;
};

const getSameDayPricingPage = (state) => state.app.sameDay.sameDayPricingPage;
const getSameDayPricingPageFareSummary = (state) => getSameDayPricingPage(state)?.fareSummary;
const getSameDayRefundPage = (state) => state.app.sameDay.sameDayRefundPage;
const getSameDayRefundPageFareSummary = (state) => getSameDayRefundPage(state)?.fareSummary;

export const getSameDayPricingPageCurrencyType = (state) =>
  getCurrencyCodeWithFareSummarySelector(getSameDayPricingPageFareSummary, state);
export const getSameDayRefundPageCurrencyType = (state) =>
  getCurrencyCodeWithFareSummarySelector(getSameDayRefundPageFareSummary, state);
export const getSameDayPricingPageFareCurrencyType = (state) =>
  (getSameDayPricingPageFareSummary(state)?.isPointsBooking ? POINTS : DOLLAR);

const isPricingFlow = (state) => get(state, 'router.location.pathname')?.includes('price-difference');

export const getSameDayCurrencyType = (state) =>
  (isPricingFlow(state) ? getSameDayPricingPageCurrencyType(state) : getSameDayRefundPageCurrencyType(state));

export const getSameDayFareSummary = (state) =>
  (isPricingFlow(state) ? getSameDayPricingPageFareSummary(state) : getSameDayRefundPageFareSummary(state));

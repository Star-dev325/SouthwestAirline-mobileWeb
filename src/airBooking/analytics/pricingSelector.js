// @flow

import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { addCurrency } from 'src/shared/api/helpers/currencyHelper';

import type { FlightPricingBound } from 'src/shared/flow-typed/shared.types';

const isChaseBannerShown = (state) => _.get(state, 'analytics.AirBookingStore.isChaseBannerShown');
const isChaseFlowCompleted = (state) => _.get(state, 'analytics.AirBookingStore.isChaseFlowCompleted');
const getPricingBounds = (state) => _.get(state, 'app.airBooking.flightPricingPage.response.flightPricingPage.bounds');
const getPricingTotals = (state) => _.get(state, 'app.airBooking.flightPricingPage.response.flightPricingPage.totals');

const getBookingCodeByBound = (bound) => {
  const passengers = _.get(bound, 'passengers');

  return { bookingCode: passengers[0].bookingCode };
};

const getTotals = (totals) => {
  const { adultFare } = totals;
  const {
    totalPerPassenger,
    baseFare: {
      fare: { currencyCode, amount },
      discount
    }
  } = adultFare;
  const isUsingPoints = currencyCode === 'PTS';

  const baseFareCents = !isUsingPoints ? amount : undefined;
  const baseFarePoints = isUsingPoints ? amount : undefined;
  const priceTotalAmountCents = isUsingPoints ? totalPerPassenger.points.amount : totalPerPassenger.money.amount;

  let discountedBaseFareCents;

  if (!isUsingPoints) {
    discountedBaseFareCents = discount ? discount.amount : amount;
  }

  let discountedBaseFarePoints;

  if (isUsingPoints) {
    discountedBaseFarePoints = discount ? discount.amount : amount;
  }

  const taxesAndFees = _.map(adultFare.taxesAndFees, 'fee');
  const taxesAndFeesTotal = _.get(addCurrency(...taxesAndFees), 'amount', '0.00');

  return {
    baseFareCents,
    baseFarePoints,
    discountedBaseFareCents,
    discountedBaseFarePoints,
    priceTotalAmountCents,
    taxesAndFees: taxesAndFeesTotal
  };
};

const getFlightNumber = (bounds: Array<FlightPricingBound>) =>
  _.chain(bounds)
    .flatMap((bound) => bound.flights || {})
    .map('number')
    .compact()
    .join('|')
    .value();

export const getPricing = createSelector(
  [getPricingBounds, getPricingTotals, isChaseBannerShown, isChaseFlowCompleted],
  (bounds, totals, bannerShown, flowDone) => {
    if (!bounds || !totals) return {};
    const outbound = _.get(bounds, '0');
    const inbound = _.get(bounds, '1');
    const isRoundTrip = bounds.length === 2;

    return {
      adult: {
        inbound: isRoundTrip ? getBookingCodeByBound(inbound) : undefined,
        outbound: getBookingCodeByBound(outbound),
        priceSearchTotals: getTotals(totals)
      },
      flightNumber: getFlightNumber(bounds),
      chaseBannerShown: bannerShown,
      chaseFlowCompleted: flowDone ? true : undefined
    };
  }
);

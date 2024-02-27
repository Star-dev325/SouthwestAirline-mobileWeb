// @flow

import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import mktgDataConstants from 'src/shared/constants/mktgDataConstants';

import type { CurrencySuit } from 'src/shared/flow-typed/shared.types';
import type { LowFareCalendarDaysType, LowFareCalendarData } from 'src/airBooking/flow-typed/lowFare.types';

const { NOT_SELECTED } = mktgDataConstants;

const getLFCOutboundDays = (state) => _.get(state, 'app.airBooking.lowFareCalendar.outboundPage.lowFareCalendarDays');
const getLFCInboundDays = (state) => _.get(state, 'app.airBooking.lowFareCalendar.inboundPage.lowFareCalendarDays');
const getLFCAnalytics = (state) =>
  _.get(state, 'app.airBooking.lowFareCalendar.response.lowFareCalendarPage.lowFareCalendarAnalytics');
const getLFCSelectedDays = (state) => _.get(state, 'app.airBooking.lowFareCalendar.selectedDates');

const getSelectedPrice = (targetedDay: LowFareCalendarDaysType, currencyCode: CurrencySuit) => {
  if (targetedDay.lowestPrice && targetedDay.lowestPrice.price.currencyCode === currencyCode) {
    return _.get(targetedDay.lowestPrice.price, 'amount', '').replace(/,/g, '');
  }

  return 'none';
};

const getSelectedValues = (
  selectedDays,
  outboundDays: Array<LowFareCalendarDaysType> = [],
  inboundDays: Array<LowFareCalendarDaysType> = []
) => {
  const selections = {
    priceoutselected: 'none',
    pricereturnselected: 'none',
    pointsoutselected: 'none',
    pointsreturnselected: 'none'
  };
  let inboundDay, outboundDay;

  if (selectedDays) {
    outboundDay = selectedDays.outboundDate
      ? outboundDays.find((d) => d.date === selectedDays.outboundDate && d.lowestPrice)
      : null;
    inboundDay = selectedDays.inboundDate
      ? inboundDays.find((d) => d.date === selectedDays.inboundDate && d.lowestPrice)
      : null;
  } else {
    return null;
  }

  if (outboundDay) {
    selections.priceoutselected = getSelectedPrice(outboundDay, 'USD');
    selections.pointsoutselected = getSelectedPrice(outboundDay, 'PTS');
  }

  if (inboundDay) {
    selections.pricereturnselected = getSelectedPrice(inboundDay, 'USD');
    selections.pointsreturnselected = getSelectedPrice(inboundDay, 'PTS');
  }

  return selections;
};

export const getLowFareCalendarSelectedPrice = createSelector(
  [getLFCOutboundDays, getLFCInboundDays, getLFCSelectedDays],
  (outboundDays, inboundDays, selectedDays) => ({ ...getSelectedValues(selectedDays, outboundDays, inboundDays) })
);

export const getLowFareCalendarRequest = createSelector(
  [getLFCAnalytics, getLowFareCalendarSelectedPrice],
  (lfcAnalytics, lowFareCalendarData) => ({
    ...lfcAnalytics,
    ...lowFareCalendarData
  })
);

export const getLfcBoundData = (lowFareCalendarData: LowFareCalendarData = {}) => {
  const {
    priceoutselected = NOT_SELECTED,
    pricereturnselected = NOT_SELECTED,
    pointsoutselected = NOT_SELECTED,
    pointsreturnselected = NOT_SELECTED
  } = lowFareCalendarData;

  return {
    lfc_bound1_selectedcurrency: priceoutselected,
    lfc_bound2_selectedcurrency: pricereturnselected,
    lfc_bound1_selectedpoints: pointsoutselected,
    lfc_bound2_selectedpoints: pointsreturnselected
  };
};

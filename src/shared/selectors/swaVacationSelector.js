// @flow
import _ from 'lodash';
import dayjs from 'dayjs';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getCurrencyType = (state: *) => _.get(state, 'app.airBooking.searchRequest.currencyType');
const getDepartureDate = (state: *) => _.get(state, 'app.airBooking.searchRequest.departureDate');
const getIsRoundTrip = (state: *) => _.get(state, 'app.airBooking.searchRequest.isRoundTrip');
const getIsCorporateBooking = (state: *) => !!_.get(state, 'app.account.corporateInfo.selectedCompany');

export const isSWAVacationEligible = createSelector(
  [getCurrencyType, getDepartureDate, getIsRoundTrip, getIsCorporateBooking],
  (currencyType, departureDate, isRoundTrip, isCorporateBooking) => {
    const today = dayjs();
    const isSameDayBooking = dayjs(departureDate).isSame(today, 'day');

    return currencyType === 'USD' && isRoundTrip && !isSameDayBooking && !isCorporateBooking;
  }
);

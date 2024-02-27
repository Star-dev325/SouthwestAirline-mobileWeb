// @flow

import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { addCurrency } from 'src/shared/api/helpers/currencyHelper';

import { RAPID_REWARDS_VISA_ID } from 'src/shared/constants/creditCardConstants';

const getIsChaseRapidReward = (state) =>
  _.get(state, 'app.airBooking.paymentInfo.selectedCardId') === RAPID_REWARDS_VISA_ID;
const getConfirmationResponse = (state) =>
  _.get(state, 'app.airBooking.flightConfirmationPage.response.flightConfirmationPage');
const getAnalyticsData = (state) =>
  _.get(state, 'app.airBooking.flightConfirmationPage.response.flightConfirmationPage._analytics');

export const getConfirmation = createSelector(
  [getIsChaseRapidReward, getConfirmationResponse, getAnalyticsData],
  (isChaseRapidReward, confirmationResponse, analyticsData) => {
    const adultPnr = _.get(confirmationResponse, 'totals.adultFare._meta.recordLocator');
    const earlyBirdOfAdultSucceeded =
      !_.get(confirmationResponse, 'totals.adultFare._meta.failedEarlyBird') &&
      !_.isEmpty(_.get(confirmationResponse, 'totals.adultFare.earlyBirdPriceDetails'));
    const adultEBTotals = _.chain(confirmationResponse)
      .get('totals.adultFare.earlyBirdPriceDetails')
      .map('total')
      .value();
    const adultEBGrandTotalPrice = _.get(addCurrency(...adultEBTotals), 'amount');

    const earlyBirdInPathRadioButtonChecked = !_.isEmpty(
      _.get(confirmationResponse, 'totals.adultFare.earlyBirdPriceDetails')
    );

    const adultGroup = {
      earlyBirdFailureDueToChase: earlyBirdInPathRadioButtonChecked ? isChaseRapidReward : null,
      earlyBirdSucceeded: earlyBirdInPathRadioButtonChecked ? earlyBirdOfAdultSucceeded : null,
      earlyBirdTotalCostCents:
        earlyBirdInPathRadioButtonChecked && earlyBirdOfAdultSucceeded ? adultEBGrandTotalPrice : null,
      pnr: adultPnr
    };

    return {
      reservationGroups: _.compact([adultGroup]),
      ...analyticsData
    };
  }
);

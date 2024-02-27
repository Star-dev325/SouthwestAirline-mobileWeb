// @flow

import * as purchaseSummaryPageHelper from 'src/airBooking/helpers/purchaseSummaryPageHelper';
import * as FlightBookingApi from 'src/shared/api/flightBookingApi';
import AirBookingActionTypes, { apiActionCreator } from 'src/airBooking/actions/airBookingActionTypes';
import { setEarlyBirdEligibility, setEarlyBirdPricingDifference } from 'src/airBooking/actions/airBookingActions';

import type { CurrencySuit, EarlyBirdPricing, PassengerInfos } from 'src/shared/flow-typed/shared.types';
import type { EarlyBirdEligibility } from 'src/airBooking/flow-typed/airBooking.types';

const { fetchEarlyBirdInPathInfo, fetchEarlyBirdInPathInfoSuccess, fetchEarlyBirdInPathInfoFailed } = apiActionCreator(
  AirBookingActionTypes.AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO
);

export const fetchEarlybirdPricing = (
  earlyBirdPricing: EarlyBirdPricing,
  passengerInfos: PassengerInfos,
  currencyType: CurrencySuit,
  earlyBirdPricingToken?: string
) => {
  const earlybirdInPathRequest = purchaseSummaryPageHelper.transformToEarlybirdInPathRequest(
    earlyBirdPricing,
    passengerInfos,
    currencyType,
    earlyBirdPricingToken
  );

  return (dispatch: *) => {
    dispatch(fetchEarlyBirdInPathInfo());

    return FlightBookingApi.retrieveEarlyBirdInPathInfo(earlybirdInPathRequest)
      .then((response) => {
        const { earlyBirdPricingDifference = null, earlyBirdEligibility = null } = response || {};

        earlyBirdEligibility && dispatch(setEarlyBirdEligibility(earlyBirdEligibility));
        earlyBirdPricingDifference && dispatch(setEarlyBirdPricingDifference(earlyBirdPricingDifference));

        return dispatch(fetchEarlyBirdInPathInfoSuccess(response));
      })
      .catch(() => dispatch(fetchEarlyBirdInPathInfoFailed()));
  };
};

export const saveEarlyBirdEligibility = (earlyBirdEligibility: EarlyBirdEligibility) => ({
  type: AirBookingActionTypes.AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
  response: { earlyBirdEligibility }
});

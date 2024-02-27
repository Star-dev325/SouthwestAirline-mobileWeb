// @flow
import { transformToCalculatePassengersArray } from 'src/travelFunds/transformers/travelFundsTransformer';
import { SPLIT_PAY_CALC_FUNDS_HREF } from 'src/airBooking/constants/airBookingConstants';

import type { SplitPayLinksObj, UserNameInfo } from 'src/airBooking/flow-typed/applyRapidRewards.types';
import type { PassengerInfos } from 'src/shared/flow-typed/shared.types';

export const splitPayOptionsSecureRequestObj = (
  fundsAppliedToken: ?string,
  passengerInfos: PassengerInfos,
  splitPayLinksObj: SplitPayLinksObj
) => {
  const passengers = transformToCalculatePassengersArray(passengerInfos);

  const splitPayCallRequestObj = Object.assign({}, splitPayLinksObj, {
    body: { fundsAppliedToken, passengers, ...splitPayLinksObj?.body }
  });

  return splitPayCallRequestObj;
};

export const transformToCalculateSplitPayCalcFundsRequest = (
  formData: *,
  fundsAppliedToken: ?string,
  itineraryPricingToken: ?string,
  passengerInfos: PassengerInfos,
  userNameInfo: UserNameInfo
) => {
  const { selectedRadioOption } = formData;
  const { firstName, lastName } = userNameInfo || {};

  return {
    method: 'POST',
    href: SPLIT_PAY_CALC_FUNDS_HREF,
    body: {
      cashPointsPage: true,
      firstName,
      fundsAppliedToken,
      itineraryPricingToken,
      lastName,
      passengers: transformToCalculatePassengersArray(passengerInfos),
      travelFundIdentifier: selectedRadioOption
    }
  };
};

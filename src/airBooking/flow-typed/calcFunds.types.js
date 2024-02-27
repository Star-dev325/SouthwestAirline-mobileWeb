// @flow
import type {
  LinkRequestType
} from 'src/shared/flow-typed/shared.types';

export type cashPointsPageType = {
    cashPointsPage?: ?boolean
}

export type CalcFundsRequestType = LinkRequestType & {
  body: cashPointsPageType & (CalcFundsRTFRequestBodyType | CalcFundsVoucherCardRequestBodyType)
}

export type CalcFundsRTFRequestBodyType = {
  travelFundIdentifier: string,
  firstName: string,
  lastName: string,
  passengers?: CalcFundsPassengerType,
  fundsAppliedToken: ?string,
  itineraryPricingToken: string
}

export type CalcFundsVoucherCardRequestBodyType = {
  travelFundIdentifier: string,
  securityCode: string,
  passengers?: CalcFundsPassengerType,
  fundsAppliedToken: ?string,
  itineraryPricingToken: string
}

export type RemoveFundRequestType = LinkRequestType & {
  body: RemoveFundRequestBodyType
}

export type RemoveFundRequestBodyType = cashPointsPageType & {
  fundsAppliedToken: ?string,
  itineraryPricingToken: string,
  passengers?: CalcFundsPassengerType,
  removalTravelFundId: string
}

export type RefreshFundsRequestType = LinkRequestType & {
  body: RefreshFundsRequestBodyType
}

export type RefreshFundsRequestBodyType = {
  passengers?: CalcFundsPassengerType,
  fundsAppliedToken: ?string,
  itineraryPricingToken: string
}

export type CalcFundsPassengerType = Array<{
  passengerReference: number,
  passengerType: string,
  dateOfBirth: ?string,
  gender: ?string,
  accountNumber: ?string,
  name: {
    firstName: string,
    middleName: ?string,
    lastName: string,
    suffix: ?string
  }
}>;

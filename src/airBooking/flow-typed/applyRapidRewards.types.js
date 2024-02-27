// @flow
import type { CurrencyType, FlightProductCurrencyType, LinkRequestType, PassengerName, TotalsType } from 'src/shared/flow-typed/shared.types';
import type { RetrievedFundType } from 'src/travelFunds/flow-typed/travelFunds.types';

export type SplitPayType = {
  itineraryPricingToken: string,
  offerId: string,
  promoCodeToken: ?string,
};

export type SplitPayOptionsListRequestType = {
  fundsAppliedToken: ?string,
  itineraryPricingToken: string,
  offerId: string,
  passengers?: SplitPayOptionsPassengerType,
  promoCodeToken: ?string
};

export type SplitPayCalcFundsRequestType = LinkRequestType & {
  body?: CalcFundsSplitPayRequestBodyType
}

export type CalcFundsSplitPayRequestBodyType = PassengerName & {
  fundsAppliedToken: ?string,
  itineraryPricingToken: ?string,
  passengers?: SplitPayOptionsPassengerType,
  pnrToken?: string,
  securityCode?: string,
  travelFundIdentifier: string
}
export type SplitPayFundType = {
  fundIdentifier: string,
  passengerFirstName: string,
  passengerLastName: string,
  pnrToken: ?string,
  securityCode: ?string
};

export type UserNameInfo = PassengerName & {
  middleName?: string,
  suffix?: string
};

export type SplitPayLinksObj = {
  body: SplitPayType,
  href: string,
  method: HttpMethod
};

export type SplitPayOptionsPassengerType = Array<{
  accountNumber?: ?string,
  dateOfBirth: ?string,
  gender: ?string,
  name: {
    firstName: string,
    lastName: string,
    middleName: ?string,
    suffix: ?string
  },
  passengerReference: number,
  passengerType: string
}>;

export type SplitPayLinksType = {
  calculateFunds: ?SplitPayCalcFunds
};

export type SplitPayPageSuccessType = {
  _links?: SplitPayLinksType,
  splitPayOptions: ?Array<SplitPayRadioOptionsArray>,
  termsAndConditions?: string,
};

export type SplitPayPageResponseType = {
  balanceRemaining?: CurrencyType,
  fundsAppliedToken: string,
  selectedSplitPay: ?number,
  splitPayMessage: ?{
    body: string,
    header: ?string,
    icon: string,
    key: string,
    textColor: string
  },
  splitPayPage: SplitPayPageSuccessType,
  totalFunds?: FlightProductCurrencyType,
  totalPointsApplied: ?TotalPointsAppliedType,
  totals?: TotalsType,
  travelFunds?: Array<RetrievedFundType>
};

export type ApplySplitPayPageCalcFundsResponse = {
  balanceRemaining: ?CurrencyType,
  fundsAppliedToken: ?string,
  selectedSplitPay: ?number,
  taxesAndFees?: ?Array<Fee>,
  totalFunds: ?CurrencyType,
  totalPointsApplied: ?TotalPointsAppliedType,
  totals: ?TotalsType,
  travelFunds: ?Array<RetrievedFundType>
};

type Fee = {
  code: string,
  description: ?string,
  fee: CurrencyType
};

export type TotalPointsAppliedType = {
  moneyApplied: ?CurrencyType,
  pointsApplied: ?CurrencyType
}

export type SplitPayRadioOptionsArray = {
  pointsAmount: string,
  revenueAmount: string,
  fundIdentifier: ?string,
  splitPayOptionPointsAmount: number
};

export type SplitPayCalcFunds = {
  body: {
    promoCodeToken: ?string,
    itineraryPricingToken: ?string
  },
  href: ?string,
  labelText?: string,
  method: HttpMethod,
  xhref?: string,
  xphref?: string
};

export type SplitPayMessageType = {
  body: string,
  header: ?string,
  icon: string,
  key: string,
  textColor: string
};

// @flow

import type {
  TotalPointsAppliedType
} from 'src/airBooking/flow-typed/applyRapidRewards.types';
import type {
  CurrencyType,
  TotalsType,
  LinkRequestType,
  GreyBoxMessage as GreyBoxMessageType
} from 'src/shared/flow-typed/shared.types';

import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';

export type TravelFundsOptionsType = 'travel-funds' | 'luv-voucher' | 'gift-card';

export type LookUpRTFFundType = {
  confirmationNumber: string,
  passengerFirstName: string,
  passengerLastName: string
};

export type LookUpVoucherFundType = {
  voucherNumber: string,
  securityCode: string
};

export type LookUpCardFundType = {
  cardNumber: string,
  securityCode: string
};

export type LookUpFormFieldType = {
  fieldName: string,
  placeholder: string,
  type: string,
  maxLength?: number,
  pattern?: string
};

export type LookUpFundRequestLinkType = LookUpFundRequestType & {
  labelText?: string
}

export type LookUpFundRequestType = LinkRequestType & {
  body?: LookUpFundRTFRequestBody | LookUpFundVoucherCardRequestBody | LookUpTransferabilityBody
}

type LookUpTransferabilityBody = {
  pnrToken: string
}

type LookUpFundRTFRequestBody = {
  travelFundIdentifier: string,
  firstName: string,
  lastName: string
}

type LookUpFundVoucherCardRequestBody = {
  travelFundIdentifier: string,
  securityCode: string
}

export type RetrievedFundType = {
  appliedPoints?: CurrencyType,
  appliedPointsAmount?: ?CurrencyType,
  greyBoxMessage?: ?GreyBoxMessageType,
  currentAmount?: ?CurrencyType,
  nonRefundableAmount?: ?CurrencyType,
  pointsRemaining?: ?string,
  refundableAmount?: ?CurrencyType,
  transferableText?: string,
  appliedAmount: ?CurrencyType,
  remainingAmount: ?CurrencyType,
  displayName: string,
  fundIdentifier: string,
  travelFundType: string,
  errorMessage?: ?string,
  expirationDate?: string,
  expirationDateString?: ?string,
  leisureFund?: boolean,
  _links?: ?{
    removeTravelFund?: RemoveTravelFundType,
    validateTransfer?: LookUpFundRequestLinkType,
    associateFund?: LookUpFundRequestLinkType
  }
}

export type ApplyTravelFundsPageResponse = {
  balanceRemaining: ?CurrencyType,
  fundsAppliedToken: ?string,
  termsAndConditions?: string,
  totalFunds: ?CurrencyType,
  totalPointsApplied: ?TotalPointsAppliedType,
  totals: ?TotalsType,
  travelFunds: ?Array<RetrievedFundType>
}

export type RemoveTravelFundType = LinkRequestType & {
  body: {
    removalTravelFundId: string
  }
}

export type ViewTravelFundLinkRequestType = LinkRequestType & {
  body: {
    fundSearchToken: string
  },
  labelText?: string
}

export type ViewTravelFundsLinkRequestInfo = {
  requestLink?: ViewTravelFundLinkRequestType,
  type?: TravelFundType
}

type TravelFundType = TravelFundsConstants.TRANSFER_FUNDS_TYPE | TravelFundsConstants.ASSOCIATE_FUNDS_TYPE

export type ValidateTransferPageResponse = {
  viewTravelFund: TransferViewTravelFund,
  transferAmount: CurrencyType,
  _links?: ?{
    transferFund: ViewTravelFundLinkRequestType
  },
  learnMoreWithLinks: string,
  recipientInfoText: string
}

export type TransferViewTravelFund = {
  expirationDate: string,
  travelFundType: string,
  displayName: string,
  fundIdentifier: string,
  transferableAmount: CurrencyType,
  leisureFund: boolean,
  expirationDateString?: string,
}

export type TransferTravelFundsRequestType = LinkRequestType & {
  body: TransferTravelFundsRequestBody
}

type TransferTravelFundsRequestBody = {
  fundSearchToken: string,
  recipientFirstName: string,
  recipientLastName: string,
  recipientAccountNumber: string,
  recipientEmailAddress: string,
  personalMessage?: string,
  receiptEmailAddress: ?string,
  transferAmount: CurrencyType
}

export type TransferTravelFundsPageResponse = {
  headerMessage: TransferTravelFundsPageHeaderMessage,
  originalTravelFund: TransferViewTravelFund,
  recipientDetails: TransferTravelFundsPageRecipientDetails,
  transferredAmount: CurrencyType
}

type TransferTravelFundsPageHeaderMessage = {
  key: string,
  header: string,
  body: string,
  icon: string,
  textColor: string,
  note: string
}

export type TransferTravelFundsPageRecipientDetails = {
  displayName: string,
  accountNumber: string,
  emailAddress: string,
  personalMessage?: string
}

export type AssociateFundsMessageResponse = {
  key: string,
  header: string,
  body: ?string,
  icon: string,
  textColor: string,
  note: ?string
}

export type TransferTravelFundsFormData = {
  additionalReceipt?: string,
  firstName: string,
  lastName: string,
  personalMessage?: string,
  rapidRewardsNumber: string,
  recipientEmailAddress: string
}

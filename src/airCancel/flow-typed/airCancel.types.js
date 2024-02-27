// @flow
import type { BoundSelection } from 'src/shared/flow-typed/boundSelect.types';
import type {
  BriefBoundType,
  CurrencyType,
  LinkRequestType,
  MessageType
} from 'src/shared/flow-typed/shared.types';

export type RefundCancelLinkType = LinkRequestType & {
  body: {
    cancelToken: string,
    passengerSearchToken: string,
    productIds?: Array<string>
  }
}

export type CancelRefundQuotePageType = {
  _analytics: *,
  _links: {
    cancelPolicies: Link,
    cancel: RefundCancelLinkType,
    refundQuote: CancelBoundRefundQuoteRequestType
  },
  cancelBoardingPassMessage: ?MessageType,
  cancelBounds: Array<BriefBoundType>,
  guestPasses: ?GuestPassType,
  headerMessage: MessageType,
  nonRefundableFunds: ?CurrencyType,
  passengers: Array<PassengerRecordType>,
  pointsToCreditAccount: ?string,
  pointsToCreditTotal: ?CurrencyType,
  receiptEmail: string,
  recordLocator: string,
  recordLocatorLabel: string,
  refundableFunds: ?CurrencyType,
  refundRequested?: ?boolean,
  requireEmailReceipt: boolean,
  showRefundableSelection: boolean,
  tripTotals: ?Array<CurrencyType>,
}

export type CancelBoundConfirmationPageType = {
  _analytics: *,
  _links: {
    checkIn: ?Link,
    checkTravelFunds: ?CheckTravelFundsLinkType
  },
  allowBookAnotherFlight: boolean,
  cancelledBounds: Array<BriefBoundType>,
  expirationDateString?: string,
  guestPasses: ?GuestPassType,
  headerMessage: MessageType,
  messages: ?Array<MessageType>,
  nonRefundableExpirationDate: ?string,
  nonRefundableFunds: ?CurrencyLabelType,
  passengers: Array<PassengerRecordType>,
  pointsToCreditAccount: ?string,
  pointsToCreditTotal: ?CurrencyLabelType,
  receiptEmail: ?string,
  recordLocator: string,
  recordLocatorLabel: string,
  refundableFunds: ?CurrencyLabelType,
  refundMessage: ?string,
  remainingBounds: ?Array<BriefBoundType>,
}

export type CancelSummaryPageType = {
  messages: ?Array<MessageType>,
  recordLocator: string,
  requireEmailReceipt: boolean,
  receiptEmail: ?string,
  passengers: Array<PassengerRecordType>,
  associatedReservations: ?string,
  bounds: Array<BriefBoundType>,
  tripTotals: ?Array<CurrencyType>,
  pointsToCreditTotal: ?CurrencyType,
  pointsToCreditAccount: ?CurrencyType,
  refundableFunds: ?CurrencyLabelType,
  nonRefundableFunds: ?CurrencyLabelType,
  viewForCancelAnalytics: *,
  isSwabiz: boolean,
  _links: {
    cancelPolicies: Link,
    cancel: Link
  }
};

export type RefundQuoteLinkType = LinkRequestType & {
  body: {
    cancelToken: string,
    passengerSearchToken: string,
    productIds?: Array<string>,
    refundRequested?: ?boolean
  }
}

export type BoundSelectionNoticeType = {
  message: string,
  title: string
}

export type CancelBoundPageType = {
  _links: {
    refundQuote: RefundQuoteLinkType
  },
  _meta: {
    showBoundSelection: boolean
  },
  boundSelectionNotice: BoundSelectionNoticeType,
  boundSelections: ?Array<BoundSelection>,
  cancelMessage?: string,
  messages: ?Array<MessageType>,
  recordLocator: string,
  splitPnrDetails?: string
};

export type SelectedBounds = {
  outbound: boolean,
  inbound: boolean
}

export type CancelBoundRefundQuoteBodyRequestType = {
  cancelToken: string,
  passengerSearchToken: string,
  refundRequested: ?boolean,
  productIds?: Array<string>
}

export type CancelBoundRefundQuoteRequestType = LinkRequestType & {
  body: CancelBoundRefundQuoteBodyRequestType
}

export type CancelBoundConfirmationBodyRequestType = {
  cancelToken: string,
  passengerSearchToken: string,
  productIds?: Array<string>,
  refundRequested?: boolean,
  receiptEmail?: string
}

export type CancelBoundConfirmationRequestType = LinkRequestType & {
  body: CancelBoundConfirmationBodyRequestType
}

export type CheckTravelFundsLinkType = LinkRequestType & {
  body: {
    pnrToken: string
  }
}

export type PassengerRecordType = {
  name: string,
  accountNumber?: string
};

export type CurrencyLabelType = CurrencyType & {
  item: string,
  itemTotalLabel?: ?string,
  itemSubText?: ?string,
};

export type GuestPassType = {
  amount: ?string,
  currencyCode: ?string,
  currencySymbol: ?string,
  item: string,
  itemSubText: ?string
};

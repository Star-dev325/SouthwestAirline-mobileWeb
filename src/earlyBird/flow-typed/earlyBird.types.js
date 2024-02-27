// @flow

import type {
  BillingInformation,
  BriefBoundType,
  CurrencyType,
  ConfirmationDates,
  BoundDescriptionType,
  FlightBasicBound,
  ApplePayCard
} from 'src/shared/flow-typed/shared.types';
import type { PayPalPaymentType } from 'src/airBooking/flow-typed/airBooking.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

export type EarlyBirdPassengerType = {
  name: string,
  accountNumber?: string,
  canPurchaseEarlyBird: boolean,
  decisionDescription?: 'Purchased' | 'A-List'
}

export type EarlyBirdBoundType = {
  arrivalAirportCode: string,
  arrivalTime: string,
  boundType: BoundDescriptionType,
  departureAirportCode: string,
  departureDate: string,
  departureTime: string,
  earlyBirdBoundPrice: CurrencyType,
  flight: string,
  isNextDayArrival: boolean,
  isOvernight: boolean,
  passengers: Array<EarlyBirdPassengerType>
};

export type EarlyBirdBoundDetailsType = {
  boundType: BoundDescriptionType,
  boundBrief: BriefBoundType,
  passengers: Array<EarlyBirdPassengerType>
}

export type EarlyBirdPriceSubTotalType = {
  departureAirportCode: string,
  arrivalAirportCode: string,
  earlyBirdBoundPrice: CurrencyType,
  flight: string,
  selectedPaxCount: number,
  totalBoundPrice: CurrencyType
}

export type EarlyBirdBannerType = {
  image: ?string,
  alt: ?string
};

type earlyBirdPurchaseBoundsType = {
  bound: FlightBasicBound & {
    earlyBirdBoundPrice: CurrencyType,
    earlyBirdSubTotalPrice: CurrencyType,
    passengers: Array<{ name: string }>
  }
}

export type EarlyBirdConfirmationPageType = {
  recordLocator: string,
  earlyBirdPurchaseBounds: Array<earlyBirdPurchaseBoundsType>,
  earlyBirdTotalPrice: CurrencyType,
  billingInfo: BillingInformation,
  earlyBirdAnalytics: *
}

export type EarlyBirdPriceResponseType = {
  earlyBirdBounds: Array<EarlyBirdBoundType>,
  recordLocator: string,
  receiptEmail: ?string,
  destinationDescription: string,
  dates: ConfirmationDates,
  earlyBirdAnalytics: *,
  _links: { earlyBirdConfirmationPage: Link }
}

export type ViewEarlyBirdReservationPageResponseType = {
  recordLocator: string,
  receiptEmail: ?string,
  destinationDescription: string,
  earlyBirdBounds: Array<EarlyBirdBoundType>,
  dates: ConfirmationDates
}

export type EarlyBirdPurchaseInfoType = {
  productIds: Array<string>,
  moneyTotalFare: CurrencyType,
  shouldSaveAsPrimaryCard?: boolean
};

export type EarlyBirdPurchaseType = {
  formData: FormData,
  earlyBirdPurchaseInfo: EarlyBirdPurchaseInfoType,
  earlyBirdConfirmationPageLink: Link,
  payPal?: PayPalPaymentType,
  isLoggedIn: boolean,
  applePayCard?: ?ApplePayCard
};

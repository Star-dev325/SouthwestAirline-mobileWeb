// @flow
import type {
  ConfirmationDates,
  CurrencyType,
  ApplePayCard,
  ViewBoardingPass
} from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type { PayPalPaymentType } from 'src/airBooking/flow-typed/airBooking.types';

export type UpgradedBoardingPurchasePageType = {
  _links: {
    upgradedBoardingConfirmationPage: Link,
    upgradedBoardingCancel: Link
  },
  dates: ?ConfirmationDates,
  destinationDescription: string,
  originationDestinationDescription: string,
  recordLocator: string,
  upgradedBoardingExpiredMessage: UpgradedBoardingExpiredMessageType,
  upgradedBoardingExpiredSeconds: number,
  upgradedBoardingSegment: Array<UpgradedBoardingSegment>,
  upgradedBoardingInformationalMessage: ?string,
  fareRulesWithLinks: ?string
};

export type UpgradedBoardingSegment = {
  flight: string,
  departureDate: string,
  departureTime: string,
  departureAirportCode: string,
  arrivalTime: string,
  arrivalAirportCode: string,
  departureDayOfWeek: string,
  isOvernight?: boolean,
  isNextDayArrival?: boolean,
  upgradedBoardingSegmentMessage: string,
  upgradedBoardingPrice: CurrencyType,
  passengers: Array<UpgradedBoardingPassenger>
};

export type UpgradedBoardingPassenger = {
  name: string,
  accountNumber: ?string,
  _meta: {
    productId: string
  }
};

export type UpgradedBoardingPurchaseType = {
  formData: FormData,
  upgradedBoardingConfirmationPageLink: Link,
  moneyTotal: CurrencyType,
  payPal?: PayPalPaymentType,
  applePayCard?: ?ApplePayCard
};

export type UpgradedBoardingTitleType = {
  body: string,
  icon: string,
  key: string,
  textColor?: string
};

export type UpgradedBoardingPassengerType = {
  name?: string,
  boardingGroup?: string,
  boardingPosition?: string
};

export type UpgradedBoardingRecordsType = {
  boundIndex: number,
  departureTime: string,
  flightNumber: string,
  gate: ?string,
  passengers: Array<UpgradedBoardingPassengerType>,
  segmentsType?: string,
}

export type UpgradedBoardingConfirmationPageResponseType = {
  recordLocator: string,
  title: UpgradedBoardingTitleType,
  upgradedBoardingRecords: Array<UpgradedBoardingRecordsType>,
  _links: {
    checkInSessionToken: string,
    viewBoardingDetails?: ViewBoardingPass
  }
};

export type UpgradedBoardingExpiredMessageType = {
  body: string,
  header: string,
  icon: string,
  key: string,
  labelText: string,
  textColor: string
}
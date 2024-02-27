// @flow
import type {
  CurrencyType,
  MessageType,
  ConfirmationDates
} from 'src/shared/flow-typed/shared.types';

export type UpgradeFareType = {
  upgradePrice?: CurrencyType,
  upgradeTotalPrice?: CurrencyType,
  upgradeMessage: {
    header: string,
    body?: string,
    icon?: string
  },
  _meta: {
    productId: string,
    canUpgrade: boolean
  }
}

export type UpgradeSearchRequestType ={
  from: string,
  to: string,
  boundType: string
};

export type UpgradeBoundType = {
  boundType: string,
  flight: string,
  departureDate: string,
  departureDayOfWeek: string,
  departureTime: string,
  departureAirportCode: string,
  arrivalTime: string,
  arrivalAirportCode: string,
  numberOfPassengers: number,
  upgradeFare: UpgradeFareType,
  isNextDayArrival: boolean
}

export type BaseUpgradeReservationPageType = {
  recordLocator: string,
  upgradeToFareFamily?: string,
  dates: ConfirmationDates,
  originationDestinationDescription: string,
  boundSelectionMessage: string,
  fareRulesMessageWithLinks: string,
  destinationDescription: string
}

export type ViewUpgradeReservationPageType = BaseUpgradeReservationPageType & {
  boundSelectionDataList: Array<BoundSelectionDataType>,
  pricingDataList: Array<PricingDataType>,
  promoCodeMessage?: MessageType,
  checkedInNotice?: CheckedInNoticeType,
  _links: { changePricingPage: Link }
}

export type CheckedInNoticeType = {
  title: string,
  message: string
}

export type BoundSelectionDataType = {
  arrivalAirportCode: string,
  arrivalTime: string,
  boundType: string,
  canUpgrade: boolean,
  departureAirportCode: string,
  departureDate: string,
  departureDayOfWeek: string,
  departureTime: string,
  isNextDayArrival?: boolean,
  isOvernight?: boolean,
  productId: string,
  upgradeMessageBody?: string,
  upgradeMessageHeader: string
}

export type PricingDataType = {
  canUpgrade: boolean,
  productId: string,
  flight: string,
  boundType: string,
  upgradePrice: CurrencyType,
  upgradeTotalPrice: CurrencyType,
  numberOfPassengers: number,
  departureAirportCode: string,
  arrivalAirportCode: string,
  isSelected: boolean
};

// @flow

import type { GreyBoxMessage } from 'src/shared/flow-typed/shared.types';

export type SavedFlightsPageType = {
  numberOfSavedFlights: number,
  savedFlights: Array<SavedFlightType>
}

export type SavedFlightType = {
  dates: {
    first: string,
    second: ?string
  },
  originDescription: string,
  destinationDescription: string,
  passengers: {
    adults: number
  },
  checkPriceMessage?: string,
  _links: Link,
  _v1_infoNeededToCheckPrice: {
    currencyType: string,
    destination: string,
    destinationDepartureDate: string,
    numberAdults: string,
    origin: string,
    originDepartureDate: string,
    promoCode: ?string,
    type: string
  }
}

export type PastFlightsPageType = {
  numberOfPastFlights: number,
  pastFlights: Array<PastFlightType>
}

export type PastFlightType = {
  dates: {
    first: string,
    second: ?string
  },
  originDescription: string,
  destinationDescription: string,
  confirmationNumber: string,
  isRebookable: boolean,
  _infoNeededToRebook: {
    type: string,
    origin: string,
    destination: string
  }
}

export type PromoCodesPageType =  Array<PromoCodesType>

export type PromoCodesType = {
  promoCode: string,
  promotion: string,
  promoType: string,
  description: string,
  termsAndConditions: string,
  expirationDateString: string,
  used: boolean,
  expired: boolean
}

export type TransformedSearchRequestType = {
  tripType: string,
  isRoundTrip: boolean,
  origin: string,
  destination: string,
  departureDate: string,
  returnDate: string
}

export type RREnrollRequestDataType = {optInForEmailSubscriptions?: boolean}

export type RapidRewardsSnapshotPageType = {
  fullName: string,
  rapidRewardsNumber: string,
  ptsGroup: {
    label: string,
    spendablePoints: string,
    showViewBenefitsLink: boolean
  },
  tier: {
    showCongratulations: boolean,
    title: AccountProgressTitleType,
    pointsDonutProgressBar: PointsProgressType,
    flightsDonutProgressBar: FlightsProgressType
  },
  companionPass: {
    showCongratulations: boolean,
    title: AccountProgressTitleType,
    shouldCallToAddOrChangeCompanion: boolean,
    pointsDonutProgressBar: PointsProgressType,
    flightsDonutProgressBar: FlightsProgressType
  }
}

export type AccountProgressTitleType = {
  preString: string,
  status: string,
  sufString: string
}

export type PointsProgressType = {
  percentageComplete: number,
  pointsRequired: string,
  pointsEarned: string
}

export type FlightsProgressType = {
  percentageComplete: number,
  flightsRequired: string,
  flightsFlown: string
}

export type ExclusivePromotionPageType = {
  numberOfEligiblePromotions: number,
  eligiblePromotions: Array<ExclusivePromotionType>,
  numberOfRegisteredPromotions: number,
  registeredPromotions: Array<ExclusivePromotionType>
}

export type ExclusivePromotionType = {
  title: string,
  subtitle?: string,
  promotionId: string,
  isRegistered: boolean,
  _links: {
    view: Link,
    register: ?Link
  }
}

export type ExclusivePromotionDetailsResponseType = {
  isRegistered: boolean,
  promotionId: string,
  _links: Link
}

export type ExclusivePromotionDetailsPageType = ExclusivePromotionDetailsResponseType & {
  sections: Array<ExclusivePromotionSection>
}

export type ExclusivePromotionSection = {
  name: string,
  content: string
}

export type UnusedFundsContentType = Array<{
  textContent: string,
  type: string,
  props: {
    linkType?: string,
    target?: string,
    id: 'main-body' | 'view-funds-btn' | 'learn-more-btn'
  }
}>

export type PromoCodesContentType = Array<{
  textContent: string,
  type: string,
  props: {
    linkType?: string,
    target?: string,
    id: 'main-body' | 'sub-text' | 'learn-more-btn'
  }
}>

export type PromotionDetailViewLinkType = Link & {
  promotionId: string
}

type AircraftInfo = {
  aircraftType?: string
};

export type Segment = {
  aircraftInfo: AircraftInfo,
  arrivalAirportDisplayName: string,
  arrivalTime: string,
  bannerText: ?string,
  bannerType: ?string,
  boardingGroup: ?string,
  boardingPosition: ?string,
  boardingTime: string,
  checkInIneligibilityReason: ?string,
  departureAirportDisplayName: string,
  departureDate: string,
  departureTime: string,
  destinationDescription: string,
  flightNumber: string,
  flightStatus: *,
  greyBoxMessage: ?GreyBoxMessage,
  informationalMessaging: ?string,
  informationalMessagingType: ?string,
  isCheckedIn: boolean,
  isCheckInEligible: boolean,
  isEBEligible: boolean,
  isNonRevPnr: boolean,
  isOvernight: boolean,
  showOptionsAndNextSteps: boolean,
  standbyFlight: *,
  viewStandbyList: ?Link
};

export type OptionsAndNextSteps = {
  href: ?string,
  labelText: string,
  url: string
}

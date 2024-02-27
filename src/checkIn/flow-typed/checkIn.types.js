// @flow

import type {
  BoardingPassStyleObjectType,
  GreyBoxMessage,
  LinkRequestType,
  PassportFormData,
  SpecialAssistanceMessageType
} from 'src/shared/flow-typed/shared.types';

export type ViewUpgradedBoardingType = {
  labelText?: string,
  method?: string,
  href?: string,
  body?: {
    passengerSearchToken?: string
  }
};

export type CheckinPassengerType = {
  name?: string,
  confirmationNumber?: string,
  boardingPosition?: string,
  boardingGroup?: string,
  hasPrecheck?: boolean,
  isCompanion?: boolean,
  isInfant: boolean,
  mobileBoardingPassEligible?: boolean,
  mobileBoardingPassIneligibilityErrorCode?: string,
  passengerLabelText: string,
  specialAssistanceMessage?: SpecialAssistanceMessageType,
  greyBoxMessage?: GreyBoxMessage,
  travelerID?: string,
  travelerSegmentIdentifier?: string,
  _links?: {
    viewPassengerBoardingPass?: ?Link,
    viewUpgradedBoarding?: ViewUpgradedBoardingType
  }
};

export type CheckinFlightType = {
  aircraftInfo?: {
    aircraftType?: string
  },
  departureTime?: string,
  flightNumber: string,
  gate?: string,
  isNextDay?: boolean,
  isOvernight?: boolean,
  passengers: Array<CheckinPassengerType>,
  travelTime?: string
};

export type FlightInfoType = {
  aircraftInfo?: {
    aircraftType?: string
  },
  departureTime?: string,
  flightNumber: string,
  gate?: string,
  isNextDay?: boolean,
  isOvernight?: boolean
};

export type FlightInfoTitleType = 'DEPARTING' | 'CHANGE PLANES' | 'RETURNING';

export type CheckInViewResDetailRequestType = {
  recordLocator: string,
  firstName: string,
  lastName: string
};

export type CheckInPassengerRequestType = LinkRequestType & {
  body: {
    firstName: string,
    lastName: string,
    recordLocator: string
  },
  isLoggedIn: boolean
};

export type CheckInRequestType = {
  body: {
    firstName: string,
    lastName: string,
    recordLocator: string
  }
};

export type NextPageOptionType = { nextPagePath: string, nextPaxNumber?: string };

export type TravelDocumentsRequestLink = Link & {
  body: {
    recordLocator: string,
    travelerIdentifier: string,
    firstName: string,
    lastName: string,
    fullName: string,
    accountNumber?: string
  }
};

export type TravelDocumentActionParametersType = {
  paxNumber: number,
  requestData: TravelDocumentsRequestLink,
  formData: PassportFormData,
  checkInSessionToken: string,
  shouldShowSaveEmergencyContactForAll: boolean,
  transitToNextPax: (*) => void,
  showSessionExpiredPopup: (*) => void,
  suppressEmergencyContact?: boolean
};

export type CheckInAPISDestinationFormType = {} | {
  isoCountryCode: string,
  zipOrPostalCode: string,
  addressLine: string,
  city: string,
  stateProvinceRegion: string
};

export type MobileBoardingPassViewType = {
  associatedPaxLabel?: string,
  associatedPaxName?: string,
  adaptiveLink?: string,
  airportLanesText?: string,
  barcodeString?: string,
  boardingGroup: string,
  boardingPassSSRs?: string,
  boardingPosition: string,
  boardingTime: string,
  boardingTimeString: string,
  confirmationNumber: string,
  departureDate: string,
  departureGate?: string,
  departureTime: string,
  departureTimeString: string,
  destinationAirportCode: string,
  destinationAirportDescription?: string,
  documentType: string,
  drinkCouponText?: string,
  earlyBirdText?: string,
  eligibleForDrinkCoupon: boolean,
  fareType: string,
  familyBoardingText: string,
  flightNumber: string,
  hasAList?: boolean,
  hasAListPreferred?: boolean,
  hasExtraSeat: boolean,
  hasTsaPreCheck: boolean,
  isInfant: boolean,
  isYoungTraveler: boolean,
  numberOfDrinkCouponsHeader: string,
  numberOfDrinkCouponsText: string,
  originAirportCode: string,
  originAirportDescription?: string,
  passenger: {
    name: {
      firstName: string,
      lastName: string,
      middleName?: string
    },
    accountNumber?: string,
    tier?: string,
    travelerId: string
  },
  priorityBoardingText?: string,
  showAirportLanes?: boolean,
  style: BoardingPassStyleObjectType,
  travelerSegmentIdentifier: string,
};

export type ConfirmationPageFlightsType = {
  boundIndex: number,
  departureTime: string,
  destinationAirportCode: string,
  flightNumber: string,
  gate: ?string,
  hasWifi: boolean,
  originAirportCode: string,
  passengers: Array<CheckinPassengerType>,
  segmentsType: string,
  travelTime: string
}

export type HazmatDeclarationType = {
  flightDate: string,
  travelerId: string,
  travelerSegmentIdentifier: string
};

export type FlightDepartureDateAndAirportType = {
  departureDate: string,
  originAirportCode: string
}

export type PrefillPassengerAPISDocumentType= {
  travelerIdentifier: string,
  firstName: string,
  lastName: string,
  passport: {
    lastFourPassportNumber: string,
    passportIssuedBy: string,
    nationality: string,
    passportExpirationDate: string,
    countryOfResidence: string
  },
  emergencyContact: {
    doNotWishToProvideAnEmergencyContact: boolean,
    name: string,
    contactPhone: {
      countryCode: string,
      number: string
    }
  },
  permanentResidentCard: {
    type: string,
    number: string,
    issuedBy: string,
    expiration: string
  },
  visa: {
    number: string,
    country: string,
    issuedBy: string,
    expiration: string
  },
  destination: {
    streetAddress: string,
    zipOrPostalCode: string,
    city: string,
    stateProvinceRegion: string,
    country: string,
    contactEmail: string,
    contactPhone1: {
      countryCode: string,
      number: string
    },
    contactPhone2: {
      countryCode: string,
      number: string
    }
  },
  suppressEmergencyContact: boolean,
  passengerLabel: string
}

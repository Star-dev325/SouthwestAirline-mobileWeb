// @flow
import type { AccountCompanionName } from 'src/companion/flow-typed/companion.types';
import type { 
  ConfirmationDates,
  CurrencyType,
  FlightBasicBound,
  GreyBoxMessage,
  MessageType,
  PassengerName,
  SpecialAssistanceType
} from 'src/shared/flow-typed/shared.types';

export type FlightReservationType = {
  _analytics: *,
  _links: { upgradeMyFlight: Link},
  bounds: Array<FlightBasicBound>,
  checkInIneligibilityReason: ?string,
  companion: ?{confirmationNumber: string},
  confirmationNumber: string,
  date?: string,
  dates?: ConfirmationDates,
  dayOfTravelContactInfo: ?string,
  destinationAirport: ViewResAirportType,
  destinationDescription: string,
  greyBoxMessage: ?GreyBoxMessage,
  greyBoxPassengerMessage: ?GreyBoxMessage,
  hasAnyCancelledFlights: boolean,
  hasUnaccompaniedMinor: boolean,
  isCheckedIn: boolean,
  isCheckInEligible: boolean,
  isDynamicWaiver: boolean,
  isInternational: boolean,
  isNonRevPnr: boolean,
  isSwabiz: boolean,
  messages: ?Array<MessageType>,
  originAirport: ViewResAirportType,
  pageHeader: string,
  passengers: Array<ViewResPassengerType>,
  shareDetails: ?ViewResShareDetailsType,
  shouldShowAddEarlyBirdButton: boolean,
  viewReservationAnalytics: ViewResAnalyticsType
}

export type ViewResAirportType = {
  code: string,
  country: ?string,
  name: string,
  state: string
}

export type ViewResPassengerType = {
  accountNumber: string,
  checkInIneligibilityReason: ?string,
  hasAnyEarlyBird: boolean,
  hasCompletePassportInfo: boolean,
  isCheckedIn: boolean,
  isCheckInEligible: boolean,
  isUnaccompaniedMinor: boolean,
  name: string,
  passengerReference: string
}

export type ViewResShareDetailsType = {
  confirmationInfo: string,
  flightInfo: Array<ViewResShareDetailsFlightInfoType>,
  passengerInfo: string,
  subject: string
}

export type ViewResShareDetailsFlightInfoType = {
  arrivalDateTime: string,
  arrivalInfo: string,
  departureDateTime: string,
  departureInfo: string,
  flightInfo: string,
  header: string,
  stops: Array<string>,
  title: string,
  travelTime: string
}

export type ViewResAnalyticsType = {
  gdsTicketType: string,
  isInternational: boolean,
  isSwabiz: boolean,
  recordLocator: string
}

export type PassportInformationType = {
  countryOfResidence: string,
  lastFourPassportNumber: string,
  nationality: string,
  passportExpirationDate: string,
  passportIssuedBy: string
}

export type EmergencyContactType = {
  contactPhone: {countryCode: string, number: string},
  name: string
}

export type EditPNRPassengerDetailsType = {
  dateOfBirth: string,
  gender: string,
  name: {
    firstName: string,
    lastName: string,
    middleName: ?string,
    suffix: ?string
  }
};

export type EditPNRPassengerPageType = {
  _links: Link,
  _meta: {
    isEditablePassengerFirstMiddleName: boolean,
    isEditablePassengerLastName: boolean
  },
  accountNumber: ?string,
  disableSpecialAssistance: boolean,
  editNamesCheckedInMessage: ?MessageType,
  editNamesMessage: ?MessageType,
  emergencyContact: ?EmergencyContactType,
  isInternational: boolean,
  knownTravelerId: ?string,
  nonChargeableAncillaryProducts: ?NonChargeableAncillaryProductsType,
  passengerDetails: EditPNRPassengerDetailsType,
  passportInformation: ?PassportInformationType,
  redressNumber: ?string
}

export type NonChargeableAncillaryProductsType = Array<{
  ancillaryType: string,
  details?: Array<string>
}>

export type RetrieveReservationRequestType = {
  'firstName': string,
  'lastName': string,
  'pickupDate': string
}

export type CarRetrieveReservationRequestType = {
  searchToken: string
}

export type CarSearchRequestType = {
  dropOff: string,
  dropOffDateTime: string,
  isRoundTrip: true,
  pickUp: string,
  pickUpDateTime: string
}

export type CarRetrieveRequestType = {
  confirmationNumber: string,
  firstName: string,
  lastName: string,
  pickupDate: string
}

export type FlightRetrieveInfoRequestType = FlightRetrieveRequestType & FlightRetrieveAdditionalRequestType

export type FlightRetrieveInfoWithSearchTokenRequestType = { recordLocator?: string } & FlightRetrieveAdditionalRequestType

export type FlightRetrieveAdditionalRequestType = {
  companionInfo?: {
    companionFullName?: string,
    companionName?: AccountCompanionName
  },
  dispatchPageLoadComplete?: {
    action: string,
    location: HistoryLocation
  },
  hasEditedName?: boolean,
  isLoggedIn?: boolean,
  passengerSearchToken?: string
}

export type FlightRetrieveRequestType = {
  firstName: string,
  lastName: string,
  recordLocator: string
}

export type UpdateContactInfoType = {
  contactInformation: {
    contactEmail: ?{
      email: string,
      preferredLanguage?: ?string
    },
    contactInfoToken: string,
    contactPhone: ?{
      countryCode: string,
      number: string,
      preferredLanguage?: ?string
    },
    contactTextMessagePhone: ?{
      countryCode: string,
      number: string,
      preferredLanguage?: ?string
    },
    internationalDeclineNotifications: boolean,
    passengerSearchToken: string
  }
}

export type ManageCarReservationDetailsType = {
  confirmationNumber: string,
  driver: {
    firstName: string,
    lastName: string
  },
  isCancelled: boolean
}

export type CarReservationItineraryType = {
  dropOffAirport: {
    airportCode: string,
    airportName: string,
    cityName: string,
    cityState: string
  },
  dropOffDate: string,
  dropOffTime: string,
  pickUpAirport: {
    airportCode: string,
    airportName: string,
    cityName: string,
    cityState: string
  },
  pickUpDate: string,
  pickUpTime: string,
  vendorImage?: string
}

export type CarReservationDetailType = {
  baseRate: number | CurrencyType,
  carType: string,
  dailyRate: {
    cents?: number,
    perQuantity: string,
    price?: CurrencyType
  },
  dailyRateWithCurrencyCode?: CurrencyType,
  mileage: MileageType,
  promoCodeApplied: boolean,
  rentalDeskLocation: string,
  rrIncentiveText?: string,
  selectedCarExtras?: Array<*>,
  showTotalPrice?: boolean,
  taxes?: Array<CarTaxType>,
  taxesWithCurrencyCode?: Array<CarTaxWithCurrencyCodeType>,
  totalPrice?: number | CurrencyType,
  totalWithCurrencyCode?: CurrencyType,
  totalWithTaxesAndCurrencyCode?: CurrencyType,
  vendorImage: string
}

export type CarTaxType = {
  cents: number,
  type: string
}

export type CarTaxWithCurrencyCodeType = {
  taxWithCurrencyCode: CurrencyType,
  type: string
}

export type MileageType = {
  amount?: CurrencyType,
  cents?: string | number,
  freeMileage: string,
  per: string
}

export type CarReservationType = {
  carReservationDetail: CarReservationDetailType,
  carReservationItinerary: CarReservationItineraryType,
  manageCarReservationDetails: ManageCarReservationDetailsType
}

export type TravelInformationFormData = {
  countryOfResidence?: string,
  dateOfBirth: ?string,
  disableSpecialAssistance?: boolean,
  doNotWishToProvideAnEmergencyContact?: string,
  emergencyContactCountryCode?: string,
  emergencyContactCountryDialingCode?: string,
  emergencyContactName?: string,
  emergencyContactPhoneNumber?: string,
  emergencyContactSaveForAllPassengers?: string,
  firstName: ?string,
  gender: ?string,
  knownTravelerNumber: ?string,
  lastName: ?string,
  middleName: ?string,
  nationality?: string,
  passportExpirationDate?: string,
  passportIssuedBy?: string,
  passportNumber?: string,
  rapidRewardsNumber: ?string,
  redressNumber: ?string,
  specialAssistance?: SpecialAssistanceType,
  suffix: ?string
}

export type ReservationContactInformation = {
  _links: Link,
  contactEmail: ?{
    email: string,
    preferredLanguage: ?string
  },
  contactInformationAnalytics?: {
    gdsTicketType: ?string,
    isInternational: boolean,
    isSwabiz: ?boolean,
    recordLocator: string
  },
  contactPhone: ?{
    countryCode: string,
    number: string,
    preferredLanguage: ?string
  },
  contactTextMessagePhone: ?{
    countryCode: string,
    number: string,
    preferredLanguage: ?string
  },
  internationalDeclineNotifications: ?boolean,
  isInternational: boolean,
  messages: ?Array<MessageType>,
  primaryContactMethod: ?string
}

export type PnrPassengerFullNameType = {
  firstName: string,
  lastName: string,
  middleName: ?string,
  recordLocator: string
}

export type SaveTravelInformationParamType = {
  editNamesSuccessfulUpdateMessage: ?string,
  pnr: PnrPassengerFullNameType,
  updateTravelInformationLink: Link,
  searchToken: ?string
};

type PassengerNameEditStateType = {
  hasEditedName: ?boolean,
  passengerSearchToken: ?string
};

export type LocationStateType = PassengerName & PassengerNameEditStateType;

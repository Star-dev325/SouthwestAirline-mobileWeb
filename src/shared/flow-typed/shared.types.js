// @flow

import { FLIGHT, CAR, HOTEL } from 'src/myAccount/constants/upcomingTripType';
import { LOGIN_TYPES } from 'src/shared/constants/webViewConstants';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';
import type { Node } from 'react';
import type { RetrievedFundType } from 'src/travelFunds/flow-typed/travelFunds.types';
import type { StandbyFlightProps } from 'src/standby/components/standbyCard';

const { NORMAL, POINTS, PURCHASE, TRANSFER_TRAVEL_FUNDS } = LOGIN_TYPES;

export type Footnote = {
  link: ?string,
  label: ?string,
  prefix: ?string
};

export type AirportGroupData = string[];

export type MultiSelectGroup = {
  origin?: AirportGroupData,
  destination?: AirportGroupData,
  isSelected: boolean,
  unavailableGroup?: Array<{
    origin: string,
    destination: string
  }>
};

export type FormattedProductDetails = {
  icon: ?string,
  prefix: ?string,
  link: ?string,
  label: ?string,
  suffix: ?string
};

export type StylizedLabel = Array<{
  label: string,
  font?: string,
  primaryLabelColor?: string
}>;

export type ProductDefinition = {
  productId: string,
  id: string,
  label: string,
  stylizedLabel?: StylizedLabel,
  primaryThemeColor?: string,
  primaryThemeHexColor?: string,
  inverseThemeColor?: string,
  inverseThemeHexColor?: string,
  rowOrder: number,
  features: ?Array<FormattedProductDetails>
}

export type ProductDefinitions = {
  products: ?Array<ProductDefinition>,
  highlightedFeatures: ?Array<FormattedProductDetails>,
  disclaimers: ?Array<Footnote>
};

export type FareProduct = {
  _meta: {
    productId?: string,
    fareProductId?: string,
    fareType?: string
  },
  discountedPrice?: ?CurrencyType,
  discountedPricePointTax?: ?CurrencyType,
  earnPoints?: ?string,
  fareDescription?: string,
  hasLowestFare?: boolean,
  limitedSeats?: ?string,
  price?: ?CurrencyType,
  priceDifference: ?CurrencyType,
  priceDiffPointsTax: ?CurrencyType,
  pricePointTax?: ?CurrencyType,
  reasonIfUnavailable?: ?string
}

export type NavItemLinkType = {
  href?: string,
  link?: string,
  className?: string,
  children?: Node,
  disabled?: boolean,
  name?: string,
  icon?: string,
  iconClassName?: string
}

export type IrnInfoType = {
  irnRequired: boolean,
  alternateIrnAllowed: boolean,
  preselectedInternalReferenceNumber?: IrnType,
  companyInternalReferenceNumbers?: Array<IrnType>,
  travelerInternalReferenceNumbers?: Array<IrnType>
};

export type IrnType = {
  name: string,
  description?: string
}

export type FlightBoundCard = {
  _links: {
    shopping: {
      body: {
        currency: string,
        'departure-date': string,
        'destination-airport': string,
        'number-adult-passengers': string,
        'origination-airport': string,
        'return-date': string,
      },
      href: string,
      method: string
    }
  },
  originAirport: string,
  destinationAirport: string
}

export type FlightProductCard = {
  _meta: {
    cardId: string,
    durationMinutes: ?number,
    numberOfStops: ?number,
    startingFromAmount: ?number,
    departureTime: string,
    productId?: ?string,
    fareProductId?: ?string,
    standbyProductId?: ?string,
  },
  _links: _Links,
  arrivalTime: string,
  changeUnavailableText?: ?string,
  departureTime: string,
  discountedStartingFromPrice?: ?CurrencyType,
  discountedStartingFromPriceTax?: ?CurrencyType,
  duration: string,
  dynamicWaiverAvailabilityText?: ?string,
  expand?: boolean,
  fares: ?Array<FareProduct>,
  flightNumbers: string,
  hasLowestFare?: ?boolean,
  isNextDayArrival: boolean,
  isOvernight?: boolean,
  labelText?: string,
  reasonIfUnavailable?: ?string,
  shortStopDescription?: ?string,
  standbyAmount?: ?FlightProductCurrencyType,
  standbyLabelSubText?: ?string,
  standbyLabelText?: ?string,
  standbyUnavailableText?: ?string,
  startingFromPrice?: ?CurrencyType,
  startingFromPriceDifference?: ?FlightProductCurrencyType,
  startingFromPriceDiffPointsTax?: ?FlightProductCurrencyType,
  startingFromPricePointTax?: ?CurrencyType,
  stopCity?: ?string,
  stopDescription?: string,
  stopDescriptionOnSelect?: string
}

export type FlightProductCurrencyType = {
  amount: string,
  currencyCode: string,
  currencySymbol?: ?string,
  sign?: ?string
}  

export type FlightDetailsResponse = {
flightIdentifier1: {flightLegs: Array<FlightLegs>},
flightIdentifier2: {flightLegs: Array<FlightLegs>}
}

export type FlightLegs = {
changeDetailsLabelDescription: string,
standbyDetailsLabelDescription: string,
}

export type ExpandedDetails = {
  allFlightsFilteredOutText: string,
  allowSameDayChange: boolean,
  changeDescription: string,
  changeDetailsLabelText: string,
  changeLabel: string,
  disclaimerWithLinks: string,
  standbyDescription: string,
  standbyDetailsLabelText: string,
  standbyLabel: string,
  tierMessageWithLinks: string
}

type _Links = {
  sameDayFlightDetails: SameDayFlightDetailsRequest
}

export type SameDayFlightDetailsRequest = {
  href: string,
  method: HttpMethod,
  body: SameDayFlightDetailsBody
}

export type SameDayFlightDetailsBody = {
sameDayToken: string,
flightIdentifier: string
}

export type PassengerName = {
  firstName: string,
  lastName: string
};

export type PassengerNameRecord = PassengerName & {
  recordLocator: string
};

export type PassengerNameRecordToken = {
  firstName?: string,
  lastName?: string,
  recordLocator: string,
  passengerSearchToken?: string,
  nonPremiumSearch?: boolean
};

export type UpgradeFareReservationLinkType = {
  link: Link
};

export type UpgradeFareReservationDataType = PassengerNameRecordToken & UpgradeFareReservationLinkType;

export type CustomerInfoType = {
  name: {
    firstName: string,
    lastName: string,
    preferredName?: string
  },
  gender: string,
  birthDate: string,
  accountNumber: string
}

type CompanionPassInfoType = {
  companionPassAchieved: boolean,
  companionDeclared: boolean,
  companionQualifyingPoints: number,
  companionQualifyingFlights: number,
  companionQualifyingPointsRequired: string,
  companionQualifyingFlightsRequired: string,
  companionPassExpirationDate: ?string
}

export type Tier = 'NON_ELITE' | 'A_LIST' | 'A_LIST_PREFERRED';

export type RapidRewardsDetailsType = {
  redeemablePoints: number,
  chaseVisaRrEnrolled: boolean,
  tierInfo: RapidRewardsTierInfoType,
  companionPassInfo: CompanionPassInfoType,
  isEnrolledInRapidRewards: boolean
}

export type RapidRewardsTierInfoType = {
  tier: string,
  tierAchievedDate: string,
  tierQualifyingPoints: number,
  tierQualifyingFlights: number,
  nextTierTargeted: string,
  nextTierQualifyingPointsRequired: string,
  nextTierQualifyingFlightsRequired: string,
  tierEndDate: ?string
}

export type AccountInfoType = {
  companionFullName: string,
  customerInfo: CustomerInfoType,
  isTierStatusPending: boolean,
  rapidRewardsDetails: RapidRewardsDetailsType
}

export type CurrencySuit = 'Dollars' | 'Points' | 'PTS' | 'USD';

export type CurrencyType = {
  amount: string,
  currencyCode: string,
  currencySymbol?: ?string
};

export type CurrencyWithDescriptionType = CurrencyType & {
  description: string
};

export type BriefBoundType = {
  arrivalAirportCode: string,
  arrivalTime: string,
  departureAirportCode: string,
  departureDate: string,
  departureDayOfWeek: string,
  departureTime: string,
  isNextDayArrival?: boolean,
  isOvernight?: boolean,
  isOvernightUnderDeparture?: boolean,
  stops?: Array<stopsType> | null
};

export type stopsType = {
  airport: {
    code: string
  },
  isOvernight: boolean
}

export type DisplayAirport = {
  name: string,
  state: ?string,
  code: string,
  country: ?string
}

type Flight = {
  number: string,
  wifiOnBoard?: boolean,
  aircraftInfo?: {
    aircraftType?: string,
    wifiSupported?: boolean
  }
}

type PricingBoundPassenger = {
  type: string,
  count: number,
  fareType: string,
  bookingCode: ?string
}

// @FIXME
//  Need to update once CHAPI is finalized
export type BoundDescriptionType = 'DEPARTING' | 'Departing' | 'Departure' | 'RETURNING'  | 'Returning';

export type FareProductDetails = {
  label: ?string,
  fareRulesUrl: ?string
};

export type DisruptedBoundMessageType = {
  icon: string,
  label: string,
};

export type EarlyBirdPurchasedType = {
  icon: string,
  iconColor: string,
  label: string,
  passengerLabel?: string,
  passengersList?: Array<string>
};

export type FlightBasicBound = {
  _links?: {
    flightPricingUpsellSingleBound: Link
  },
  actualArrivalTime?: string,
  actualDepartureTime?: string,
  arrivalAirport: DisplayAirport,
  arrivalStatus?: string,
  arrivalStatusType?: string,
  arrivalTime: string,
  boundType: BoundDescriptionType,
  departureAirport: DisplayAirport,
  departureDate: string,
  departureStatus?: string,
  departureStatusType?: string,
  departureTime: string,
  disruptedBoundMessage?: DisruptedBoundMessageType,
  earlyBirdPurchased?: EarlyBirdPurchasedType,
  flights: Array<Flight>,
  isNextDayArrival: boolean,
  passengerCount?: string,
  passengerTypeCounts?: {
    adult: number
  },
  standbyFlight?: ?StandbyFlightProps,
  stops: ?Array<*>,
  travelTime: string,
  upsellBoundDetails?: {
    selectionText?: string
  }
}

export type FlightPricingBound =  {
  _links?: {
    flightPricingUpsellSingleBound?: Link
  },
  actualArrivalTime?: string,
  actualDepartureTime?: string,
  arrivalAirport: DisplayAirport,
  arrivalStatus?: string,
  arrivalStatusType?: string,
  arrivalTime: string,
  boundType: BoundDescriptionType,
  departureAirport: DisplayAirport,
  departureDate: string,
  departureStatus?: string,
  departureStatusType?: string,
  departureTime: string,
  fareProductDetails?: ?FareProductDetails,
  flights: Array<Flight>,
  isNextDayArrival: boolean,
  passengerCount?: string,
  passengers?: Array<PricingBoundPassenger>,
  passengerTypeCounts?: {
    adult: number
  },
  standbyFlight?: ?StandbyFlightProps,
  stops?: Array<*> | null,
  travelTime: string,
  upsellBoundDetails?: {
    selectionText?: string
  }
};

export type Fee = {
  description: string,
  fee: CurrencyType
};

export type EarlyBirdPriceDetailType = {
  unitPrice: CurrencyType,
  total: CurrencyType,
  purchasedCount: number,
  description: string
}

export type TotalPerPassenger = {
  money: CurrencyType,
  passengerCount: number,
  points: ?CurrencyType
}

export type PassengerFare = {
  baseFare: {
    discount: ?CurrencyType,
    fare: CurrencyType,
    totalBaseFare: ?CurrencyType
  },
  taxesAndFees: Array<Fee>,
  totalPerPassenger: TotalPerPassenger,
  paxTypeTotal: {
    moneyTotal: CurrencyType,
    pointsTotal: ?CurrencyType
  },
  earlyBirdPriceDetails?: ?Array<EarlyBirdPriceDetailType>
};

export type MoneyTotalType = {
  amount: string,
  currencyCode: string,
  currencySymbol?: ?string
};

export type TotalsType = {
  adultFare?: ?PassengerFare,
  infantFare?: ?PassengerFare,
  seniorFare?: ?PassengerFare,
  moneyTotal: CurrencyType,
  pointsTotal: ?CurrencyType,
  totalPerPassenger?: ?TotalPerPassenger
};

export type ConfirmationDates = {
  first: string,
  second: ?string
}

export type ConfirmationPassengers = {
  greyBoxMessage?: GreyBoxMessage,
  parentGuardianDetails?: ParentGuardianDetailsType,
  passengers: Array<ConfirmedPassenger>,
  recordLocator: string,
  youngTravelersDetails?: YoungTravelersDetailsType
}

export type Dispatch = (action: {type: *} | ThunkAction) => *;
type ThunkAction = (dispatch: Dispatch, getState: () => *) => *;

export type Store = {
  getState: () => void;
  dispatch: Dispatch;
};

export type History = {
  location: Location
}

export type Location = {
  pathname: string
}

export type Push = (url: string, params: *, query: *, state: *) => void

export type Replace = (url: string, params: *, query: *, state: *) => void

export type GoBack = () => void

export type Airport = {
  code: string,
  airportName: string,
  city: string,
  state: string
}

export type PaymentInfo = {
  cardNumber?: string,
  expiration?: string,
  phoneNumber?: string,
  nameOnCard?: string,
  selectedCardId?: string,
  selectedGhostCardId?: string,
  isoCountryCode?: string,
  stateProvinceRegion?: string,
  zipOrPostalCode?: string,
  addressLine1?: string,
  addressLine2?: string,
  city?: string,
  intentToStore?: boolean,
  isPrimary?: boolean,
  chasePhoneNumber?: string,
  chasePhoneCountryCode?: string,
  securityCode?: string
};

type BasicBillingAddress = {
  isoCountryCode: string,
  stateProvinceRegion: string,
  zipOrPostalCode: string,
  addressLine1: string,
  addressLine2: string,
  city: string,
};

export type PaymentFormData = BasicBillingAddress & {
  cardNumber: string,
  creditCardType: string,
  expiration: string,
  lastFourDigitsOfCreditCard: string,
  nameOnCard: string,
  phoneNumber: string
};

export type UpdateSavedCreditCardFormData = PaymentInfo & {
  savedCreditCardId: string
};

export type UpdateSavedCreditCardPage = {
  type: string,
  lastFourDigits: string,
  nameOnCard: string,
  expiryMonth: number,
  expiryYear: number,
  billingAddress: BasicBillingAddress & {
    isUSAddress: boolean
  },
  _infoNeededToUpdate: {
    savedCreditCardId: string,
    cardDescription: string
  }
};

type BillingAddress = BasicBillingAddress & {
  addressType: string,
  companyName?: string,
};

export type SavedCreditCard = {
  isPrimary: boolean,
  billingContactInfo: {
    address: BillingAddress,
    firstName: string,
    lastName: string
  },
  creditCardPayment: {
    cardDescription: string,
    creditCardType: string,
    expiration: string,
    lastFourDigitsOfCreditCard: string,
    savedCreditCardId: string
  }
}

export type SavedCreditCards = {
  primaryCard: ?SavedCreditCard,
  cardsWithoutPrimary: Array<SavedCreditCard>
};

export type PaymentSavedCreditCard = {
  savedCreditCardId: string,
  type: string,
  name: string,
  lastFourDigits?: string,
  isExpired?: boolean,
}

export type PaymentSavedCreditCards = {
  primaryCard?: PaymentSavedCreditCard,
  otherCards?: Array<PaymentSavedCreditCard>,
  ghostCards?: Array<PaymentSavedCreditCard>,
  ghostCardRequired?: boolean,
  requireSecurityCode?: boolean
}

export type AirStationType = {
  ezRez: boolean,
  latitude: string,
  longitude: string,
  timeZone: string,
  mobileBoarding: boolean,
  id: string,
  stateFederalUnit: string,
  countryCode: string,
  displayName: string,
  stationName: string,
  shortDisplayName: string,
  airportGroupId: string,
  airportGroupName: string,
  airportGroups: Array<string>,
  multiSelectGroup: Array<string>,
  airportGroupSubtitle: string,
  airportGroupShortDisplayName: string
}

export type AirportType = {
  airportName: string,
  airportSearchName: string,
  cityName: string,
  cityState: string,
  code: string,
  countryCode: string,
  displayName: string,
  latitude: string,
  longitude: string,
  marketingCarriers: Array<string>,
  shortDisplayName: string,
  airportGroupId: string,
  airportGroupName: string,
  airportGroups: Array<string>,
  multiSelectGroup: Array<string>,
  airportGroupSubtitle: string,
  airportGroupShortDisplayName: string,
  airportGroupSelected?: Array<string>
}

export type RecentAirportSearchType = {
  value: AirportType;
  timestamp: number;
}

export type ContactMethodInfo = {
  email?: ?string,
  contactMethod?: ?string,
  phoneCountryCode?: ?string,
  phoneNumber?: ?string,
  preferredLanguage?: ?string,
  declineNotifications?: ?boolean,
  isNotificationsEnabled?: ?boolean,
  saveContactMethod?: boolean
}

export type DutyOfCare = {
  contactEmail?: ?string,
  contactMethod?: ?string,
  contactPhone?: ?ContactPhone,
  disclaimerText?: ?string,
  legalVerbiage?: ?string 
}

export type initialFormData = {
  contactMethodContent: string,
  contactTravelManagerInfo: ?DutyOfCare,
  paymentInfo: PaymentInfo,
  internalReferenceNumber: ?string
}

export type prefferedContactInfo = {
  type: ?string,
  value: ?string
}

export type ContactTravelInfo = {
  email: ?string,
  phone: ?PhoneType,
  prefferedContactInfo: ?prefferedContactInfo,
  isNotificationsEnabled?: boolean,
  contactMethod: ?string
}
export type EarlyBirdPricing = {
  body: {
    adultPassengers: ?{
      productIds: string[]
    },
    seniorPassengers?: ?{
      productIds: string[]
    }
  },
  method: HttpMethod,
  href: string
}
type BasicName = {
  firstName: string,
  lastName: string
}
type ContactPhone = {
  countryCode: string,
  number: string
}

type BasicInfo = {
  dateOfBirth: string,
  gender: string,
  knownTravelerNumber?: string,
  middleName?: string,
  rapidRewardsNumber?: string,
  redressNumber?: string,
  suffix?: string
}

export type Passenger = BasicName & BasicInfo & {
  contactMethod?: string,
  contactEmail?: string,
  number?: string,
  countryCode?: string,
  emailReceiptTo?: string,
  shareItineraryEmail: ?string,
  contactPhone?: ContactPhone,
  frequentTravelerList?: Array<FrequentTravelerType>,
  frequentTravelerId?: string,
  frequentTravelerToken?: string,
  allowAddFrequentTraveler?: boolean,
  addFrequentTravelerDisclaimerText?: string,
  associatedAdult?: string,
  saveAsFrequentTraveler?: boolean
};

export type FrequentTravelerType = BasicName & BasicInfo & {
  frequentTravelerId: string,
  frequentTravelerToken: string
};

export type SelectedFrequentTravelerType = {
  paxNumber: number,
  frequentTravelerId: string,
  frequentTravelerToken: string,
  addFrequentTravelerToggle: boolean
};

export type PassportFormData = {
  countryOfResidence?: string,
  doNotWishToProvideAnEmergencyContact?: string,
  emergencyContactCountryCode?: string,
  emergencyContactCountryDialingCode?: string,
  emergencyContactName?: string,
  emergencyContactPhoneNumber?: string,
  emergencyContactSaveForAllPassengers?: string,
  nationality?: string,
  passportExpirationDate?: string,
  passportIssuedBy?: string,
  passportNumber?: string
}

export type PassengerInfos = Array<{
  type: string,
  passengerReference: number,
  passengerInfo: Passenger,
  passportAndEmergencyContact?: PassportFormData,
  specialAssistance?: SpecialAssistanceType,
  departureDate?: string,
}>;

export type MessageStatusType = 'success' | 'error' | 'information';

export type PurchaseSummaryFormData = {
  contactMethodContent: string,
  paymentInfo: PaymentInfo,
  purposeOfTravel?: string,
  securityCode?: boolean,
  isEarlyBirdInPathRadioButtonChecked?: boolean,
  chasePhoneNumber?: string,
  travelFundsAddress?: TravelFundsAddressType,
  dutyOfCareContact: ?ContactTravelInfo
};

export type BillingInformation = {
  cardType: ?string,
  lastFourDigits: ?string,
  cardHolderName: ?string,
  amountApplied: CurrencyType,
  billingAddress: ?{
    streetOne: string,
    streetTwo: ?string,
    location: string
  },
  afpCardType?: string
}

export type BillingAddressFormType = {
  phoneCountryCode?: string,
  phoneNumber?: string,
  addressLine1?: string,
  addressLine2?: string,
  city?: string,
  stateProvinceRegion?: string,
  zipOrPostalCode?: string,
  isoCountryCode?: string
}

export type TravelFundsAddressType = {
  phoneNumber: string,
  address: {
    addressLine1: string,
    addressLine2: ?string,
    city: string,
    stateProvinceRegion: string,
    zipOrPostalCode: string,
    isoCountryCode: string
  }
}

export type AccountContactInfoType = {
  address: BasicBillingAddress,
  emailAddress: ?string,
  phone: ?PhoneType
}

export type OptionType = {
  label: string | number,
  value: string | number,
  hidden?: boolean,
  disable?: boolean,
  disabled?: boolean
};

export type FlightConfirmationAnalyticsType = {
  'Chase.accountCreationStatus': string,
  'Chase.accountProvisioned': boolean,
  'Chase.provisionedRR': string
};

export type FlightConfirmationPageType = {
  dates: ConfirmationDates,
  destinationDescription: string,
  pnrs: Array<ConfirmationPassengers>,
  bounds: ?Array<FlightPricingBound>,
  headerMessage: ?MessageType,
  messages?: Array<MessageType>,
  billingInfo: BillingInformation,
  fundsApplied?: Array<RetrievedFundType>,
  totals?: TotalsType,
  failedPassengers: ?Array<string>,
  autoProvisioningMessage?: ?MessageType,
  _analytics?: FlightConfirmationAnalyticsType
};

export type MessageType = {
  body?: string,
  header?: string,
  icon?: string,
  key: string,
  learnMoreUrl?: string,
  textColor?: string,
  primaryThemeColor?: string,
  inverseThemeColor?: string
};

export type ContactInformationMessageType = {
  key: string,
  header?: string,
  body?: string,
  linkText?: string,
  icon?: string,
  textColor?: string
};

export type ConfirmedPassenger = {
  displayName: string,
  name?: string,
  firstName?: ?string,
  lastName?: ?string,
  accountNumber?: string,
  hasExtraSeat?: boolean,
  specialAssistanceMessage?: SpecialAssistanceMessageType,
  hasAnyEarlyBird?: boolean,
  lapInfant?: {
    name: string
  }
};

export type ApiErrorType = {
  responseJSON: {
    code: number,
    details?: LoginErrorDetailsType,
    error: string,
    httpStatusCode: string,
    infoList?: Array<string>,
    message: string,
    requestId?: string
  },
  status: number
};

type LoginErrorDetailsType = {
  customerIdInResp: string,
  experienceIdReceived: string,
  experienceIdInResp: string,
  requestId: string,
  usernameReceived: string,
  usernameInResp: string,
}

export type PayPalTokenRequestType = {
  totalFare: {
    value: string,
    currencyCode: string
  },
  redirectURLs: {
    cancelURL: string,
    returnURL: string
  }
};

export type PayPalSignInRequestType = {
  tokenRequest: PayPalTokenRequestType
};

export type PayPalResumeDataType = {
  data: *,
  options?: *
};

export type UpcomingTripType = FLIGHT | CAR | HOTEL;

export type UpcomingTripFlightDetails = {
  arrivalAirportCode: string,
  arrivalAirportDisplayName: string,
  arrivalTime: string,
  arrivesNextDay: boolean,
  bannerText: ?string,
  bannerType: ?string,
  boardingGroup: ?string,
  boardingPosition: ?string,
  checkInIneligibilityReason: ?string,
  departureAirportCode: string,
  departureAirportDisplayName: string,
  departureDate: string,
  departureDayOfWeek: string,
  departureTime: string,
  destinationDescription: string,
  flightNumber: string,
  flightStatus: {
    gate: ?string,
    departureStatus: string,
    departureStatusType: string,
    actualDepartureTime: string,
    arrivalStatus: string,
    arrivalStatusType: string,
    actualArrivalTime: string,
    isCancelled: boolean,
    isNowBoarding: boolean
  },
  informationalMessaging: ?string,
  informationalMessagingType: ?string,
  isCheckInEligible: boolean,
  isCheckedIn: boolean,
  isEBEligible: boolean,
  isInternational: boolean,
  isNonRevPnr: boolean,
  standbyFlight: ?StandbyFlightProps,
  wifiOnBoard: ?boolean
}

export type UpcomingTripPage = {
  dates: {
    first: string,
    second: ?string
  },
  destinationDescription: string,
  confirmationNumber: string,
  tripType: UpcomingTripType,
  pages: ?Array<UpcomingTripFlightDetails>,
  isWithin24Hours: boolean,
  isWithin48Hours: boolean,
  _links: {
    viewStandbyList: ?Link,
    viewReservationViewPage: Link,
    checkInViewReservationPage: ?Link,
    viewBoardingPass: ?Link,
    viewBoardingPositions: ?Link,
    carReservationDetails: ?Link,
    changeFlightPage: ?Link
  }
};

export type ViewBoardingPass = {
  body?: {
    checkInSessionToken?: string,
    firstName: string,
    lastName: string,
    travelerID?: Array<string>,
    recordLocator?: string,
    travelerSegmentIdentifier?: Array<string>
  },
  travelerID?: string,
  href?: string,
  method?: HttpMethod,
  nonSequentialPositionsMessage?: string,
  labelText?: string
}

export type CheckedBagsType = {
  labelText: string,
  url: string,
  query?: {
    first_name: string,
    last_name: string,
    record_locator: string
  }
}

export type BagsSharedQueryParamsType = {
  clk: string;
}

export type TrackBagsQueryParamsType = BagsSharedQueryParamsType & {
  helpCenterURL: string,
  returnToURL: string,
}

export type PhoneType = ContactPhone & {
  phoneType: string
}

export type SecurityQuestionAnswerType = {
  question: string,
  answer: string
}

export type UserAccountCustomerInfoType = {
  birthDate: string,
  gender: string,
  name: {
    firstName: string,
    lastName: string,
    middleName: string,
    preferredName: string,
    suffix: string
  }
}

export type CreateUserAccountType = {
  contactInfo: AccountContactInfoType,
  customerInfo: UserAccountCustomerInfoType,
  optInForEmailSubscriptions: boolean,
  password: string,
  promoCode: ?string,
  securityQuestions: Array<SecurityQuestionAnswerType>,
  userName: string
}

export type SpecialAssistanceType = {
  DEAF?: boolean,
  BLIND?: boolean,
  COGNITIVE_AND_DEVELOPMENTAL_SSR?: boolean,
  ASSISTANCE_ANIMAL?: boolean,
  PEANUT_DUST_ALLERGY?: boolean,
  PORTABLE_OXYGEN_CONCENTRATOR?: boolean,
  WHEELCHAIR_ASSISTANCE?: string,
  WHEELCHAIR_STOWAGE?: string,
  WET_BATTERIES?: string,
  DRY_BATTERIES?: string
}

export type SpecialAssistanceMessageType = {
  body: string,
  icon: string,
  key: string
}

export type ViewBoardingPassTravelerIdsSegmentIdsType = {
  travelerID: Array<string>,
  travelerSegmentIdentifier: Array<string>
}

export type GreyBoxMessage = {
  body?: string,
  header?: string,
  key?: string,
  title?: string
}

export type ElementRef = HTMLElement | null;

export type HeaderRefsType = {
  string?: ElementRef
}

export type WebViewOAuth = {
  access_token: string,
  id_token: string,
  token_type: string,
  expires_in: number,
  scope?: string,
  refresh_token?: string
}

export type NativeAppLoginOptions = {
  loginType?: NativeAppLoginType,
  continueAsGuest?: boolean
};

export type NativeAppLoginType = NORMAL | POINTS | PURCHASE | TRANSFER_TRAVEL_FUNDS;

export type AdobeTargetParams = $Shape<ChaseCodes & ChasePersonalizationParams>;

type ChasePersonalizationParams = {
  redeemablePoints?: number
};

export type AdobeTargetResponse = Array<{
  content?: string
}>;

export type AdobeTargetContent = {
  target?: {
    segment?: Array<string>
  },
  test?: {
    [key: string]: string
  },
  test_i18n?: {
    [key: string]: string
  }
};

export type AdobeTargetConfig = Array<AdobeTargetOptions>;

type AdobeTargetOptions = {
  mbox: string,
  params?: AdobeTargetParams
}

export type ChasePrequalResponse = {
  offers: Array<{
    acquisitionSourceCode: string
  }>,
  offerIdentifier: string,
  highValueIndicator: string
}

export type ChaseCodes = {
  offerIdentifier: string,
  acquisitionSourceCodes: string,
  highValueIndicator: string
};

export type HttpRequest = {
  url: string,
  type: HttpMethod,
  contentType?: string,
  dataType: string,
  query?: {},
  body?: {}
};

export type BaseCeptorConfig = {
  ceptorConfigParams: {
    uatpHostUrl: string,
    uatpAirlineIdentifier: string,
  }
};

type CeptorAFPMethod = {
  paymentMethod: string,
  provider: string
};

export type CeptorAFPConfig = {
  language: string,
  paymentMethodConfigParams: Array<ApplePayPaymentMethodConfigParam | UpliftPaymentMethodConfigParam>
};

type ApplePayPaymentMethodConfigParam = CeptorAFPMethod & {
  config: {
    clientId: number,
    hostUrl: string,
    countryId: number,
    accountId: number,
    transactionTypeId: number,
    applePayCardTypeId: number,
    isWebView?: boolean
  }
};

type UpliftPaymentMethodConfigParam = CeptorAFPMethod & {
  config: {
    checkout: boolean,
    potentialUpsellAmount?: number,
    shortTTT: boolean,
    container: string,
    tripInfo: UpliftConfigTripInfo,
    prices: UpliftConfigPrices
  }
};

export type UpliftConfigTripInfo = {
  travelers: UpliftConfigTravelers,
  air_reservations: UpliftConfigAirReservations,
  order_lines?: Array<{
    name: string,
    unit_price: number,
    quantity: number,
    total_price: number
  }>
};

type UpliftConfigTravelers = Array<{
  id: number,
  first_name: string,
  last_name: string
}>;

type UpliftConfigAirReservations = Array<{
  price: number,
  trip_type: string,
  origin: string,
  destination: string,
  itinerary: Array<{
    departure_apc?: string,
    arrival_apc?: string,
    departure_time: string,
    arrival_time?: string,
    arrival_city?: string,
    departure_city?: string,
    carrier_code?: string,
    fare_class?: string
  }>
}>;

type UpliftConfigPrices = {
  'up-early-bird-check-in': {
    value: number,
    type: string,
    model: string
  },
  'up-trip-total': {
    value: number,
    type: string,
    model: string
  },
};

export type CeptorAFPConfigWithAmount = CeptorAFPConfig & {
  amount: number,
  currency: string
};

export type CeptorConfig = BaseCeptorConfig & {
  requestedAFPParams: CeptorAFPConfig
};

export type CeptorConfigWithAmount = BaseCeptorConfig & {
  requestedAFPParams: CeptorAFPConfigWithAmount
};

export type CeptorAFPConfigWithValidationFn = CeptorConfigWithAmount & {
  validationFn: CeptorValidationCallback
}

export type CeptorAfpResponse = Array<CeptorAFPMethod & {
  paymentMethod: string,
  methodAvailable: boolean,
  parameters: {},
  AFPCode: number,
  AFPStatusMessage: string,
  AFPErrorMessages: Array<string>
}>;

export type CeptorBillingInfo = {
  addressLines: Array<string>,
  administrativeArea: string,
  country?: string,
  countryCode: string,
  familyName?: string,
  givenName?: string,
  locality: string,
  postalCode: string,
  subAdministrativeArea: string,
  subLocality?: string
}

export type CeptorCallbackResponse = CeptorAFPMethod & {
  code: string,
  statusMessage: string,
  providerResponse: {
    code: string,
    statusMessage: string,
  },
  paymentData: {
    billingInfo?: CeptorBillingInfo,
    cardNumber?: string,
    expiryMonth?: string,
    expiryYear?: string,
    lastFourDigits?: string
  }
};

export type CeptorValidationResponse = CeptorAFPMethod & {
  validationPossible: boolean,
  paymentParameters: CeptorBillingInfo
};

export type CeptorRetrieveParamsResponse = {
  code: number,
  data: {
    ErrorMessages?: Array<*>,
    InitialRequest: string,
    Status: string,
    StatusCode: number
  },
  status: string
}

export type CeptorExtensionResponse = {
  addInfo?: (*, string) => void,
  addErrorInfo?: (*, string) => void,
  removeInfo?: (*) => void
}

export type CeptorCallback = (response: CeptorCallbackResponse) => void;

export type CeptorValidationCallback = (response: CeptorValidationResponse) => void;

export type AfpAvailability = {
  paymentMethod: string,
  isAvailable: boolean,
  isActive: boolean,
  hasError: boolean,
  lastUpdateFailed: boolean,
  parameters?: *,
  shouldDisplay: boolean
};

export type ApplePayBillingAddress = BasicBillingAddress & {
  firstName: string,
  lastName: string
};

export type mWebApplePayCard = {
  token: {
    digitalTransactionId?: string,
    expirationMonth: string,
    expirationYear: string,
    lastFourDigits: string,
    number: string
  },
  billingAddress: ApplePayBillingAddress,
  isNativeApplePay: false
};

type NativeApplePayCard = {
  purchaseRequest: *,
  isNativeApplePay: true
};

type WithFormData = {
  formData: *
};

export type ApplePayCard = mWebApplePayCard | NativeApplePayCard;
export type ApplePayCardWithFormData = (mWebApplePayCard & WithFormData) | (NativeApplePayCard & WithFormData);

export type UpliftCard = {
  token?: {
    number: string,
    expirationMonth: string,
    expirationYear: string
  },
  billingAddress?: BasicBillingAddress
};
export type UpliftCardWithFormData = (UpliftCard & WithFormData);

export type CeptorCardType = ApplePayCard | UpliftCard;

export type AfpErrorHandler = (CurrencyType) => void;

export type CeptorTokenAvailability = {
  isAvailable: boolean
};

export type WcmFooterType = {
  linkListItems: Array<WcmFooterRowType>
}

export type WcmFooterRowType = {
  linkTarget: string,
  linkText: string,
  linkType: string
}

export type LogType = {
  action: string,
  component: string,
  count: number,
  details: string,
  errorCode: number | null,
  httpCode: number | null,
  level: ErrorLevel,
  location: string,
  message: string,
  timestamp: number
}

export type AdapterErrorType = {
  stack?: string,
  status?: number,
  statusText?: string,
  url?: string
};

export type ErrorLevel = LOG_LEVEL.ALL | LOG_LEVEL.DEBUG | LOG_LEVEL.ERROR | LOG_LEVEL.FATAL | LOG_LEVEL.INFO | LOG_LEVEL.TRACE | LOG_LEVEL.WARN;

export type HazmatIconType = {
  iconClass: string,
  iconTitle: string
};

export type SubscriptionItemType = {
  title: Node,
  details: string
};

export type SubscriptionListType = Array<SubscriptionItemType>;

export type LinkRequestType = {
  href: string,
  method: HttpMethod
}

export type UpsellDetailsType = {
  shouldRenderHeader?: boolean,
  shouldRenderUpgradeButton?: boolean,
  offerFeatures: Array<FormattedProductDetails>,
  offerText?: string,
  offerTitle?: string,
  stylizedOfferTitle?: StylizedLabel,
  offerIcon?: string,
  upsellToProductId?: string,
  selectionText?: string,
  labelText?: string
}

export type BuildPassengerType = {
  type: string,
  passengerReference: number,
  passengerInfo: Passenger,
  passportAndEmergencyContact?: PassportFormData,
  specialAssistance?: SpecialAssistanceType,
}

type PassengerSearchTokenType = {
  passengerSearchToken: string
}

export type SameDayReservation = {
  body: PassengerSearchTokenType,
  href: string,
  method: HttpMethod,
  labelText: string
}

export type SameDayBlockedMessageType = {
  body: string,
  header: string,
  icon: string,
  key: string,
  labelText: string,
  shouldShowCheckInButton: boolean,
  shouldShowModifyBagsButton: boolean,
  textColor: string
}

export type PassengerSelectionType = {
  name: string,
  passengerCanBeSplitOff?: boolean,
  passengerId: string,
  passengerTypeText?: string
}

export type HeaderMessageType = {
  body: string,
  header: string,
  icon: string,
  inverseThemeColor: string,
  key: string,
  primaryThemeColor: string,
  textColor: string
}

export type SplitPnrDetailsType = {
  additionalInformationText: string,
  confirmationText: string,
  headerMessage: ?HeaderMessageType,
  messages: ?Array<MessageType>,
  passengerSelections: Array<PassengerSelectionType>,
  selectionText: string,
}

export type RequestParameters = PassengerNameRecord & {
  passengerSearchToken?: string
};

export type PriceTotalType = {
  totals?: TotalsType
};

export type ModalInfoType = {
  icon: string,
  text: string
};

export type ModalDetailsType = {
  buttonText: string,
  infoList: Array<ModalInfoType>,
  title: string
};

export type ModifyBaggageDetailsType = {
  linkIcon: string,
  linkPrefixText: string,
  linkSuffixClickableText: string,
  modalDetails: ModalDetailsType
};

export type AlternativeFormOfPaymentType = {
  afpAvailability?: AfpAvailability,
  ceptorConfig?: CeptorConfigWithAmount,
  paymentMethod: string,
  isWebView?: boolean,
  shouldShowUplift?: ?boolean,
  shouldDisableUplift?: ?boolean,
  errorHandler?: *
}

export type BoardingPassStyleObjectType = {
    bottomLabels: string,
    bottomValues: string,
    gradientEnd: string,
    gradientStart: string,
    headerLabel?: string,
    headerText?: string,
    topLabels: string,
    topValues: string
}

export type OverlayType = {
  body?: Array<*>,
  title?: string
}

export type YoungTravelerParentOrGuardianFormDataType = {
  addressLine1: string,
  city: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  relationship: string,
  stateProvinceRegion: string,
  zipOrPostalCode: string
}

export type ParentOrGuardianFormDataType = {
  [key: string]: {
    data: YoungTravelerParentOrGuardianFormDataType | *,
    url: string
  }
}

export type YoungTravelersDetailsType = {
  linkIcon: string,
  linkSuffixClickableText: string,
  linkTitle: string,
  linkUrl: string
}

export type ParentGuardianDetailsType = {
  linkIcon: string,
  linkSuffixClickableText: string,
  linkTitle: string,
  modalDetails: {
    body: string,
    buttonText: string,
    parentGuardianAddressLine1: string,
    parentGuardianAddressLine2: string,
    parentGuardianCountry: string,
    parentGuardianName: string,
    parentGuardianPhone: string,
    parentGuardianRelationship: string,
    parentLocation: string,
    title: string
  }
}

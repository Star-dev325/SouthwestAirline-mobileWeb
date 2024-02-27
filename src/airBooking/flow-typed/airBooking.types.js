// @flow
import type { PassengerType } from 'src/shared/flow-typed/passenger.types';
import type { BoundType } from 'src/shared/flow-typed/flightBound.types';
import TripTypes from 'src/shared/constants/tripTypes';
import type {
  ApplePayCard,
  BriefBoundType,
  ContactMethodInfo,
  CurrencySuit,
  CurrencyType,
  CurrencyWithDescriptionType,
  EarlyBirdPricing,
  Fee,
  FlightConfirmationPageType,
  FlightPricingBound,
  FlightProductCard,
  MessageType,
  Passenger,
  PassengerInfos,
  PaymentInfo,
  ProductDefinitions,
  PurchaseSummaryFormData,
  TotalsType,
  UpliftCard,
  UpsellDetailsType,
  DutyOfCare,
  MultiSelectGroup,
  FlightBoundCard
} from 'src/shared/flow-typed/shared.types';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

const { ONE_WAY, ROUND_TRIP } = TripTypes;

export type ShoppingLandingPageQuery = {
  adultPassengersCount?: number,
  currencyType: CurrencySuit,
  departDate: string,
  departureDate?: string,
  destinationAirportCode?: string,
  fareType?: CurrencySuit,
  fromCity: string,
  lapInfantPassengersCount?: number,
  numberOfAdults?: number,
  numberOfLapInfants?: ?number,
  originationAirportCode?: string,
  promoCode?: string,
  returnDate?: string,
  toCity: string,
  tripType?: 'oneway' | 'OW' | 'roundtrip' | 'RT',
  useLowFareCalendar?: boolean
}

export type BoundPage = {
  cards?: Array<FlightProductCard>,
  header: {
    airportInfo: string,
    destinationAirport?: string,
    originAirport?: string,
    selectedDate: string
  }
};

export type FlightShoppingPageType = {
  _links: {
    fareDetails: {
      href: string,
      labelText: string,
      method: string
    },
    flightPricingPage: Link
  },
  _meta: {
    hasAdult: boolean,
    isPromoCodeApplied: boolean,
    purchaseWithPoints: boolean
  },
  disclaimerWithLinks: ?string,
  inboundPage: ?BoundPage,
  messages: Array<MessageType>,
  outboundPage: BoundPage,
  productDefinitions?: ProductDefinitions,
  promoCodeNotice: ?string,
  showSgaMessage: boolean
};

type MultiSelectBound = {
  bounds?: Array<FlightBoundCard>,
  header: {
    destinationAirport?: string,
    originAirport?: string,
    selectedDate: string
  }
};

export type FlightShoppingMultiSelectPageResponse = {
  _links?: {
    fareDetails: {
      href: string,
      method: string,
      labelText: string
    },
    flightPricingPage: Link
  },
  _meta?: {
    hasAdult: boolean,
    isPromoCodeApplied: boolean,
    purchaseWithPoints: boolean
  },
  disclaimerWithLinks?: string,
  inboundPage?: MultiSelectBound,
  messages?: Array<MessageType>,
  outboundPage: MultiSelectBound,
  productDefinitions?: ProductDefinitions,
  promoCodeNotice?: string,
  showSgaMessage: boolean,
};

export type FlightShoppingMultiSelectPageType = {
  response: FlightShoppingMultiSelectPageResponse,
  selectedBound?: {
    originBoundAirport: string,
    destinationBoundAirport: string
  }
};

export type FlightShoppingMultiSelectPageResponseType = {
  multipleAirportsData?: FlightShoppingMultiSelectPageType
};

export type FlightShoppingPageResponseType = {
  flightShoppingPage?: FlightShoppingPageType
};

export type ChaseInfo = {
  chaseApplicationCompleted: boolean,
  credit: string,
  isApproved: boolean,
  isValidChaseSessionId: boolean
};

export type ApplicationInfo = ChaseInfo & {
  chaseCreditStatus: string,
  customer: {
    accountNumber: string,
    firstName: string,
    lastName: string
  }
};

export type PassengerValidationRequestType = {
  body: {
    adultPassengers: {
      productIds: Array<string>
    }
  },
  href: string,
  method: HttpMethod
}

export type FlightSelectFarePage = {
  accountInfo: ?Passenger,
  card: FlightProductCard,
  disclaimerWithLinks?: string,
  fareDetailsLink: { href: string, labelText: string },
  fetchFareDetailsJsonFn: (string, string) => void,
  flightCardIndex: number,
  flightPricingPage: Link,
  getFlightSelectFarePagePlacementsFn: (*) => void,
  goBack: () => void,
  isPromoCodeApplied: boolean,
  isWebView: boolean,
  nextProductPageParams: {
    direction: ?BoundType,
    paxType: ?PassengerType
  },
  params: {
    direction: BoundType,
    paxType: PassengerType
  },
  placements: {
    promoTop01: DynamicPlacementResponse,
    bottomPromo1: DynamicPlacementResponse
  },
  productDefinitions: ProductDefinitions,
  searchRequest: FlightProductSearchRequest,
  selectedCompanyName: ?string,
  selectedProducts: SelectedProducts,
  selectFlightProductFn: (selectFlightProduct: SelectFlightProduct) => void,
  sortFlightProductsFn: (string, string, string) => void,
  sortStrategy: string,
  tier?: string
}

export type FlightPricingPage = {
  _links: {
    earlyBirdPricing: ?EarlyBirdPricing,
    flightConfirmationPage: *,
    flightPricingUpsellBothBounds?: Link,
    passengerValidation?: ?PassengerValidationRequestType
  },
  _meta?: {
    authorizeUser: boolean,
    chase: ?ChaseInfo,
    internationalBooking: boolean,
    newCardHasSufficientFunds: boolean,
    purchaseWithPoints: boolean,
    showRepriceNotification: boolean
  },
  acceptanceText1: string,
  acceptanceText2: string,
  billingAddress?: ?string,
  bounds: Array<FlightPricingBound>,
  chaseBanner?: ?string,
  fareRulesWithLinks: ?string,
  header: string,
  isReprice?: boolean,
  messages?: Array<MessageType>,
  reviewMessages?: Array<MessageType> | null,
  totals: TotalsType,
  upsellDetails?: UpsellDetailsType,
  upsellSuccessMessage?: {
    header: string,
    body: string
  }
};

export type FlightProductSearchRequest = {
  adultPassengersCount?: number,
  currencyType: CurrencySuit,
  departureDate?: string,
  destination: ?string,
  isLapChildEnabled?: ?boolean,
  isRoundTrip: boolean,
  lapInfantPassengersCount?: number,
  multipleDestinationAirports?: string[],
  multipleOriginationAirports?: string[],
  numberOfAdults: number,
  numberOfLapInfants?: number,
  origin: ?string,
  promoCode?: string,
  returnDate?: string,
  tripType: 'oneway' | 'oneWay' | 'roundtrip' | 'roundTrip',
  useLowFareCalendar?: boolean
};

export type FlightBoundMultiSelectSearchRequest = FlightProductSearchRequest & {
  multipleDestinationAirportGroupName?: string,
  multipleDestinationAirports?: string[],
  multipleOriginationAirportGroupName?: string,
  multipleOriginationAirports?: string[],
  multiSelectGroup?: MultiSelectGroup
};

export type ChapiFlightProductSearchRequest = {
  'origination-airport': string,
  'destination-airport': string,
  'departure-date': string,
  'return-date'?: string,
  'number-adult-passengers': number,
  'number-lap-infant-passengers'?: number,
  'promo-code'?: string,
  'currency': CurrencySuit
};

export type MultiSelectGroupSearchRequest = {
  originationAirport: string,
  destinationAirport: string,
  multipleOriginationAirportGroupName?: string,
  multipleOriginationAirports?: string[],
  multipleDestinationAirportGroupName?: string,
  multipleDestinationAirports?: string[],
  departureDate: string,
  returnDate?: string,
  numberAdultPassengers: number,
  numberLapInfantPassengers?: number,
  promoCode?: string,
  currency: CurrencySuit
};

export type PassengerInfoRequest = {
  searchRequest: FlightProductSearchRequest,
  chaseCardHolder?: ChaseCardHolder,
  path?: string
};

type EarlyBirdPassenger = {
  accountNumber?: string,
  dateOfBirth?: string,
  gender?: string,
  name: {
    firstName: string,
    lastName: string,
    middleName?: string
  },
  passengerReference: string
};

type PassengerForEarlybirdInPathRequest = {
  productIds: string[],
  passengers: Array<EarlyBirdPassenger>
};

export type EarlybirdInPathRequest = {
  body: {
    adultPassengers?: PassengerForEarlybirdInPathRequest,
    currency: CurrencySuit
  },
  href: string,
  method: HttpMethod
};
export type ChaseCardHolder = {
  accountNumber?: string,
  firstName?: string,
  lastName?: string,
  middleName?: string
};

export type FlightPricingPageResponse = {
  flightPricingPage: FlightPricingPage,
  prefill: ?{
    chaseCardHolder: ChaseCardHolder
  }
};

export type PassengerDetailsPageResponse = {
  passengerDetailsPage: Passenger
};

export type SelectedProduct = {
  outbound: {
    fareProductId: string,
    flightCardIndex: number
  },
  inbound?: {
    fareProductId: string,
    flightCardIndex: number
  }
}

export type SelectedProducts = {
  adult?: SelectedProduct
};

export type SelectedFlight = {
  currentDirection: BoundType,
  flightDetails: {
    card: FlightProductCard,
    disclaimerWithLinks: ?string,
    flightCardIndex: number,
    flightPricingPage: Link,
    isPromoCodeApplied: boolean,
    nextProductPageParams: {
      direction: BoundType,
      paxType: PassengerType
    },
    params: {
      direction: BoundType,
      paxType: PassengerType
    },
    searchRequest: FlightProductSearchRequest,
    selectedProducts: SelectedProducts,
    sortStrategy: string
  },
  isMultiSelectGroup?: boolean
};

export type CorporateInfo = {
  activeCompanyIdAssociations?: Array<Company>,
  selectedCompany?: Company
};

export type CorporateBookingSwitchInfo = {
  label: ?string,
  learnMoreUrl: ?string,
  nonCorporateLearnMoreUrl: ?string
};

export type Company = {
  companyId: string,
  companyName: string
};

export type SelectFlightProduct = {
  direction: BoundType,
  fareProductId: string,
  flightCardIndex: number,
  flightPricingPage: *,
  nextProductPagePath: ?string,
  paxType: PassengerType,
  searchRequest: FlightProductSearchRequest,
  selectedProducts: SelectedProducts,
  tier: ?string
};

export type TripSummaryType = {
  bounds: Array<BriefBoundType>,
  currency: CurrencyType,
  defaultLapChildCurrency: CurrencyType,
  lapChildCountDescription: string,
  passengerCountDescription: string
};

export type GeneratePurchaseSummaryPageParamsType = {
  flightPricingPageResponse: FlightPricingPageResponse,
  passengerInfos: PassengerInfos
}

export type PurchaseFlightParamsType = {
  applePayCard?: ?ApplePayCard,
  chaseSessionId?: ?string,
  contactMethodInfo: ContactMethodInfo,
  dutyOfCareContact?: DutyOfCare,
  earlyBirdEligibility: ?EarlyBirdEligibility,
  earlyBirdPricingDifference?: string,
  earlyBirdSelected?: boolean,
  flightPricingPageResponse: FlightPricingPageResponse,
  formData: PurchaseSummaryFormData,
  formId: string,
  fundsAppliedToken?: string,
  isSavedAsPrimaryCard: boolean,
  passengerInfos: PassengerInfos,
  paymentInfo: PaymentInfo,
  payPal?: PayPalPaymentType,
  priceTotal: { totals: TotalsType },
  selectedIrn?: SelectedIrnType,
  travelFundsBalanceRemaining?: CurrencyType,
  upliftCard?: ?UpliftCard,
  calculateFundsTaxesAndFees?: Array<Fee>
};

export type SelectedIrnType = {
  name: string,
  manuallyEntered: boolean
};

export type AddManualIrnFormPropsType = {
  onCancel: () => void,
  onSubmit: () => void,
  selectedIrn?: SelectedIrnType,
  formId: string,
  formData: ManualIrnFormDataType
};

export type EarlyBirdSwitchPropsType = {
  earlyBirdSelected: boolean,
  saveEarlyBirdSelectedFn: (boolean) => void,
};

export type ManualIrnFormDataType = {
  manualIrn: string
};

export type PayPalPaymentType = {
  token: string
};

export type FlightPurchasePageResponseType = {
  flightConfirmationPage: FlightConfirmationPageType
}

type EarlyBirdProductForPassenger = {
  fare: ?{
    baseFare: CurrencyType,
    totalTaxesAndFees: CurrencyType,
    totalFare: CurrencyType
  },
  passengerReference: ?Array<string>,
  productId: string
}

export type EarlyBirdInPathBound = {
  originDestinationAirports: string,
  flightNumbers: string,
  passengersGroups: Array<{
    canPurchaseEarlyBird: boolean,
    decisionDescription: string,
    fareType: string,
    isAlist: boolean,
    price: ?CurrencyType
  }>,
  isEligible: boolean,
  _meta: {
    products: {
      adult: ?EarlyBirdProductForPassenger,
      senior?: ?EarlyBirdProductForPassenger
    }
  }
};

export type EarlyBirdEligibility = {
  adultProductsCount: string,
  bounds: Array<EarlyBirdInPathBound>,
  ineligibilityReasons: ?Array<string>,
  totalPrice: CurrencyType,
  unitPrice: ?CurrencyWithDescriptionType,
  _meta: {
    passengers: Array<EarlyBirdPassenger>
  }
}

export type AirBookingShoppingSearchFormDataType = {
  currencyType: CurrencySuit,
  departureAndReturnDate: {
    departureDate: string,
    isDateChanged?: boolean,
    returnDate?: string
  },
  destination: ?string,
  numberOfAdults: number,
  numberOfLapInfants?: number,
  origin: ?string,
  promoCode?: string,
  tripType: ONE_WAY.value | ROUND_TRIP.value,
  useLowFareCalendar?: boolean
}

export type PurchaseSummaryPagePlacements = {
  bottomPromo1?: DynamicPlacementResponse,
  earlyBirdUpsell?: DynamicPlacementResponse,
  upliftMessage?: DynamicPlacementResponse
};

export type PassengerCountValue = {
  adultCount: number,
  lapChildCount: number,
  valueUpdated: boolean
};

export type MultiSelectAirportBounds = {
  originBoundAirport: string,
  destinationBoundAirport: string
};

export type SearchForMultiSelectGroupFlightsArgsType = {
  errorHandler?: () => void,
  multiSelectGroup: MultiSelectGroup,
  nextPagePath?: string,
  searchRequest: FlightBoundMultiSelectSearchRequest,
  shouldSaveSearchRequest?: boolean
};

export type YoungTravelerPageInfoType = {
  body: string,
  disclaimerText: string,
  linkText: string
};

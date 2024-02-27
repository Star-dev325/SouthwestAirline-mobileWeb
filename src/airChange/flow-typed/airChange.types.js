// @flow
import { Dayjs } from 'dayjs';
import { SELECTION_MODE, FLIGHT_PRODUCT_TYPE, FLIGHT_TYPE } from 'src/airChange/constants/airChangeConstants';

import type { RefreshFundsRequestType } from 'src/airBooking/flow-typed/calcFunds.types';
import type { BoundSelection } from 'src/shared/flow-typed/boundSelect.types';
import type { BoundType } from 'src/shared/flow-typed/flightBound.types';
import type { PassengerType } from 'src/shared/flow-typed/passenger.types';
import type {
  AirportType,
  ApplePayCard,
  BoundDescriptionType,
  ConfirmationDates,
  ConfirmedPassenger,
  ContactMethodInfo,
  CurrencySuit,
  CurrencyType,
  DisplayAirport,
  FareProduct, 
  FlightConfirmationPageType,
  FlightPricingBound,
  FlightProductCard,
  LinkRequestType, 
  MessageType,
  PaymentInfo,
  TotalsType
} from 'src/shared/flow-typed/shared.types';

const { ALL, NONE, SINGLE } = SELECTION_MODE;
const { DEPARTURE, RETURN } = FLIGHT_TYPE;

export type SelectionMode = ALL | NONE | SINGLE;

export type DynamicWaiverType = {
  alternativeArrivalCities: Array<string>,
  alternativeDepartureCities: Array<string>,
  calculatedStartDate: string,
  calculatedEndDate: string,
  eligibleStartDate: string,
  eligibleEndDate: string,
  firstTravelDate: ?string,
  flightType: DEPARTURE | RETURN,
  lastTravelDate: ?string,
  rangeType: ?string,
  rangeValue: ?string
}

export type ChangeFlightPage = {
  messages: Array<MessageType>,
  selectionMode: SelectionMode,
  boundSelections: Array<BoundSelection>,
  dynamicWaivers: Array<DynamicWaiverType>,
  passengerDetails: PassengerDetails,
  _links: {
    changeShopping: Link
  },
  _meta: {
    hasUnaccompaniedMinor: boolean
  }
};

export type ReaccomFlightPage = {
  _links: {
    reaccomProducts: Link
  },
  _meta: {
    allowARNKPnrs: boolean,
    hasUnaccompaniedMinor: boolean,
    isBlockMultiBoundSelection: boolean,
    isSwabiz: boolean
  },
  boundSelections: Array<BoundSelection>,
  dynamicWaivers?: Array<DynamicWaiverType>,
  flightSearchMessage?: MessageType,
  messages: Array<MessageType>
};

export type SearchRequest = {
  to: string,
  from: string,
  departureAndReturnDate: {
    departureDate: string,
    returnDate?: string,
  },
  isLapChildEnabled?: boolean
}

export type CurrentReservationType = {
  arrivesTime: string,
  date: string,
  departsTime: string,
  flight: string,
  flightTime: string,
  isNextDayArrival: boolean,
  isOvernight?: boolean,
  shortStopDescription?: ?string,
  stopCity?: ?string
};

export type FlightBoundPage = {
  header: {
    airportInfo: string,
    selectedDate: string,
    originAirport: string,
    destinationAirport: string
  },
  cards: Array<FlightProductCard>
}

type FlightShoppingChangePageLink = LinkRequestType & {
  body: {
    boundReference: Array<string>
  }
}

export type CheckedInNoticeType = {
  title: string,
  message: string
}

export type ChangeShoppingPage = {
  currentReservation: {
    outbound?: CurrentReservationType,
    inbound?: CurrentReservationType
  },
  flights: {
    outboundPage?: FlightBoundPage,
    inboundPage?: FlightBoundPage
  },
  _links: {
    changePricingPage: FlightShoppingChangePageLink
  },
  _meta?: {
    purchaseWithPoints: boolean,
    isPromoCodeApplied?: boolean,
    isCheckedIn?: boolean
  },
  promoCodeNotice?: string,
  shoppingMessages: Array<MessageType>,
  showSgaMessage: boolean,
  checkedInNotice?: CheckedInNoticeType,
  disclaimerWithLinks: ?string
};

export type PassengerNameRecord = {
  confirmationNumber: string,
  firstName: string,
  lastName: string
}

export type PassengerDetails = {
  disclaimerTextWithLinks: string,
  title: string,
  passengerList: Array<{ displayName: string }>
}

export type BasicFlightSelection = {
  flightCardIndex: number,
  sortByValue: string,
  isLoggedIn: boolean,
  isReaccom: boolean,
  page: ShoppingPageFromSelectorType,
  selectedBounds: SelectedBounds,
  selectedProducts: SelectedProducts
};

export type FlightDetails = BasicFlightSelection & {
  card: FlightProductCard,
  params: {
    direction: BoundType,
    paxType: PassengerType
  },
};

export type SelectedFlight = {
  flightDetails: FlightDetails,
  currentDirection: BoundType
}

export type FareProductionSelection = BasicFlightSelection & {
  isDynamicWaiver: boolean,
  fareProduct: FareProduct | ReaccomBoundPageCardType
};

export type SelectedBounds = {
  firstbound: boolean,
  secondbound?: boolean
}

type SelectedProduct = {
  fareProductId: string,
  flightCardIndex: number,
  flightProductType: FLIGHT_PRODUCT_TYPE.DYNAMIC_WAIVER | FLIGHT_PRODUCT_TYPE.NORMAL
}

export type SelectedProducts = {
  outbound?: SelectedProduct,
  inbound?: SelectedProduct
}

export type SearchFlightOptions = {
  searchRequest: SearchRequest,
  selectedBounds: { [string]: boolean },
  changeShoppingLink: Link,
  boundSelections: Array<BoundSelection>
}

export type tripType = 'roundTrip' | 'oneWay';

export type ChangeRequest = {
  productId?: string,
  boundReference: string,
  boundType: string,
  departureAirportCode: string,
  arrivalAirportCode: string,
};

export type PricingRequest = LinkRequestType & {
  body: {
    changeRequests: Array<ChangeRequest>
  }
}

export type FareSummary = {
  originalTripCost: ?PricingChangeFareItem,
  newTripCost: ?PricingChangeFareItem,
  tax: ?PricingChangeFareItem,
  nonRefundable: ?PricingChangeFareItem,
  refundable: ?PricingChangeFareItem,
  youOwe?: ?PricingChangeFareItem,
  totalRefundability: ?PricingChangeFareItem,
  travelFunds: ?PricingChangeFareItem,
  newAmountDue: ?PricingChangeFareItem,
  totalDueNow?: ?PricingChangeFareItem,
  remainingTravelFunds: ?PricingChangeFareItem
}

export type PricingChangeFareItem = {
  item: string,
  fare: ?CurrencyType,
  tax: ?CurrencyType
}

type PricingChangeMessage = {
  icon?: string,
  textColor?: string,
  header?: string,
  body?: string
}

export type ChangePricingPage = {
  _meta: {
    isInternational?: boolean,
    isUpgrade?: boolean,
    newCardHasSufficientFunds: boolean,
    purchaseWithPoints: boolean
  },
  _links: {
    calculateFunds: ?RefreshFundsRequestType,
    changeConfirmationPage: Link
  },
  acceptanceText1: string,
  acceptanceText2: string,
  accountNumber: ?string,
  bounds: Array<FlightPricingBound>,
  emailReceiptTo: string,
  fareRulesWithLinks: ?string,
  fareSummary: FareSummary,
  hasNonRefundable: boolean,
  header: string,
  isRepriceNotification: boolean,
  messages: ?Array<PricingChangeMessage>,
  passengers: Array<ConfirmedPassenger>,
  paymentRequired: boolean,
  priceMessages?: Array<MessageType>,
  recordLocator: string,
  refundRequired: boolean,
  reviewMessages?: Array<MessageType>,
  totals: TotalsType
}

export type ChangeType = {
  evenExchange: boolean,
  upGrade: boolean,
  downGrade: boolean
}

export type ChangeTotalItemType = {
  item: string,
  amount: ?CurrencyType,
  tax: ?CurrencyType
}

export type ChangeTotalsType = {
  changeTotals: Array<ChangeTotalItemType>,
  _meta?: {
    purchaseWithPoints: boolean
  }
}

export type ReturnTravelFunds = {
  returnTravelFunds: ?{
    passengers: Array<string>,
    originalPrice: CurrencyType,
    splitPrice: CurrencyType,
    fundsRemaining: CurrencyType,
    info: string
  }
}

export type FlightChangeRequestDataType = {
  contactMethodInfo: ContactMethodInfo,
  emailReceiptTo: string,
  refundMethod?: string,
  payment?: string,
  paymentInfo: PaymentInfo,
  moneyTotalFare?: ?CurrencyType,
  paymentRequired: boolean,
  shouldSaveAsPrimaryCard: boolean,
  securityCode?: string,
  fundsAppliedToken?: string,
  applePayCard?: ?ApplePayCard
}

export type CarBookingLinkType = {
  _links?: {
    carBooking?: Link
  }
};

export type AirChangeConfirmationPageType = { fareSummary: FareSummary } & FlightConfirmationPageType & ChangeTotalsType & CarBookingLinkType

export type ReaccomConfirmationPageType = {
  dates: ConfirmationDates,
  destinationDescription: string,
  headerMessage: ?MessageType,
  messages: ?Array<MessageType>,
  passengers: Array<ConfirmedPassenger>,
  recordLocator: string,
  bounds: ?Array<FlightPricingBound>,
};

export type AircraftInfoType = {
  aircraftType: string,
  numberOfSeats: number,
  wifiSupported: boolean
}

export type ReaccomReservationType = {
  departureTime: string,
  departureDate: string,
  arrivalTime: string,
  flights: Array<ReaccomFlightInfoType>,
  travelTime: string,
  stops: *,
  stopDescription: string,
  arrivalAirport: *,
  departureAirport: *,
  passengerCount: string,
  boundType: BoundDescriptionType,
  isNextDayArrival: boolean
};

type FlightShoppingReaccomPageLinkType = LinkRequestType & {
  body: {
    shareDataToken: string,
    reaccomProductIds: {
      inbound: ?string,
      outbound: ?string
    }
  }
}

export type ReaccomTransformedProducts = {
  outbound?: FlightPricingBound,
  inbound?: FlightPricingBound
}

export type ReaccomFlightInfoType = {
  number: string,
  aircraftInfo: AircraftInfoType
}

export type ReaccomBoundPageCardType = {
  _meta: {
    cardId: string,
    departureTime: string,
    durationMinutes: number,
    numberOfStops: number,
    reaccomProductId: string
  },
  arrivalTime: string,
  departureTime: string,
  duration: string,
  flights: Array<ReaccomFlightInfoType>,
  isNextDayArrival?: boolean,
  isOvernight?: boolean,
  limitedSeats: ?string,
  reasonIfUnavailable: ?string,
  shortStopDescription?: ?string,
  stopCity?: ?string,
  stopDescription: string,
  stopDescriptionOnSelect: string,
  stops: Array<*>
}

export type ReaccomFlightBoundPageType = {
  messages: ?Array<MessageType>,
  header: {
    airportInfo: string,
    selectedDate: string
  },
  boundType: BoundDescriptionType,
  passengerCount: string,
  departureAirport: DisplayAirport,
  arrivalAirport: DisplayAirport,
  cards: Array<ReaccomBoundPageCardType>
}

export type ReaccomTripSummaryMessage = {
  key: string,
  header: string,
  body: string,
  icon: string,
  textColor: string,
  note: string
}

export type ReaccomShoppingPageType = {
  currentReservation: {
    inbound?: ReaccomReservationType,
    outbound?: ReaccomReservationType
  },
  flights: {
    inboundPage?: ReaccomFlightBoundPageType,
    _links: {
      reaccomConfirmationPage: FlightShoppingReaccomPageLinkType
    },
    _meta?: {
      isCheckedIn?: boolean
    },
    outboundPage?: ReaccomFlightBoundPageType,
  },
  needsEmailAddress?: boolean,
  tripSummaryMessage: Array<ReaccomTripSummaryMessage>,
}

export type ReaccomSelectedProductsType = {
  inbound?: ReaccomSelectedProductInfoType,
  newProducts?: ReaccomTransformedProducts,
  outbound?: ReaccomSelectedProductInfoType
}
export type ReaccomSelectedProductInfoType = {
  fareProductId: string,
  flightCardIndex: number,
  flightProductType: string
}

export type Params = {
  direction: BoundType,
  paxType: PassengerType
};

export type ShoppingPageFromSelectorType = {
  _links: {
    changeShoppingPage?: Link,
    changePricingPage?: Link,
    searchRequest?: SearchRequest,
    reaccomProducts?: Link,
    reaccomConfirmationPage?: Link
  },
  _meta: {
    purchaseWithPoints?: boolean,
    isPromoCodeApplied?: boolean
  },
  adultPassengerCount?: number,
  airportInfo: string,
  boundInfo: string,
  boundSelections: Array<BoundSelection>,
  checkedInNotice: CheckedInNoticeType | {},
  currencyType: CurrencySuit,
  currentReservation: CurrentReservationType,
  departDate?: string,
  destinationAirport: string,
  disclaimerWithLinks?: *,
  flightBoundPageInfo?: ReaccomFlightBoundPageType,
  isChangingFirstBound: boolean,
  isChangingTwoBounds: boolean,
  isOutbound: boolean,
  messages?: Array<MessageType>,
  originAirport: string,
  params: Params,
  promoCodeNotice: string,
  returnDate: string,
  selectedOutboundProductType: string,
  shoppingMessages: Array<MessageType>,
  showSgaMessage: boolean
};

export type ReaccomCoTerminalDatesType = {
  departureEarliestBookableDate: ?Dayjs,
  departureLastBookableDate: ?Dayjs,
  returnEarliestBookableDate: ?Dayjs,
  returnLastBookableDate: ?Dayjs
};

export type SearchOptionsType = {
  departureBoundDisabled: boolean,
  earliestBookableDate?: string,
  lastBookableDate?: string,
  reaccomCoTerminalDates: ReaccomCoTerminalDatesType,
  reaccomCoTerminalDepartureAirports: ?Array<AirportType>,
  reaccomCoTerminalReturnAirports: ?Array<AirportType>,
  returnBoundDisabled: boolean,
  tripType: tripType
};

export type FormDataType = {
  departureAndReturnDate: {
    departureDate: string,
    isInvalidDepartureDate?: boolean,
    isInvalidReturnDate?: boolean,
    returnDate?: string
  },
  from: string,
  to: string
};

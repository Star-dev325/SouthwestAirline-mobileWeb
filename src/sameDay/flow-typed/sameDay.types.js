// @flow
import type { BoundSelection } from 'src/shared/flow-typed/boundSelect.types';
import type { CurrentReservationType } from 'src/airChange/flow-typed/airChange.types';
import type { ExpandedDetails, FlightProductCurrencyType, FlightDetailsResponse, FlightPricingBound, FlightProductCard } from 'src/shared/flow-typed/shared.types';
import type { CancelStandbyListing } from 'src/standby/flow-typed/standby.types';

type Meta = {
  showBoundSelection: boolean
}

type SameDayShoppingRequestBody = {
  boundReference?: string,
  recordLocator?: string,
  sameDayToken?: string,
  standbyToken?: string
}

export type SameDayShoppingRequest = {
  body: SameDayShoppingRequestBody,
  href: string,
  method: HttpMethod
}

type Links = {
  sameDayShopping: SameDayShoppingRequest
}

export type ViewForSameDayPage = {
  boundSelectionMessage: string,
  boundSelections: Array<BoundSelection>,
  _links: Links,
  _meta: Meta
}

export type sameDaySelectionBoundData = {
  firstbound: boolean,
  secondbound: boolean
}

export type SameDayShopping = {
  sameDayFlightDetails?: FlightDetailsResponse,
  sameDayShoppingInformation: SameDayShoppingInformation
}

type Header = {
  airportInfo: string,
  destinationAirport: string,
  flightType: string,
  originAirport: string
}

type _Links = {
  sameDayPricing?: SameDayPricingRequest,
  viewReservationViewPage?: ViewReservationPageRequest
}

type SameDayShoppingBody = {
  flightIdentifier?: string,
  boundReference?: string,
  productId?: string,
  sameDayToken: string
}

export type sameDayPriceDetails = {
  changeText?: ?string,
  label?: ?string,
  standbyTextLabel?: ?string,
  standbyUnavailableTextLabel?: ?string,
  startingPriceDifference?: ?FlightProductCurrencyType,
  startingPriceDiffPointsTax?: ?FlightProductCurrencyType
}

export type PriceDetails = {
  label?: ?string,
  startingFromPriceDifference?: ?FlightProductCurrencyType,
  startingFromPriceDiffPointsTax?: ?FlightProductCurrencyType
}

export type ConfirmBaggageMessage = {
  body: string,
  header: string,
  icon: string,
  key: string,
  textColor: string
}

type ProductDefinitions = {
  disclaimers: DisclaimersItem[],
  highlightedFeatures: HighlightedFeaturesItem[],
  products: ProductsItem[]
}

type ProductsItem = {
  features: FeaturesItem[],
  id: string,
  inverseThemeHexColor: string | null,
  label: string,
  primaryThemeColor: string,
  primaryThemeHexColor: string | null,
  productId: string,
  rowOrder: number,
  stylizedLabel: null | StylizedLabelItem[]

}

type FeaturesItem = {
  icon: string | null,
  label: string,
  suffix: string | null
}

type StylizedLabelItem = {
  font: string | null,
  inverseLabelColor: string,
  label: string,
  primaryLabelColor: string
}

type HighlightedFeaturesItem = {
  icon: string,
  label: string,
  suffix: string
}

type DisclaimersItem = {
  icon: string | null,
  label: string,
  suffix: string | null
}

export type SameDayPricingRequest = {
  href: string,
  method: HttpMethod,
  body: SameDayShoppingBody
}

export type ViewReservationPageRequest = {
  body: SameDayShoppingBody,
  href: string,
  method: HttpMethod
}

export type SameDayConfirmationBody = {
  boundReference?: string | null,
  boundSelection?: string | null,
  changeJourneyConfirmToken?: string,
  labelText?: string,
  payment?: {
    fundToken?: string,
    moneyTotalFare?: {
      amount: string,
      currencyCode: string,
      currencySymbol?: ?string,
      sign?: string,
      item?: string,
    },
    newCreditCard?: {
      billingContactInfo?: {
        firstName: string,
        lastName: string,
        address: {
          addressLine1: string,
          addressLine2: string,
          city: string,
          stateProvinceRegion: string,
          zipOrPostalCode: string,
          isoCountryCode: string
        },
        phoneNumber: string
      },
      creditCardType: string,
      cardNumber: string,
      digitalPaymentType: 'APPLE_PAY',
      expiration: string,
      isPrimary: boolean,
      intentToStore: true,
      securityCode: string
    },
    paypal?: {
      paypalToken: string
    },
    savedCreditCard?: {
      intentToStore: boolean,
      securityCode?: ?string,
      savedCreditCardId: string
    },
    savedCreditCardSelected?: boolean
  },
  productId?: string,
  recipientEmail?: string,
  refundMethod?: string,
  sameDayToken: string,
}

export type SameDayCancellationBody = {
  standbyToken: string
}

export type SameDayConfirmationRequest = {
  body: SameDayConfirmationBody,
  href: string,
  method: HttpMethod,
  xhref: string,
}

export type SameDayCancellation = {
  body: SameDayCancellationBody,
  href: string,
  method: HttpMethod,
}

export type SameDayShoppingInformation = {
  _links: _Links,
  _meta: ShoppingPageMeta,
  appliedSortAndFilterData?: appliedSortAndFilterData,
  cards: FlightProductCard[],
  confirmBaggageMessage: ConfirmBaggageMessage | null,
  currentReservation: CurrentReservationType,
  expandedDetails: ExpandedDetails,
  flightListText: string,
  header: Header,
  productDefinitions: ProductDefinitions,
  shoppingDisclaimers?: Array<ShoppingDisclaimer>,
  standbyBaggageMessage: StandbyBaggageMessage | null,
  standbyListFAQs?: standbyListFaq
}

type ShoppingPageMeta = {
  purchaseWithPoints: boolean
}

export type StandbyBaggageMessage = {
  body: string,
  dismissLabelText: string,
  header: null,
  icon: string,
  key: string,
  labelText: string,
  textColor: string
}

export type ShoppingDisclaimer = {
  icon?: string | null,
  label?: string | null
}

export type SameDayPricingPage = {
  _links: ConfirmationLinks,
  currentFlight: FlightCard,
  fareSummary: FareSummary,
  message: Message,
  recipientEmail?: string,
  selectedFlight: FlightCard,
  showEmailReceiptTo?: boolean
}

type Message = {
  body: string,
  header: string,
  icon: string,
  key: string,
  textColor: string
}

type PassengersItem = {
  accountNumber: string | null,
  name: string
}

export type FlightCard = {
  arrivesTime: string,
  date: string,
  departsTime: string,
  flightNumbers: string,
  fromAirportCode: string,
  isNextDayArrival?: ?boolean,
  isOvernight?: ?boolean,
  labelDescription: string,
  passengers: PassengersItem[],
  toAirportCode: string
}

export type FareSummary = {
  amountDue?: AmountDue,
  creditDue?: AmountDue,
  creditInfoMessage?: null | string,
  isPaymentRequired: boolean,
  isPointsBooking: boolean,
  refundMessage?: string | null,
  taxesAndFeesWithLinks: null | string
}

export type AmountDue = {
  amount?: string,
  currencyCode?: string,
  currencySymbol?: ?string,
  fare?: {
    amount: string,
    currencyCode: string,
    currencySymbol?: ?string,
    item?: string,
    sign?: string,
  },
  item?: string,
  itemTotalLabel?: string,
  tax?: {
    amount: string,
    currencyCode: string,
    currencySymbol?: ?string,
    item?: string,
    sign?: string,
  }
}

type ConfirmationLinks = {
  cancelStandbyListing?: CancelStandbyListing,
  sameDayConfirmation?: SameDayConfirmationLink,
  sameDayConfirmationRefund?: SameDayConfirmationRefundRequest,
}

export type SameDayConfirmationLink = {
  body: SameDayConfirmationBody,
  href: string,
  labelText: string,
  method: HttpMethod,
  xhref: string
}

export type FareSummaryConfirmation = {
  amount: string,
  currencySymbol?: ?string,
  currencyCode: string,
  item: string,
}
export type TotalCreditConfirmation = {
  amount: string,
  currencySymbol?: ?string,
  currencyCode: string,
  item?: string | boolean,
}
type ViewBoardingPositionsBody = {
  firstName: string,
  lastName: string,
  passengerSearchToken: string,
  recordLocator: string
}
type ViewBoardingPositionsList = {
  href: string,
  method: HttpMethod,
  body: ViewBoardingPositionsBody,
  labelText: string
}
type EnhancedStandbyList = {
  href: string,
  method: HttpMethod,
  body: SameDayShoppingRequestBody,
  labelText: string
}

type ContactInfoDetails = {
  details: string,
  method: string
}

type HeaderMessage = {
    backgroundColor: string,
    body: string,
    header: string,
    icon: string,
    key: string,
    textColor: string
}

export type SameDayConfirmationResponse = {
  _links: {
    enhancedStandbyList: ?EnhancedStandbyList,
    viewBoardingPositions: ?ViewBoardingPositionsList
  },
   bounds: Array<FlightPricingBound>,
   contactInfo: ContactInfoDetails,
   fareSummary: {
      creditInfoMessage?: string | null,
      refundMessage?: string | null,
      taxesAndFeesWithLinks?: string | null,
      total?: FareSummaryConfirmation,
      totalCredit?: TotalCreditConfirmation,
      totalCreditPointsTax?: FareSummaryConfirmation,
      totalPointsTax?: FareSummaryConfirmation
    },
    headerMessage: HeaderMessage,
    sameDayLabelDescription?: string
}

export type PassengerRequestDetailsType = {
  firstName: string,
  lastName: string,
  recordLocator: string
}

export type SameDayConfirmationRefundRequest = {
  body: SameDayConfirmationBody,
  href: string,
  labelText?: string,
  method: HttpMethod,
  xhref: string
}

export type ChangeType = {
  downgrade?: boolean,
  evenExchange?: boolean,
  upgrade?: boolean
}

export type sameDayRefundPageType = {
  _links: RefundLinks,
  fareSummary: ?FareSummary,
  selectedFlight?: ?SelectedFlight,
  showRefundableSelection: boolean,
  showRefundPage?: boolean,
}

export type SelectedFlight = {
  arrivesTime: ?string,
  date: ?string,
  departsTime: ?string,
  flightNumbers: ?string,
  fromAirportCode: string,
  labelDescription: ?string,
  passengers: ?PassengersItem[],
  toAirportCode: string
}

type RefundLinks = {
  cancelStandbyListing?: CancelStandbyListing,
  sameDayConfirmation: SameDayRefundConfirmation
}

type SameDayRefundConfirmation = {
  body: SameDayRefundConfirmationBody,
  href: string,
  labelText: string,
  method: HttpMethod,
  xhref: string
}

type SameDayRefundConfirmationBody = {
  boundReference?: string | null,
  boundSelection?: string | null,
  changeJourneyConfirmToken?: string,
  labelText?: string,
  payment?: {
    fundToken?: string,
    moneyTotalFare?: {
      amount: string,
      currencyCode: string,
      currencySymbol?: ?string,
      sign?: string,
      item?: string,
    },
    newCreditCard?: {
      billingContactInfo?: {
        address: {
          addressLine1: string,
          addressLine2: string,
          city: string,
          isoCountryCode: string,
          stateProvinceRegion: string,
          zipOrPostalCode: string
        },
        firstName: string,
        lastName: string,
        phoneNumber: string
      },
      cardNumber: string,
      creditCardType: string,
      digitalPaymentType: 'APPLE_PAY',
      expiration: string,
      intentToStore: true,
      isPrimary: boolean,
      securityCode: string
    },
    paypal?: {
      paypalToken: string
    },
    savedCreditCard?: {
      intentToStore: boolean,
      savedCreditCardId: string,
      securityCode?: ?string
    },
    savedCreditCardSelected?: boolean
  },
  productId?: string,
  recipientEmail?: string,
  refundMethod?: string,
  sameDayToken: string,
}

type ActionType = {
  type: string, 
  value: string | null
};

export type ButtonType = {
  action: ActionType,
  buttonText: string,
  type: string | null,
};

export type ModalInfoType = {
  icon: string | null,
  text: string
};

export type ModalDetailsType = {
  buttons?: Array<ButtonType>,
  infoList?: Array<ModalInfoType>,
  title: string | null,
};

export type standbyListFaq = {
  linkIcon: string | null,
  linkPrefixText: string | null,
  linkSuffixClickableText: string | null,
  modalDetails: ModalDetailsType
};

export type appliedSortAndFilterData = {
  Confirmed?: boolean,
  Nonstop?: boolean,
  sortby?: string | null,
  Standby?: boolean,
};
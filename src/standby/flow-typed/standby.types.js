// @flow

export type StandbyListPageType = {
  _links: StandbyLinks,
  cancelStandbyListingMessage?: CancelStandbyListingMessageType,
  disclaimerText?: string | null,
  disclaimerWithLinks?: string | null,
  faqWithLinks: string,
  header: StandbyHeaderType | null,
  seatsAvailableText: string | null,
  standbyList: Array<StandbyListItem>
}

export type StandbyHeaderType = {
  arrivalTime: string,
  date: string,
  departureTime: string,
  destinationDescription: string,
  flightNumber: string,
  from: string,
  hasWifi: boolean,
  to: string
}

type StandbyListItem = {
  displayName: string,
  isConfirmed: boolean,
  isPnrPassenger: boolean,
  number: string
}

type CancelStandbyListingMessageType = {
  body: string,
  header: string,
  icon: string,
  key: string,
  textColor: string
}

type StandbyLinks = {
  cancelBound?: ?StandbyCancelBound,
  cancelStandbyListing?: ?CancelStandbyListing,
  standbyListPolicies: StandbyListPolicies
}

type StandbyListPolicies = {
  href: string,
  method: string
}

type StandbyCancelBound = {
  body?: any,
  href: string,
  labelText?: string,
  method: HttpMethod,
  query?: StandbyCancelBoundQuery,
  xhref?: string,
  xphref?: string
}

type StandbyCancelBoundQuery = {
  "passenger-search-token": string
}

export type CancelStandbyListing = {
  body: Body,
  href: string,
  labelText: string,
  method: HttpMethod,
}

type Body = {
  standbyToken: string
}

export type cancelConfirmationStandbyType = {
  _links: _Links,
  headerMessage: HeaderMessage,
  standbyFlight: StandbyFlight
}

type _Links = {
  sameDayUpdates: ?SameDayUpdatesType,
  standbyListPolicies: null
}

export type SameDayUpdatesType = {
  body: SameDayUpdatesBody,
  href: string,
  labelText: string,
  method: string
}

type SameDayUpdatesBody = {
  passengerSearchToken: string
}

type HeaderMessage = {
  backgroundColor: string,
  body: string,
  header: string,
  icon: string,
  key: string,
  textColor: string
}

export type StandbyFlight = {
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

type PassengersItem = {
  accountNumber: string | null,
  name: string
}

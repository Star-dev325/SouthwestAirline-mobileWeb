// @flow

export type SearchFormData = {
  originAirport: string,
  destinationAirport: string,
  selectedDate: string,
  flightNumber?: *
};

type Header = {
  date: string,
  from: string,
  to: string,
  tripDescription: string
};

export type FlightSchedulesPageType = {
  flights: ?Array<FlightCardType>,
  header: ?Header
};

export type FlightInfo = {
  actualTime: string,
  airport: string,
  gate: string,
  isNextDay?: boolean,
  isOvernight?: boolean,
  originalTime: string,
  status: string,
  statusType: string
};

export type AircraftInfo = {
  aircraftType?: string
};

export type Leg = {
  flightNumber: string,
  isNowBoarding: boolean,
  arrival: FlightInfo,
  departure: FlightInfo,
  aircraftInfo?: AircraftInfo
};

export type FlightCard = {
  legs: Array<Leg>
};

export type FlightStatusDetailsPageType = {
  flightCards: ?Array<FlightCard>,
  header: ?Header,
  shareDetails: ?*
};

export type FlightDetailsWithFlightKeysQueryType = {
  'flight-keys': string
};

export type FlightDetailsQueryType = {
  'departure-date': string,
  'destination-airport1': string,
  'destination-airport2'?: string,
  'flight-keys'?: string, 
  'flight-number1': string,
  'flight-number2'?: string,
  'origin-airport1': string,
  'origin-airport2'?: string
};

export type ScheduleSearchType = {
  date: string,
  departureDate?: string,
  destinationAirportCode?: string,
  flightNumber?: string,
  from: string,
  originationAirportCode?: string,
  to: string
}
export type FlightSearchType = {
  connectingAirportCode?: string,
  date: string,
  flightKeys?: string,
  flightNumber: string,
  from: string,
  secondFlightNumber?: string,
  to: string
}

export type RecentSearchRequestType =
  ScheduleSearchType | FlightSearchType

export type FlightCardType = {
  flightNumbers: Array<string>,
  arrivesNextDay: boolean,
  isOvernight?: boolean,
  departsTime: string,
  arrivesTime: string,
  stopDescription: string,
  _links: {
    flightStatusDetail: Link
  }
}

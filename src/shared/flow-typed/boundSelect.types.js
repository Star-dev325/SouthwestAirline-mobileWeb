// @flow
export type BoundSelection = {
  alternateReaccomDestinationAirportCodes?: Array<string>,
  alternateReaccomOriginationAirportCodes?: Array<string>,
  boundFlown?: boolean,
  boundReference: string,
  flight: string,
  flightType: string,
  fromAirport: string,
  fromAirportCode: string,
  hasInactiveBags: boolean,
  isSelectable: boolean,
  multiSelectShoppingDates?: ShoppingDatesType,
  originalDate: string,
  productId?: string,
  shoppingDates?: ShoppingDatesType,
  showWarningIcon?: boolean,
  timeArrives: string,
  timeDeparts: string,
  toAirport: string,
  toAirportCode: string
}

type ShoppingDatesType = {
  beginShoppingDate: string,
  endShoppingDate: string
}

export type SelectedBounds = {
  firstbound: boolean,
  secondbound?: boolean
}
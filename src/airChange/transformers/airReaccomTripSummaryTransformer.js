// @flow
import _ from 'lodash';
import type { ReaccomFlightBoundPageType, ReaccomBoundPageCardType } from 'src/airChange/flow-typed/airChange.types';
import type { FareProduct } from 'src/shared/flow-typed/shared.types';

export const transformToFlightSummary = (boundPage: ReaccomFlightBoundPageType, card: ReaccomBoundPageCardType | FareProduct) => ({
  boundType: _.get(boundPage, 'boundType'),
  flights: _.get(card, 'flights', []),
  travelTime: _.get(card, 'duration'),
  departureDate: _.get(boundPage, 'header.selectedDate'),
  departureTime: _.get(card, 'departureTime'),
  departureAirport: _.get(boundPage, 'departureAirport'),
  arrivalTime: _.get(card, 'arrivalTime'),
  arrivalAirport: _.get(boundPage, 'arrivalAirport'),
  stops: _.get(card, 'stops', []),
  isNextDayArrival: _.get(card, 'isNextDayArrival'),
  passengerCount: _.get(boundPage, 'passengerCount')
});

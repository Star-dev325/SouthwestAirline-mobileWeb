// @flow
import { formatDate } from 'src/shared/helpers/dateHelper';

import type {
  FlightBoundMultiSelectSearchRequest,
  MultiSelectGroupSearchRequest
} from 'src/airBooking/flow-typed/airBooking.types';

export const transformToMultiSelectGroupRequest = (searchRequestData: FlightBoundMultiSelectSearchRequest): Link => {
  let departureDate = '';
  let returnDate = '';

  const dateFormat = 'YYYY-MM-DD';

  if (searchRequestData.departureDate && searchRequestData.returnDate) {
    departureDate = formatDate(searchRequestData.departureDate, dateFormat);
    returnDate = formatDate(searchRequestData.returnDate, dateFormat);
  } else if (searchRequestData.departureDate) {
    departureDate = formatDate(searchRequestData.departureDate, dateFormat);
  } else if (searchRequestData.returnDate) {
    departureDate = formatDate(searchRequestData.returnDate, dateFormat);
  }

  const apiRequest: MultiSelectGroupSearchRequest = {
    originationAirport: searchRequestData.origin ? searchRequestData.origin : '',
    destinationAirport: searchRequestData.destination ? searchRequestData.destination : '',
    numberAdultPassengers: searchRequestData.numberOfAdults ? searchRequestData.numberOfAdults : 0,
    currency: searchRequestData.currencyType,
    departureDate: departureDate
  };

  if (searchRequestData.multipleOriginationAirportGroupName) {
    apiRequest['multipleOriginationAirportGroupName'] = searchRequestData.multipleOriginationAirportGroupName;
    apiRequest['multipleOriginationAirports'] = searchRequestData.multipleOriginationAirports;
    delete apiRequest['originationAirport'];
  }

  if (searchRequestData.multipleDestinationAirportGroupName) {
    apiRequest['multipleDestinationAirportGroupName'] = searchRequestData.multipleDestinationAirportGroupName;
    apiRequest['multipleDestinationAirports'] = searchRequestData.multipleDestinationAirports;
    delete apiRequest['destinationAirport'];
  }

  if (searchRequestData.promoCode) {
    apiRequest['promoCode'] = searchRequestData.promoCode;
  }

  if (returnDate) {
    apiRequest['returnDate'] = returnDate;
  }

  if (searchRequestData.numberOfLapInfants) {
    apiRequest['numberLapInfantPassengers'] = searchRequestData.numberOfLapInfants;
  }

  return {
    href: '',
    method: 'POST',
    body: apiRequest
  };
};

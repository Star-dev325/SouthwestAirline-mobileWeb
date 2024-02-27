// @flow

import type { RecentSearchRequestType } from 'src/flightStatus/flow-typed/flightStatus.types';

import dayjs from 'dayjs';

export const transformToFlightSearchRequest = (
  originAirportCode: string,
  destinationAirportCode: string,
  searchDate: ?string,
  flightNumber?: string
): RecentSearchRequestType => {
  const today = dayjs();

  return {
    from: originAirportCode,
    to: destinationAirportCode,
    date: searchDate || today.format('YYYY-MM-DD'),
    flightNumber
  };
};

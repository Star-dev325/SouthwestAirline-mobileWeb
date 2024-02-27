// @flow

import dayjs from 'dayjs';
import { DOLLAR, POINTS, WAPI_POINTS } from 'src/shared/constants/currencyTypes';
import { MEDIUM_DATE_FORMAT } from 'src/shared/constants/dateConstants';
import TripTypes from 'src/shared/constants/tripTypes';
import { changeDateFormat } from 'src/shared/helpers/dateHelper';
import { cloneDeep } from 'src/shared/helpers/jsUtils';
import { isOnOldRoute } from 'src/shared/helpers/urlHelper';

import type { FlightProductSearchRequest, ShoppingLandingPageQuery } from 'src/airBooking/flow-typed/airBooking.types';

const { ROUND_TRIP, ONE_WAY } = TripTypes;

export const defaultSearchRequest = {
  departureDate: dayjs().add(1, 'day').format(MEDIUM_DATE_FORMAT),
  returnDate: dayjs().add(4, 'day').format(MEDIUM_DATE_FORMAT),
  origin: undefined,
  destination: undefined,
  tripType: ROUND_TRIP.value,
  currencyType: DOLLAR,
  isRoundTrip: true,
  numberOfAdults: 1,
  promoCode: '',
  adultPassengersCount: 1,
  lapInfantPassengersCount: 0
};

export const getSearchRequestFromQuery = (query: ShoppingLandingPageQuery): FlightProductSearchRequest => {
  const formatTripType = (tripType) => (tripType === ONE_WAY.queryParamKey ? ONE_WAY.value : ROUND_TRIP.value);
  const isRoundTrip = query.tripType !== ONE_WAY.queryParamKey;
  const getFareType = (fareType: string) => {
    const lowerCasedFareType = fareType.toLowerCase();
    const shouldReturnPointsType = lowerCasedFareType === WAPI_POINTS.toLowerCase() || lowerCasedFareType === POINTS.toLowerCase();

    return shouldReturnPointsType ? POINTS : DOLLAR;
  };
  const departureDate = query.departureDate ?? changeDateFormat(query.departDate ?? dayjs().add(1, 'day'), 'MM/DD/YYYY', MEDIUM_DATE_FORMAT);

  const queryParams = {
    adultPassengersCount: query.adultPassengersCount ? parseInt(query.adultPassengersCount) : 1,
    currencyType: query.fareType ? getFareType(query.fareType) : DOLLAR,
    departureDate,
    destination: query.destinationAirportCode,
    isRoundTrip,
    lapInfantPassengersCount: query.lapInfantPassengersCount ? parseInt(query.lapInfantPassengersCount) : 0,
    numberOfAdults: query.numberOfAdults ? parseInt(query.numberOfAdults) : 1,
    numberOfLapInfants: query.numberOfLapInfants ? parseInt(query.numberOfLapInfants) : 0,
    origin: query.originationAirportCode,
    promoCode: query.promoCode ?? '',
    returnDate: isRoundTrip 
      ? (query.returnDate ?? dayjs(departureDate).add(3, 'day').format(MEDIUM_DATE_FORMAT)) 
      : undefined,
    tripType: formatTripType(query.tripType),
    useLowFareCalendar: query.useLowFareCalendar ? 'true' === query.useLowFareCalendar : false
  };

  const oldQueryParams = {
    adultPassengersCount: query.adultPassengersCount ? parseInt(query.adultPassengersCount) : 1,
    currencyType: query.currencyType ? query.currencyType : DOLLAR,
    departureDate,
    destination: query.toCity,
    isRoundTrip,
    lapInfantPassengersCount: query.lapInfantPassengersCount ? parseInt(query.lapInfantPassengersCount) : 0,
    numberOfAdults: query.numberOfAdults ? parseInt(query.numberOfAdults) : 1,
    numberOfLapInfants: query.numberOfLapInfants ? parseInt(query.numberOfLapInfants) : 0,
    origin: query.fromCity,
    promoCode: query.promoCode ?? '',
    returnDate: isRoundTrip 
      ? (query.returnDate ? dayjs(query.returnDate).format(MEDIUM_DATE_FORMAT) : dayjs(departureDate).add(3, 'day').format(MEDIUM_DATE_FORMAT)) 
      : undefined,
    tripType: formatTripType(query.tripType),
    useLowFareCalendar: query.useLowFareCalendar ? 'true' === query.useLowFareCalendar : false
  };

  return isOnOldRoute() ? oldQueryParams : queryParams;
};

export const addDefaultValueOnSearchRequest = (
  searchRequest: FlightProductSearchRequest
): FlightProductSearchRequest => {
  const result = cloneDeep(searchRequest);
  const defaultCurrencyType = DOLLAR;

  result.tripType = result.tripType || ONE_WAY.value;
  result.isRoundTrip = result.tripType === ROUND_TRIP.value;
  result.numberOfAdults = result.numberOfAdults ?? 1;
  result.numberOfLapInfants = result.numberOfLapInfants ?? 0;
  result.adultPassengersCount = result.adultPassengersCount ?? 1;
  result.lapInfantPassengersCount = result.lapInfantPassengersCount ?? 0;
  result.promoCode = result.promoCode || '';
  result.currencyType = result.currencyType || defaultCurrencyType;
  result.useLowFareCalendar = result.useLowFareCalendar ? true : false;

  if (result.tripType === ROUND_TRIP.value && result.departureDate && !result.returnDate) {
    result.returnDate = dayjs(result.departureDate).add(3, 'days').format(MEDIUM_DATE_FORMAT);
  } else if (result.tripType === ONE_WAY.value) {
    result.returnDate = undefined;
  }

  return result;
};

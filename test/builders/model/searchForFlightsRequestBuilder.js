// @flow
import type { FlightProductSearchRequest } from 'src/airBooking/flow-typed/airBooking.types';

type currencyTypeDefine = 'Dollars' | 'Points' | 'USD' | 'PTS';

class FlightProductSearchRequestBuilder {
  searchRequest: FlightProductSearchRequest;

  constructor(
    numberOfAdults: number = 1,
    numberOfSeniors: number = 0,
    numberOfLapInfants: number = 0,
    currencyType: currencyTypeDefine = 'USD',
    tripType: 'oneWay' | 'roundTrip' = 'roundTrip',
    isRoundTrip: boolean = true,
    useLowFareCalendar: boolean = false
  ) {
    this.searchRequest = {
      origin: 'ATL',
      destination: 'AUS',
      tripType,
      departureDate: '2015-11-10',
      returnDate: '2015-12-10',
      numberOfAdults,
      numberOfSeniors,
      numberOfLapInfants,
      currencyType,
      isRoundTrip,
      useLowFareCalendar,
      isInitialSearch: true
    };
  }

  build(): FlightProductSearchRequest {
    return this.searchRequest;
  }

  withOneWay(): FlightProductSearchRequestBuilder {
    this.searchRequest = {
      origin: 'ATL',
      destination: 'AUS',
      tripType: 'oneWay',
      departureDate: '2015-11-10',
      returnDate: undefined,
      numberOfAdults: 1,
      numberOfSeniors: 0,
      currencyType: 'USD',
      isRoundTrip: false
    };

    return this;
  }

  withLowFareCalendar(useLFC: boolean): FlightProductSearchRequestBuilder {
    this.searchRequest.useLowFareCalendar = useLFC;

    return this;
  }

  withOrigin(origin: string): FlightProductSearchRequestBuilder {
    this.searchRequest.origin = origin;

    return this;
  }

  withDestination(destination: string): FlightProductSearchRequestBuilder {
    this.searchRequest.destination = destination;

    return this;
  }

  withReturnDate(returnDate?: string): FlightProductSearchRequestBuilder {
    this.searchRequest.returnDate = returnDate;

    return this;
  }

  withDepartureDate(departureDate: string): FlightProductSearchRequestBuilder {
    this.searchRequest.departureDate = departureDate;

    return this;
  }

  withPromoCode(promoCode: string = 'SuperPromoCode'): FlightProductSearchRequestBuilder {
    this.searchRequest.promoCode = promoCode;

    return this;
  }

  withCurrencyType(currencyType: currencyTypeDefine = 'USD'): FlightProductSearchRequestBuilder {
    this.searchRequest.currencyType = currencyType;

    return this;
  }

  withNumberOfAdults(numberOfAdults: number = 1): FlightProductSearchRequestBuilder {
    this.searchRequest.numberOfAdults = numberOfAdults;

    return this;
  }

  withTripType(tripType: 'oneWay' | 'roundTrip'): FlightProductSearchRequestBuilder {
    this.searchRequest.tripType = tripType;

    return this;
  }
}

export default FlightProductSearchRequestBuilder;

jest.mock('src/shared/helpers/urlHelper', () => ({
  isOnOldRoute: jest.fn().mockReturnValue(true)
}));

import {
  addDefaultValueOnSearchRequest,
  getSearchRequestFromQuery
} from 'src/airBooking/helpers/shoppingLandingPageHelper';
import * as urlHelper from 'src/shared/helpers/urlHelper';
import dayjs from 'dayjs';
import SearchForFlightsRequestBuilder from 'test/builders/model/searchForFlightsRequestBuilder';

describe('shoppingLandingPageHelper', () => {
  describe('getSearchRequestFromQuery', () => {
    it('should return the search request from url empty query', () => {
      const query = {};
      const searchRequest = getSearchRequestFromQuery(query);

      expect(searchRequest).toEqual({
        adultPassengersCount: 1,
        currencyType: 'USD',
        departureDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
        destination: undefined,
        isRoundTrip: true,
        lapInfantPassengersCount: 0,
        numberOfAdults: 1,
        numberOfLapInfants: 0,
        origin: undefined,
        promoCode: '',
        returnDate: dayjs().add(4, 'day').format('YYYY-MM-DD'),
        tripType: 'roundTrip',
        useLowFareCalendar: false
      });
    });
    
    it('should return the search request from the url query', () => {
      const query = {
        adultPassengersCount: 1,
        currencyType: 'PTS',
        departDate: '01/01/2017',
        fromCity: 'DAL',
        lapInfantPassengersCount: 1,
        numberOfAdults: 3,
        numberOfLapInfants: 1,
        promoCode: 'ABCDE',
        returnDate: '01/04/2017',
        toCity: 'MDW',
        tripType: 'RT',
        useLowFareCalendar: 'true'
      };

      const searchRequest = getSearchRequestFromQuery(query);

      expect(searchRequest).toEqual({
        adultPassengersCount: 1,
        currencyType: 'PTS',
        departureDate: '2017-01-01',
        destination: 'MDW',
        isRoundTrip: true,
        lapInfantPassengersCount: 1,
        numberOfAdults: 3,
        numberOfLapInfants: 1,
        origin: 'DAL',
        promoCode: 'ABCDE',
        returnDate: '2017-01-04',
        tripType: 'roundTrip',
        useLowFareCalendar: true
      });
    });

    it('should return the search request from the url query when currency is dollars', () => {
      const query = {
        currencyType: 'USD',
        departDate: '01/01/2017',
        fromCity: 'DAL',
        numberOfAdults: '3',
        promoCode: 'ABCDE',
        returnDate: '01/04/2017',
        toCity: 'MDW',
        tripType: 'RT',
        useLowFareCalendar: 'true'
      };

      const searchRequest = getSearchRequestFromQuery(query);

      expect(searchRequest).toEqual({
        adultPassengersCount: 1,
        currencyType: 'USD',
        departureDate: '2017-01-01',
        destination: 'MDW',
        isRoundTrip: true,
        lapInfantPassengersCount: 0,
        numberOfAdults: 3,
        numberOfLapInfants: 0,
        origin: 'DAL',
        promoCode: 'ABCDE',
        returnDate: '2017-01-04',
        tripType: 'roundTrip',
        useLowFareCalendar: true
      });
    });

    it('should return the search request from the url query when RT and returnDate omitted', () => {
      const query = {
        adultPassengersCount: 0,
        currencyType: 'PTS',
        departDate: '01/01/2017',
        fromCity: 'DAL',
        lapInfantPassengersCount: 0,
        numberOfAdults: '3',
        toCity: 'MDW',
        tripType: 'RT',
        useLowFareCalendar: 'true'
      };

      const searchRequest = getSearchRequestFromQuery(query);

      expect(searchRequest).toEqual({
        adultPassengersCount: 1,
        currencyType: 'PTS',
        departureDate: '2017-01-01',
        destination: 'MDW',
        isRoundTrip: true,
        lapInfantPassengersCount: 0,
        numberOfAdults: 3,
        numberOfLapInfants: 0,
        origin: 'DAL',
        promoCode: '',
        returnDate: '2017-01-04',
        tripType: 'roundTrip',
        useLowFareCalendar: true
      });
    });

    it('should return the search request from the url query when oneway', () => {
      const query = {
        currencyType: 'PTS',
        departDate: '01/01/2017',
        fromCity: 'DAL',
        numberOfAdults: '3',
        toCity: 'MDW',
        tripType: 'OW',
        useLowFareCalendar: 'true'
      };

      const searchRequest = getSearchRequestFromQuery(query);

      expect(searchRequest).toEqual({
        adultPassengersCount: 1,
        currencyType: 'PTS',
        departureDate: '2017-01-01',
        destination: 'MDW',
        isRoundTrip: false,
        lapInfantPassengersCount: 0,
        numberOfAdults: 3,
        numberOfLapInfants: 0,
        origin: 'DAL',
        promoCode: '',
        returnDate: undefined,
        tripType: 'oneWay',
        useLowFareCalendar: true
      });
    });

    it('should return the search request from the url query when useLowFareCalendar is false', () => {
      const query = {
        currencyType: 'PTS',
        departDate: '01/01/2017',
        fromCity: 'DAL',
        numberOfAdults: '3',
        promoCode: '',
        returnDate: '01/04/2017',
        toCity: 'MDW',
        tripType: 'RT',
        useLowFareCalendar: 'false'
      };

      const searchRequest = getSearchRequestFromQuery(query);

      expect(searchRequest).toEqual({
        adultPassengersCount: 1,
        currencyType: 'PTS',
        departureDate: '2017-01-01',
        destination: 'MDW',
        isRoundTrip: true,
        lapInfantPassengersCount: 0,
        numberOfAdults: 3,
        numberOfLapInfants: 0,
        origin: 'DAL',
        promoCode: '',
        returnDate: '2017-01-04',
        tripType: 'roundTrip',
        useLowFareCalendar: false
      });
    });

    it('should return the search request from the url query when useLowFareCalendar is omitted', () => {
      const query = {
        currencyType: 'PTS',
        departDate: '01/01/2017',
        fromCity: 'DAL',
        numberOfAdults: '3',
        returnDate: '01/04/2017',
        toCity: 'MDW',
        tripType: 'RT'
      };

      const searchRequest = getSearchRequestFromQuery(query);

      expect(searchRequest).toEqual({
        adultPassengersCount: 1,
        currencyType: 'PTS',
        departureDate: '2017-01-01',
        destination: 'MDW',
        isRoundTrip: true,
        lapInfantPassengersCount: 0,
        numberOfAdults: 3,
        numberOfLapInfants: 0,
        origin: 'DAL',
        promoCode: '',
        returnDate: '2017-01-04',
        tripType: 'roundTrip',
        useLowFareCalendar: false
      });
    });

    it('should return the search request from the url query when number of adults is omitted', () => {
      const query = {
        currencyType: 'PTS',
        departDate: '01/01/2017',
        fromCity: 'DAL',
        returnDate: '01/04/2017',
        toCity: 'MDW',
        tripType: 'RT',
        useLowFareCalendar: 'true'
      };

      const searchRequest = getSearchRequestFromQuery(query);

      expect(searchRequest).toEqual({
        adultPassengersCount: 1,
        currencyType: 'PTS',
        departureDate: '2017-01-01',
        destination: 'MDW',
        isRoundTrip: true,
        lapInfantPassengersCount: 0,
        numberOfAdults: 1,
        numberOfLapInfants: 0,
        origin: 'DAL',
        promoCode: '',
        returnDate: '2017-01-04',
        tripType: 'roundTrip',
        useLowFareCalendar: true
      });
    });

    it('should return the search request from the url query when normalized', () => {
      urlHelper.isOnOldRoute.mockReturnValue(false);
      const query = {
        adultPassengersCount: 4,
        departureDate: '06-03-2023',
        destinationAirportCode: 'DEN',
        fareType: 'PTS',
        lapInfantPassengersCount: 3,
        originationAirportCode: 'DAL',
        promoCode: 'alteap20',
        returnDate: '07-03-2023',
        useLowFareCalendar: 'false'
      };

      const searchRequest = getSearchRequestFromQuery(query);

      expect(searchRequest).toEqual({
        adultPassengersCount: 4,
        currencyType: 'PTS',
        departureDate: '06-03-2023',
        destination: 'DEN',
        isRoundTrip: true,
        lapInfantPassengersCount: 3,
        numberOfAdults: 1,
        numberOfLapInfants: 0,
        origin: 'DAL',
        promoCode: 'alteap20',
        returnDate: '07-03-2023',
        tripType: 'roundTrip',
        useLowFareCalendar: false
      });
    });

    it('should return the search request from the url query when fare type is USD', () => {
      urlHelper.isOnOldRoute.mockReturnValue(false);
      const query = {
        adultPassengersCount: 4,
        departureDate: '06-03-2023',
        destinationAirportCode: 'DEN',
        fareType: 'USD',
        lapInfantPassengersCount: 3,
        originationAirportCode: 'DAL',
        promoCode: 'alteap20',
        returnDate: '07-03-2023',
        useLowFareCalendar: 'false'
      };

      const searchRequest = getSearchRequestFromQuery(query);

      expect(searchRequest).toEqual({
        adultPassengersCount: 4,
        currencyType: 'USD',
        departureDate: '06-03-2023',
        destination: 'DEN',
        isRoundTrip: true,
        lapInfantPassengersCount: 3,
        numberOfAdults: 1,
        numberOfLapInfants: 0,
        origin: 'DAL',
        promoCode: 'alteap20',
        returnDate: '07-03-2023',
        tripType: 'roundTrip',
        useLowFareCalendar: false
      });
    });

    it('should return the search request from the url query irrespective of fareType case', () => {
      urlHelper.isOnOldRoute.mockReturnValue(false);
      const query = {
        adultPassengersCount: 4,
        departureDate: '06-03-2023',
        destinationAirportCode: 'DEN',
        fareType: 'points',
        lapInfantPassengersCount: 3,
        originationAirportCode: 'DAL',
        promoCode: 'alteap20',
        returnDate: '07-03-2023',
        useLowFareCalendar: 'false'
      };

      const searchRequest = getSearchRequestFromQuery(query);

      expect(searchRequest).toEqual({
        adultPassengersCount: 4,
        currencyType: 'PTS',
        departureDate: '06-03-2023',
        destination: 'DEN',
        isRoundTrip: true,
        lapInfantPassengersCount: 3,
        numberOfAdults: 1,
        numberOfLapInfants: 0,
        origin: 'DAL',
        promoCode: 'alteap20',
        returnDate: '07-03-2023',
        tripType: 'roundTrip',
        useLowFareCalendar: false
      });
    });
  });

  describe('addDefaultValueOnSearchRequest', () => {
    it('should add oneWay for tripTrip if search request do not have tripTrip', () => {
      const originSearchRequest = {};
      const newSearchRequest = addDefaultValueOnSearchRequest(originSearchRequest);

      expect(newSearchRequest.tripType).toEqual('oneWay');
    });

    it('should fix the isRoundTrip base on tripTrip', () => {
      const originSearchRequest = {
        tripType: 'roundTrip',
        isRoundTrip: false,
        useLowFareCalendar: true
      };
      const newSearchRequest = addDefaultValueOnSearchRequest(originSearchRequest);

      expect(newSearchRequest.isRoundTrip).toEqual(true);
    });

    it('should set number of adult to 1 if there is no value for this field', () => {
      const originSearchRequest = {};
      const newSearchRequest = addDefaultValueOnSearchRequest(originSearchRequest);

      expect(newSearchRequest.numberOfAdults).toEqual(1);
    });

    it('should set adult passengers count to 1 if there is no value for this field', () => {
      const originSearchRequest = {};
      const newSearchRequest = addDefaultValueOnSearchRequest(originSearchRequest);

      expect(newSearchRequest.adultPassengersCount).toEqual(1);
    });

    it('should set adult passengers count to 2 if there is value for this field in search request', () => {
      const originSearchRequest = {
        adultPassengersCount: 2
      };
      const newSearchRequest = addDefaultValueOnSearchRequest(originSearchRequest);

      expect(newSearchRequest.adultPassengersCount).toEqual(2);
    });

    it('should set number of lap infants count to 0 if there is no value for this field', () => {
      const originSearchRequest = {};
      const newSearchRequest = addDefaultValueOnSearchRequest(originSearchRequest);

      expect(newSearchRequest.lapInfantPassengersCount).toEqual(0);
    });

    it('should set lap infant passengers count to 1 if there value for this field in search request', () => {
      const originSearchRequest = {
        lapInfantPassengersCount: 1
      };
      const newSearchRequest = addDefaultValueOnSearchRequest(originSearchRequest);

      expect(newSearchRequest.lapInfantPassengersCount).toEqual(1);
    });

    it('should set promo code as empty string if there is no value for this field', () => {
      const originSearchRequest = {};
      const newSearchRequest = addDefaultValueOnSearchRequest(originSearchRequest);

      expect(newSearchRequest.promoCode).toEqual('');
    });

    it('should add return date as 3 days later of departureDate when flight is round trip and no return date', () => {
      const originSearchRequest = new SearchForFlightsRequestBuilder()
        .withDepartureDate('2017-11-01')
        .withReturnDate(undefined)
        .build();
      const newSearchRequest = addDefaultValueOnSearchRequest(originSearchRequest);

      expect(newSearchRequest.returnDate).toEqual('2017-11-04');
    });

    it('should remove the return date when flight is one way', () => {
      const originSearchRequest = new SearchForFlightsRequestBuilder()
        .withTripType('oneWay')
        .withDepartureDate('2017-11-01')
        .withReturnDate('2017-11-04')
        .build();
      const newSearchRequest = addDefaultValueOnSearchRequest(originSearchRequest);

      expect(newSearchRequest.returnDate).toEqual(undefined);
    });

    it('should set USD as the default value for currency Type', () => {
      const originSearchRequest = {};
      const newSearchRequest = addDefaultValueOnSearchRequest(originSearchRequest);

      expect(newSearchRequest.currencyType).toEqual('USD');
    });

    it('should set lowFareCalendar as false', () => {
      const originSearchRequest = {};
      const newSearchRequest = addDefaultValueOnSearchRequest(originSearchRequest);

      expect(newSearchRequest.useLowFareCalendar).toEqual(false);
    });
  });
});

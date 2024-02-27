import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { sameDayFlightDetailsMktgSelector } from 'src/sameDay/analytics/sameDayFlightDetailsMktgSelector';
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants';

describe('sameDayFlightDetailsSelector', () => {
  const getStateData = (cards, sameDayFlightDetails) => ({
    app: {
      sameDay: {
        sameDayShoppingPage: {
          sameDayShoppingInformation: {
            cards,
            mktg_data: mockShoppingMktgData
          },
          sameDayFlightDetails
        }
      }
    }
  });
  const mockCardsMktgData = {
    air_bound1_flightnumber: '2733/2973',
    air_bound1_lengthofflight: '490',
    air_bound1_time: '06:45',
    confirmed_message: '-6',
    standby_message: 'see agent'
  };
  const mockCards = [ 
    {
      _links: {
        sameDayFlightDetails: {
          body: {
            flightIdentifier: 'flightIdentifier2',
            sameDayToken: 'sameDayToken'
          },
          href: '/v1/mobile-air-operations/page/same-day/flight-details/3RK3J9',
          method: 'POST'
        }
      },
      mktg_data: mockCardsMktgData
    }
  ];
  const mockShoppingMktgData = {
    air_bound1_airportcode: 'SNA:MKE',
    air_bound1_baggage_checkedin: '0',
    air_bound1_date: '2023-06-16',
    air_bound1_flightsreturned: '9',
    air_bound1_stops: '',
    air_bound1_stoptype: '',
    air_faretype1: 'BUS',
    air_faretype2: 'ANY',
    air_faretype3: 'PLU',
    air_faretype4: 'WGA',
    air_faretypes: 'BUS|ANY|PLU|WGA',
    air_passengercount: '1',
    air_triptype: 'OW',
    currency_type: 'usd'
  };
  const mockExpectedResult = {
    ...ANALYTICS.SHOPPING_PAGE,
    ...globalMktgState,
    ...mockShoppingMktgData
  };
  const mockFlightData = {
    flightIdentifier2: {
      mktg_data: {
        confirmed_seats_left: '143,143',
        standby_currentlistedseatcount: '0,0'
      }
    }
  };
  const satelliteTrack = 'squid';

  it('should return an array containing the contents of the mktg_data property when cards,flightDetailsData elements are present', () => {
    const expectedResult = [
      {
        ...mockCardsMktgData,
        ...mockExpectedResult
      },
      satelliteTrack,
      {
        ...ANALYTICS.FLIGHT_DETAILS,
        ...mockCardsMktgData,
        sdcsb_parameters: 'usd|see agent|0,0|-6|143,143'
      }
    ];

    const result = sameDayFlightDetailsMktgSelector(getStateData(mockCards, mockFlightData));

    expect(result).toStrictEqual(expectedResult);
  });
  describe('Cards', () => {
    const expectedResult = [
      { ...mockExpectedResult },
      satelliteTrack,
      {
        ...ANALYTICS.FLIGHT_DETAILS,
        sdcsb_parameters: 'usd|undefined|0,0|undefined|143,143'
      }
    ];

    it('should return an array containing the contents of the mktg_data property when cards mktg_data is empty,flightDetailsData elements are present', () => {
      const mockCardsWithoutMktgData = [
        { ...mockCards._links,
          mktg_data: {}
        }];

      const result = sameDayFlightDetailsMktgSelector(getStateData(mockCardsWithoutMktgData, mockFlightData));

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return an array containing the contents of the mktg_data property when cards _links is empty, flightDetailsData elements are present', () => {
      const mockCardsWithoutMktgDataAndLinks = [
        {
          _links: {},
          mktg_data: {}
        }
      ];

      const result = sameDayFlightDetailsMktgSelector(getStateData(mockCardsWithoutMktgDataAndLinks, mockFlightData));

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return an array containing the contents of the mktg_data property when sameDayFlightDetails is empty in cards, flightDetailsData elements are present', () => {
      const mockCards = [
        {
          _links: { sameDayFlightDetails: {} },
          mktg_data: {}
        }
      ];

      const result = sameDayFlightDetailsMktgSelector(getStateData(mockCards, mockFlightData));

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return an array containing the contents of the mktg_data property when body is empty in cards, flightDetailsData elements are present', () => {
      const mockCardsWithoutMktgDataAndLinksBody = [
        {
          _links: {
            sameDayFlightDetails: {
              body: {},
              href: '/v1/mobile-air-operations/page/same-day/flight-details/3RK3J9',
              method: 'POST'
            }
          },
          mktg_data: {}
        }
      ];

      const result = sameDayFlightDetailsMktgSelector(
        getStateData(mockCardsWithoutMktgDataAndLinksBody, mockFlightData)
      );

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return an array containing the contents of the mktg_data property when flightIdentifier is empty in cards, flightDetailsData elements are present', () => {
      const mockCardsWithoutMktgDataAndEmptyFlightIdentifier = [
        {
          _links: {
            sameDayFlightDetails: {
              body: {
                flightIdentifier: '',
                sameDayToken: 'sameDayToken'
              },
              href: '/v1/mobile-air-operations/page/same-day/flight-details/3RK3J9',
              method: 'POST'
            }
          },
          mktg_data: {}
        }
      ];

      const result = sameDayFlightDetailsMktgSelector(
        getStateData(mockCardsWithoutMktgDataAndEmptyFlightIdentifier, mockFlightData)
      );

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('flight details', () => {
    it('should return an array containing the contents of the mktg_data property when flightDetailsData is empty , cards element is present', () => {
      const expectedResult = [
        { ...mockExpectedResult },
        satelliteTrack,
        {
          ...ANALYTICS.FLIGHT_DETAILS,
          sdcsb_parameters: 'usd|undefined||undefined|'
        }
      ];
      const sameDayFlightDetailsData = {};

      const result = sameDayFlightDetailsMktgSelector(getStateData(mockCards, sameDayFlightDetailsData));

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return an array containing the contents of the mktg_data property when mktg_data of flightDetailsData is not present,cards element is present', () => {
      const expectedResult = [
        { ...mockExpectedResult, ...mockCardsMktgData },
        satelliteTrack,
        {
          ...ANALYTICS.FLIGHT_DETAILS,
          ...mockCardsMktgData,
          sdcsb_parameters: 'usd|see agent||-6|'
        }
      ];
      const sameDayFlightDetailsData = { flightIdentifier2: {} };

      const result = sameDayFlightDetailsMktgSelector(getStateData(mockCards, sameDayFlightDetailsData));

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return an array containing the contents of the mktg_data property when mktg_data of flightDetailsData is empty,cards element is present', () => {
      const expectedResult = [
        { ...mockExpectedResult, ...mockCardsMktgData },
        satelliteTrack,
        {
          ...ANALYTICS.FLIGHT_DETAILS,
          ...mockCardsMktgData,
          sdcsb_parameters: 'usd|see agent||-6|'
        }
      ];
      const sameDayFlightDetailsData = { flightIdentifier2: { mktg_data: {} } };

      const result = sameDayFlightDetailsMktgSelector(getStateData(mockCards, sameDayFlightDetailsData));

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return an array containing the contents of the mktg_data property when mktg_data with only standby_currentlistedseatcount of flightDetailsData,cards element is present', () => {
      const expectedResult = [
        {
          ...mockCardsMktgData,
          ...mockExpectedResult
        },
        satelliteTrack,
        {
          ...ANALYTICS.FLIGHT_DETAILS,
          ...mockCardsMktgData,
          sdcsb_parameters: 'usd|see agent|0,0|-6|'
        }
      ];

      const sameDayFlightDetailsData = { flightIdentifier2: { mktg_data: { standby_currentlistedseatcount: '0,0' } } };
      const result = sameDayFlightDetailsMktgSelector(getStateData(mockCards, sameDayFlightDetailsData));

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return an array containing the contents of the mktg_data property when mktg_data with only confirmed_seats_left of flightDetailsData , cards element is present', () => {
      const expectedResult = [
        {
          ...mockCardsMktgData,
          ...mockExpectedResult
        },
        satelliteTrack,
        {
          ...ANALYTICS.FLIGHT_DETAILS,
          ...mockCardsMktgData,
          sdcsb_parameters: 'usd|see agent||-6|143,143'
        }
      ];
      const sameDayFlightDetailsData = { flightIdentifier2: { mktg_data: { confirmed_seats_left: '143,143' } } };

      const result = sameDayFlightDetailsMktgSelector(getStateData(mockCards, sameDayFlightDetailsData));

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

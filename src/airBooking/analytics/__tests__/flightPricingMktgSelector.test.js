import _ from 'lodash';
import { flightPricingMktgSelector } from 'src/airBooking/analytics/flightPricingMktgSelector';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import { ANALYTICS } from 'src/airBooking/constants/airBookingConstants';

describe('flightPricingMktgSelector', () => {
  const defaultMktgState = {
    ...globalMktgState,
    ...ANALYTICS.PRICE_PAGE,
    upsell_eligiblebounds: 0,
    upsell_shown: 0,
    upsell_messagingdetails: null
  };
  const mockMktgDataFromCHAPI = {
    test_mktg_data: 'mock data'
  };

  it('should return an empty object for mktgData if "state.app.airBooking.flightPricingPage.response.flightPricingPage.mktg_data" does not exist', () => {
    const [mktgData] = flightPricingMktgSelector({});

    expect(mktgData).toStrictEqual(defaultMktgState);
  });

  it('should return an array containing the contents of the mktg_data property', () => {
    const mockState = _.set(
      {},
      'app.airBooking.flightPricingPage.response.flightPricingPage.mktg_data',
      mockMktgDataFromCHAPI
    );
    const satelliteTrack = 'otter';
    const expectedResult = [{
      ...defaultMktgState,
      ...mockMktgDataFromCHAPI
    },
    satelliteTrack,
    { page_name: ANALYTICS.PRICE_PAGE.page_name }
    ];
    const result = flightPricingMktgSelector(mockState);

    expect(result).toStrictEqual(expectedResult);
  });

  describe('Upsell', () => {
    it('should return correct upsell values when upsellDetails exists', () => {
      const { flightPricingPage } = new PricesBuilder().withUpsellBothBoundsOptions().build();

      flightPricingPage.mktg_data = mockMktgDataFromCHAPI;

      const mockStateWithUpsell = {
        app: {
          airBooking: {
            searchRequest: {
              numberOfAdults: 3
            },
            flightPricingPage: {
              response: { flightPricingPage }
            }
          }
        }
      };
      const satelliteTrack = 'otter';
      const expectedResult = [{
        ...defaultMktgState,
        ...mockMktgDataFromCHAPI,
        upsell_eligiblebounds: 6,
        upsell_shown: 1,
        upsell_lowestpricecurrency: '50.00',
        upsell_messagingdetails: 'price|Upgrade to Business Select®|BUS'
      },
      satelliteTrack,
      { page_name: ANALYTICS.PRICE_PAGE.page_name }      
      ];
      const result = flightPricingMktgSelector(mockStateWithUpsell);

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return correct upsell_lowestpricecurrency value when one way flight', () => {
      const { flightPricingPage } = new PricesBuilder().withUpsellBothBoundsOptions().build();

      flightPricingPage.mktg_data = mockMktgDataFromCHAPI;
      flightPricingPage.bounds.pop();

      const mockStateWithUpsell = {
        app: {
          airBooking: {
            searchRequest: {
              numberOfAdults: 3
            },
            flightPricingPage: {
              response: { flightPricingPage }
            }
          }
        }
      };
      const satelliteTrack = 'otter';
      const expectedResult = [{
        ...defaultMktgState,
        ...mockMktgDataFromCHAPI,
        upsell_eligiblebounds: 3,
        upsell_shown: 1,
        upsell_lowestpricecurrency: '50.00',
        upsell_messagingdetails: 'price|Upgrade to Business Select®|BUS'
      },
      satelliteTrack,
      { page_name: ANALYTICS.PRICE_PAGE.page_name }
      ];
      const result = flightPricingMktgSelector(mockStateWithUpsell);

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return correct upsell_lowestpricecurrency value when roundtrip and return bound upsell price is the lowest', () => {
      const { flightPricingPage } = new PricesBuilder().withUpsellBothBoundsOptions().build();

      flightPricingPage.mktg_data = mockMktgDataFromCHAPI;
      flightPricingPage.bounds[1].upsellBoundDetails.upsellPrice = '40';

      const mockStateWithUpsell = {
        app: {
          airBooking: {
            searchRequest: {
              numberOfAdults: 3
            },
            flightPricingPage: {
              response: { flightPricingPage }
            }
          }
        }
      };
      const satelliteTrack = 'otter';
      const expectedResult = [{
        ...defaultMktgState,
        ...mockMktgDataFromCHAPI,
        upsell_eligiblebounds: 6,
        upsell_shown: 1,
        upsell_lowestpricecurrency: '40.00',
        upsell_messagingdetails: 'price|Upgrade to Business Select®|BUS'
      },
      satelliteTrack,
      { page_name: ANALYTICS.PRICE_PAGE.page_name }
      ];
      const result = flightPricingMktgSelector(mockStateWithUpsell);

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return correct upsell values when upsellDetails does not exist', () => {
      const { flightPricingPage } = new PricesBuilder().withRoundTrip().build();

      flightPricingPage.mktg_data = mockMktgDataFromCHAPI;

      const mockStateWithoutUpsell = {
        app: {
          airBooking: {
            searchRequest: {
              numberOfAdults: 3
            },
            flightPricingPage: {
              response: { flightPricingPage }
            }
          }
        }
      };
      const satelliteTrack = 'otter';
      const expectedResult = [{
        ...defaultMktgState,
        ...mockMktgDataFromCHAPI,
        upsell_eligiblebounds: 0,
        upsell_shown: 0,
        upsell_messagingdetails: null
      },
      satelliteTrack,
      { page_name: ANALYTICS.PRICE_PAGE.page_name }
      ];
      const result = flightPricingMktgSelector(mockStateWithoutUpsell);

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return correct upsell values when departureBoundUpsellPrice does not exist', () => {
      const { flightPricingPage } = new PricesBuilder().withUpsellBothBoundsOptions().build();

      flightPricingPage.mktg_data = mockMktgDataFromCHAPI;
      flightPricingPage.bounds[0].upsellBoundDetails.upsellPrice = '0';

      const mockStateWithUpsell = {
        app: {
          airBooking: {
            searchRequest: {
              numberOfAdults: 3
            },
            flightPricingPage: {
              response: { flightPricingPage }
            }
          }
        }
      };
      const satelliteTrack = 'otter';
      const expectedResult = [{
        ...defaultMktgState,
        ...mockMktgDataFromCHAPI,
        upsell_eligiblebounds: 6,
        upsell_lowestpricecurrency: '51.00',
        upsell_messagingdetails: 'price|Upgrade to Business Select®|BUS',
        upsell_shown: 1
      },
      satelliteTrack,
      { page_name: ANALYTICS.PRICE_PAGE.page_name }
      ];
      const result = flightPricingMktgSelector(mockStateWithUpsell);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

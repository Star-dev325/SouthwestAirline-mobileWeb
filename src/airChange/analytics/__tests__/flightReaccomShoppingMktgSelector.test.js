import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { flightReaccomShoppingMktgSelector } from 'src/airChange/analytics/flightReaccomShoppingMktgSelector';
import { ANALYTICS } from 'src/airChange/constants/airChangeConstants';

describe('flightReaccomShoppingMktgSelector', () => {
  const getStateData = (selectedBounds) => ({ app: {
    airChange: {
      reaccomShoppingPage: {
        response: {
          mktg_data: mockData
        }
      },
      selectedBounds
    }
  } });
  const mockData = { data: 'mock mktg_data' };
  const satelliteTrack = 'otter';

  it('should return an empty object for mktgData if "app.airChange.reaccomShoppingPage.response.mktg_data" does not exist', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.REACCOM_OUTBOUND_SHOPPING_PAGE,
        formname: 'reaccom change',
        formstart: '1'
      },
      satelliteTrack,
      {
        page: ANALYTICS.REACCOM_OUTBOUND_SHOPPING_PAGE.page
      }
    ];
    const result = flightReaccomShoppingMktgSelector({});

    expect(result).toStrictEqual(expectedResult);
  });

  it('should handle correctly when state value is undefined', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.REACCOM_OUTBOUND_SHOPPING_PAGE,
        formname: 'reaccom change',
        formstart: '1'
      },
      satelliteTrack,
      {
        page: ANALYTICS.REACCOM_OUTBOUND_SHOPPING_PAGE.page
      }
    ];
    const result = flightReaccomShoppingMktgSelector({ app: undefined });

    expect(result).toStrictEqual(expectedResult);
  });

  describe('outbound shopping page data elements', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...mockData,
        ...ANALYTICS.REACCOM_OUTBOUND_SHOPPING_PAGE,
        formname: 'reaccom change',
        formstart: '1'
      },
      satelliteTrack,
      {
        page: ANALYTICS.REACCOM_OUTBOUND_SHOPPING_PAGE.page
      }
    ];

    it('should return an array with the contents of the mktg_data property when only outbound is selected', () => {
      const result = flightReaccomShoppingMktgSelector(getStateData({ firstbound: true, secondbound: false }));

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return an array with the contents of the mktg_data property when both bounds are selected', () => {
      const result = flightReaccomShoppingMktgSelector(getStateData({ firstbound: true, secondbound: true }));

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('inbound shopping page data elements', () => {
    it('should return an array with the contents of the mktg_data property when only inbound is selected', () => {
      const expectedResult = [
        {
          ...globalMktgState,
          ...mockData,
          ...ANALYTICS.REACCOM_INBOUND_SHOPPING_PAGE,
          formname: 'reaccom change',
          formstart: '1'
        },
        satelliteTrack,
        {
          page: ANALYTICS.REACCOM_INBOUND_SHOPPING_PAGE.page
        }
      ];
      
      const result = flightReaccomShoppingMktgSelector(getStateData({ firstbound: false, secondbound: true }));

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { flightReaccomSummaryMktgSelector } from 'src/airChange/analytics/flightReaccomSummaryMktgSelector';
import { ANALYTICS } from 'src/airChange/constants/airChangeConstants';

describe('flightReaccomSummaryMktgSelector', () => {
  const getStateData = (selectedBounds, selectedProducts) => ({
    app: {
      airChange: {
        reaccomShoppingPage: {
          response: { mktg_data: mockData },
          selectedProducts
        },
        selectedBounds
      }
    }
  });
  const mockData = { data: 'mock mktg_data' };
  const satelliteTrack = 'otter';

  it('should return an empty object for mktgData if "app.airChange.reaccomShoppingPage.response.mktg_data" does not exist', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.REACCOM_SUMMARY_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.REACCOM_SUMMARY_PAGE.page
      }
    ];
    const result = flightReaccomSummaryMktgSelector({});

    expect(result).toStrictEqual(expectedResult);
  });

  it('should handle correctly when state value is undefined', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.REACCOM_SUMMARY_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.REACCOM_SUMMARY_PAGE.page
      }
    ];
    const result = flightReaccomSummaryMktgSelector({ app: undefined });

    expect(result).toStrictEqual(expectedResult);
  });

  describe('summary page data elements', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...mockData,
        ...ANALYTICS.REACCOM_SUMMARY_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.REACCOM_SUMMARY_PAGE.page
      }
    ];

    it('should return an array with the contents of the mktg_data property when secondbound is not selected', () => {
      const result = flightReaccomSummaryMktgSelector(getStateData({ firstbound: true, secondbound: false }));

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return an array with the contents of the mktg_data property when secondbound and inbound product are selected', () => {
      const result = flightReaccomSummaryMktgSelector(
        getStateData({ firstbound: false, secondbound: true }, { inbound: { test: 'test' } })
      );

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('inbound shopping page data elements', () => {
    it('should return an array with the contents of the mktg_data property when secondbound is selected and inbound product is not selected', () => {
      const expectedResult = [
        {
          ...globalMktgState,
          ...mockData,
          ...ANALYTICS.REACCOM_INBOUND_SHOPPING_PAGE
        },
        satelliteTrack,
        {
          page: ANALYTICS.REACCOM_INBOUND_SHOPPING_PAGE.page
        }
      ];

      const result = flightReaccomSummaryMktgSelector(
        getStateData({ firstbound: true, secondbound: true }, { inbound: null })
      );

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

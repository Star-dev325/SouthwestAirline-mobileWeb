import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { sameDayPriceDifferencePageMktgSelector } from 'src/sameDay/analytics/sameDayPriceDifferencePageMktgSelector';
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants';

describe('sameDayPriceDifferencePageMktgSelector', () => {
  const mockData = { data: 'mock mktg_data' };
  const satelliteTrack = 'otter';

  it('should return an empty object for mktgData if "app.sameDay.sameDayShoppingPage.sameDayShoppingInformation.mktg_data" does not exist', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.PRICE_DIFFERENCE_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.PRICE_DIFFERENCE_PAGE.page
      }
    ];
    const result = sameDayPriceDifferencePageMktgSelector({});

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the mktg_data property with shopping page data elements', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...mockData,
        ...ANALYTICS.PRICE_DIFFERENCE_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.PRICE_DIFFERENCE_PAGE.page
      }
    ];
    const state_data = {
      app: {
        sameDay: {
          sameDayPricingPage: {
            mktg_data: mockData
          }
        }
      }
    };
    const result = sameDayPriceDifferencePageMktgSelector(state_data);

    expect(result).toStrictEqual(expectedResult);
  });
});

import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { sameDaySelectFlightPageMktgSelector } from 'src/sameDay/analytics/sameDaySelectFlightPageMktgSelector';
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants';

describe('sameDaySelectFlightPageMktgSelector', () => {
  const mockData = { data: 'mock mktg_data' };
  const satelliteTrack = 'otter';

  it('should return an empty object for mktgData if "app.sameDay.sameDayShoppingPage.sameDayShoppingInformation.mktg_data" does not exist', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.SHOPPING_PAGE
      },
      satelliteTrack,
      { page: ANALYTICS.SHOPPING_PAGE.page }
    ];
    const result = sameDaySelectFlightPageMktgSelector({});

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the mktg_data property with shopping page data elements', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...mockData,
        ...ANALYTICS.SHOPPING_PAGE
      },
      satelliteTrack,
      { page: ANALYTICS.SHOPPING_PAGE.page }
    ];
    const state_data = {
      app: {
        sameDay: {
          sameDayShoppingPage: {
            sameDayShoppingInformation: {
              mktg_data: mockData
            }
          }
        }
      }
    };
    const result = sameDaySelectFlightPageMktgSelector(state_data);

    expect(result).toStrictEqual(expectedResult);
  });
});

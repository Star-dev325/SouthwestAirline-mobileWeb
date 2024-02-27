import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { selectStandbyPageMktgSelector } from 'src/standby/analytics/selectStandbyPageMktgSelector';
import { ANALYTICS } from 'src/standby/constants/standbyConstants';

describe('selectStandbyPageMktgSelector', () => {
  const mockData = { data: 'mock mktg_data' };
  const satelliteTrack = 'otter';

  it('should return an empty object for mktgData if "app.sameDay.sameDayShoppingPage.response.mktg_data" does not exist', () => {
    const expectedResult = [
      {
        ...ANALYTICS.STANDBY_PAGE,
        ...globalMktgState
      },
      satelliteTrack,
      { page: ANALYTICS.STANDBY_PAGE.page }
    ];
    const result = selectStandbyPageMktgSelector({});

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the mktg_data property with shopping page data elements', () => {
    const expectedResult = [
      {
        ...ANALYTICS.STANDBY_PAGE,
        ...globalMktgState,
        ...mockData
      },
      satelliteTrack,
      { page: ANALYTICS.STANDBY_PAGE.page }
    ];

    const state_data = {
      app: {
        standby: {
          standbyPage: {
            response: {
              standbyListPage: {
                mktg_data: mockData
              }
            }
          }
        }
      }
    };
    const result = selectStandbyPageMktgSelector(state_data);

    expect(result).toStrictEqual(expectedResult);
  });
});
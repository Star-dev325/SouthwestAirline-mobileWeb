import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { sameDayApplySortFilterMktgSelector } from 'src/sameDay/analytics/sameDayApplySortFilterMktgSelector';
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants';

describe('sameDaySelectFlightPageMktgSelector', () => {
  const mockData = { data: 'mock mktg_data' };
  const satelliteTrack = 'otter';

  it('should return an object with default values for marketing data if none is provided in state', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.SHOPPING_PAGE,
        sortby: 'departureTime',
        filterby: 'none|none|none'
      },
      satelliteTrack,
      { page: ANALYTICS.SHOPPING_PAGE.page }
    ];
    const result = sameDayApplySortFilterMktgSelector({});

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the mktg_data property with shopping page and sort/filter data elements', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...mockData,
        ...ANALYTICS.SHOPPING_PAGE,
        sortby: 'stops',
        filterby: 'nonstop|available standby|available confirmed'
      },
      satelliteTrack,
      { page: ANALYTICS.SHOPPING_PAGE.page }
    ];
    const state_data = {
      app: {
        sameDay: {
          sameDayShoppingPage: {
            sameDayShoppingInformation: {
              mktg_data: mockData,
              appliedSortAndFilterData: {
                confirmed: true,
                nonStop: true,
                sortBy: 'stops',
                standby: true
              }
            }
          }
        }
      }
    };
    const result = sameDayApplySortFilterMktgSelector(state_data);

    expect(result).toStrictEqual(expectedResult);
  });
});

import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { sameDayBoundSelectionPageMktgSelector } from 'src/sameDay/analytics/sameDayBoundSelectionPageMktgSelector';
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants';

describe('sameDayBoundSelectionPageMktgSelector', () => {
  const satelliteTrack = 'otter';

  it('should return an empty object for mktgData if "app.viewReservation.viewForSameDayPage._meta.showBoundSelection" is false', () => {
    const expectedResult = [];
    const result = sameDayBoundSelectionPageMktgSelector({});

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the mktg_data property with shopping page data elements', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.BOUND_SELECTION_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.BOUND_SELECTION_PAGE.page
      }
    ];
    const state_data = {
      app: {
        viewReservation: {
          viewForSameDayPage: {
            _meta: {
              showBoundSelection: true
            }
          }
        }
      }
    };
    const result = sameDayBoundSelectionPageMktgSelector(state_data);

    expect(result).toStrictEqual(expectedResult);
  });
});

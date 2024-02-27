import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { sameDayConfirmationPageMktgSelector } from 'src/sameDay/analytics/sameDayConfirmationPageMktgSelector';
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants';

describe('sameDayConfirmationPageMktgSelector', () => {
  const mockData = { data: 'mock same day confirmation mktg_data' };
  const satelliteTrack = 'otter';

  it('should return an empty object for mktgData if "app.sameDay.sameDayShoppingPage.sameDayShoppingInformation.mktg_data" does not exist', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.CONFIRMATION_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.CONFIRMATION_PAGE.page
      }
    ];
    const result = sameDayConfirmationPageMktgSelector({});

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the mktg_data property with shopping page data elements', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...mockData,
        ...ANALYTICS.CONFIRMATION_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.CONFIRMATION_PAGE.page
      }
    ];
    const state_data = {
      app: {
        sameDay: {
          sameDayConfirmationPage: {
            response: {
              mktg_data: mockData
            }
          }
        }
      }
    };
    const result = sameDayConfirmationPageMktgSelector(state_data);

    expect(result).toStrictEqual(expectedResult);
  });
});

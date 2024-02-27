import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { sameDayCancelConfirmationPageMktgSelector } from 'src/sameDay/analytics/cancelStandbyConfirmationMktgSelector';
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants';

describe('sameDayCancelConfirmationPageMktgSelector', () => {
  const mockData = { data: 'mock mktg_data' };
  const satelliteTrack = 'otter';

  it('should return an empty object for mktgData if "app.sameDay.sameDayShoppingPage.sameDayShoppingInformation.mktg_data" does not exist', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.CANCEL_STANDBY_CONFIRMATION_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.CANCEL_STANDBY_CONFIRMATION_PAGE.page
      }
    ];
    const result = sameDayCancelConfirmationPageMktgSelector({});

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the mktg_data property with standby cancel confirmation page data elements', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...mockData,
        ...ANALYTICS.CANCEL_STANDBY_CONFIRMATION_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.CANCEL_STANDBY_CONFIRMATION_PAGE.page
      }
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
    const result = sameDayCancelConfirmationPageMktgSelector(state_data);

    expect(result).toStrictEqual(expectedResult);
  });
});

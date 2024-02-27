import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { mobileBoardingPassMktgSelector } from 'src/checkIn/analytics/mobileBoardingPassMktgSelector';
import { ANALYTICS } from 'src/checkIn/constants/checkInConstants';

describe('mobileBoardingPassMktgSelector', () => {
  const pageData = {
    page: ANALYTICS.BOARDING_PASS.page,
    page_channel: ANALYTICS.BOARDING_PASS.page_channel,
    page_name: ANALYTICS.BOARDING_PASS.page_name,
    page_subchannel: ANALYTICS.BOARDING_PASS.page_subchannel
  };
  const satelliteTrack = 'otter';

  it('should return an empty object for mktgData if "state.app.checkIn.checkInViewBoardingPassPage.mobileBoardingPassViewPage.mktg_data" does not exist', () => {
    const result = mobileBoardingPassMktgSelector({});
    const expectedResult = [
      {
        ...pageData,
        ...globalMktgState
      },
      satelliteTrack,
      {
        page: ANALYTICS.BOARDING_PASS.page
      }
    ];

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the mktg_data property', () => {
    const mockMktgDataFromCHAPI = 'mock mktg_data';
    const state = {
      app: {
        checkIn: {
          checkInViewBoardingPassPage: {
            mobileBoardingPassViewPage: {
              mktg_data: mockMktgDataFromCHAPI
            }
          }
        }
      }
    };
    const result = mobileBoardingPassMktgSelector(state);
    const expectedResult = [
      {
        ...pageData,
        ...mockMktgDataFromCHAPI,
        ...globalMktgState
      },
      satelliteTrack,
      {
        page: ANALYTICS.BOARDING_PASS.page
      }
    ];

    expect(result).toStrictEqual(expectedResult);
  });
});

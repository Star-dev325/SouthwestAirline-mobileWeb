import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { flightReaccomConfirmationMktgSelector } from 'src/airChange/analytics/flightReaccomConfirmationMktgSelector';
import { ANALYTICS } from 'src/airChange/constants/airChangeConstants';

describe('flightReaccomConfirmationMktgSelector', () => {
  const satelliteTrack = 'otter';

  it('should return an empty object for mktgData if "app.airChange.reaccomConfirmationPage.response.mktg_data" does not exist', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.REACCOM_CONFIRMATION_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.REACCOM_CONFIRMATION_PAGE.page
      }
    ];
    const mktgData = flightReaccomConfirmationMktgSelector({});

    expect(mktgData).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the mktg_data property with page data elements', () => {
    const mockData = { data: 'mock mktg_data' };
    const expectedResult = [
      {
        ...globalMktgState,
        ...mockData,
        ...ANALYTICS.REACCOM_CONFIRMATION_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.REACCOM_CONFIRMATION_PAGE.page
      }
    ];
    const state_data = { app: { airChange: { reaccomConfirmationPage: { response: { mktg_data: mockData } } } } };
    const mktgData = flightReaccomConfirmationMktgSelector(state_data);

    expect(mktgData).toStrictEqual(expectedResult);
  });
});

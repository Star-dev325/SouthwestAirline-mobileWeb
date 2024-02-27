import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { flightReaccomSelectFlightMktgSelector } from 'src/airChange/analytics/flightReaccomSelectFlightMktgSelector';
import { ANALYTICS } from 'src/airChange/constants/airChangeConstants';

describe('flightReaccomSelectFlightMktgSelector', () => {
  const satelliteTrack = 'otter';

  it('should return an empty object for mktgData if "app.airChange.reaccomFlightPage.response.mktg_data" does not exist', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.REACCOM_SELECT_FLIGHT_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.REACCOM_SELECT_FLIGHT_PAGE.page
      }
    ];
    const mktgData = flightReaccomSelectFlightMktgSelector({});

    expect(mktgData).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the mktg_data property with page data elements', () => {
    const mockData = { data: 'mock mktg_data' };
    const expectedResult = [
      {
        ...globalMktgState,
        ...mockData,
        ...ANALYTICS.REACCOM_SELECT_FLIGHT_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.REACCOM_SELECT_FLIGHT_PAGE.page
      }
    ];
    const state_data = { app: { airChange: { reaccomFlightPage: { response: { mktg_data: mockData } } } } };
    const mktgData = flightReaccomSelectFlightMktgSelector(state_data);

    expect(mktgData).toStrictEqual(expectedResult);
  });
});

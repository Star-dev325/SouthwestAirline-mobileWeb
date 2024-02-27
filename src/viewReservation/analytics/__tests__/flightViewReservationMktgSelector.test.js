import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { flightViewReservationMktgSelector } from 'src/viewReservation/analytics/flightViewReservationMktgSelector';
import { ANALYTICS } from 'src/viewReservation/constants/viewReservationConstants';

describe('flightViewReservationMktgSelector', () => {
  const satelliteTrack = 'otter';

  it('should return an empty object for mktgData if "app.viewReservation.flightReservation.mktg_data" does not exist', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.VIEW_RESERVATION_DETAILS_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.VIEW_RESERVATION_DETAILS_PAGE.page
      }
    ];
    const mktgData = flightViewReservationMktgSelector({});

    expect(mktgData).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the mktg_data property with page data elements', () => {
    const mockData = { data: 'mock mktg_data' };
    const expectedResult = [
      {
        ...globalMktgState,
        ...mockData,
        ...ANALYTICS.VIEW_RESERVATION_DETAILS_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.VIEW_RESERVATION_DETAILS_PAGE.page
      }
    ];
    const state_data = { app: { viewReservation: { flightReservation: { mktg_data: mockData } } } };
    const mktgData = flightViewReservationMktgSelector(state_data);

    expect(mktgData).toStrictEqual(expectedResult);
  });
});

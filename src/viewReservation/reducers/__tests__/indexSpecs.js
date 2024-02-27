import reducers from 'src/viewReservation/reducers/index';
import { ANALYTICS_DEFAULT } from 'src/viewReservation/reducers/travelInformationPageReducers';

describe('ViewReservation index', () => {
  it('should init the view reservation state', () => {
    const state = reducers(undefined, {});

    expect(state).to.deep.equal({
      carCanceled: false,
      searchRequest: {},
      carReservation: {},
      dayOfTravelContactInfo: {},
      flightReservation: {},
      recentTripSearches: [],
      travelInformationPage: {
        response: null,
        isInternational: false,
        isCheckedIn: false,
        saveTravelInformationRequest: {},
        analytics: ANALYTICS_DEFAULT
      },
      viewForSameDayPage: {}
    });
  });
});

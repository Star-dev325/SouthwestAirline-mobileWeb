import * as CheckInLandingPageSelectors from 'src/checkIn/selectors/checkInLandingPageSelector';
import UpcomingTripsBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/upcoming-trips/upcomingTripsBuilder';

describe('checkInLandingPageSelector', () => {
  let defaultState;

  beforeEach(() => {
    defaultState = {
      app: {
        upcomingTrips: {}
      }
    };
  });

  it('returns empty if upcoming trips empty', () => {
    expect(CheckInLandingPageSelectors.getTripsThatNeedToCheckIn(defaultState)).to.deep.equal([]);
  });

  it('filters out check-in eligible upcoming trips', () => {
    defaultState.app.upcomingTrips = new UpcomingTripsBuilder()
      .withCheckinFlight({ recordLocator: 'QIP34B', firstName: 'STEVEN', lastName: 'JACKIE' })
      .withBetween36HoursAnd48Hours()
      .build();
    const filteredTrips = CheckInLandingPageSelectors.getTripsThatNeedToCheckIn(defaultState);

    expect(filteredTrips.length).to.equal(1);
    expect(filteredTrips[0].confirmationNumber).to.equal('QIP34B');
  });
});

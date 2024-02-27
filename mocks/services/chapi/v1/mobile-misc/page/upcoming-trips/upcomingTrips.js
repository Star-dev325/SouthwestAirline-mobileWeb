const UpcomingTripsBuilder = require('test/builders/apiResponse/v1/mobile-misc/page/upcoming-trips/upcomingTripsBuilder');
const UpcomingTripBuilder = require('test/builders/apiResponse/v1/mobile-misc/page/upcoming-trips/upcomingTripBuilder');

module.exports = {
  path: '/chapi/v1/mobile-misc/page/upcoming-trips',
  method: 'GET',
  cache: false,
  template: () => {
    const standbyFlightBuilder = new UpcomingTripBuilder().withStandby();

    return new UpcomingTripsBuilder()
      .withOneWayFlight()
      .withRoundTripFlight()
      .withCheckinFlight({ recordLocator: 'R4ZGJ3', firstName: 'FIRST', lastName: 'LAST' })
      .withOnboardingViewBoardingPassFlight()
      .withViewBoardingPositionFlight()
      .withUnaccompaniedMinor()
      .withCar()
      .addUpcomingTrip(standbyFlightBuilder.withNonRev(false).build())
      .addUpcomingTrip(standbyFlightBuilder.withNonRev(true).build())
      .withBetween36HoursAnd48Hours()
      .withCancelledFlight()
      .withDepartedFlight()
      .withDelayedFlight()
      .withOnboardingDelayedFlight()
      .addGreaterThan24HoursTrip()
      .withCompanion()
      .withViewReservationViewPage()
      .withReaccomOneWay()
      .withMultiPax()
      .withSpaceAvailableNonRevStandby()
      .withSpaceAvailableStandby()
      .withCheckinFlight({ recordLocator: 'MISAPI', firstName: 'FIRST', lastName: 'LAST' })
      .build();
  }
};

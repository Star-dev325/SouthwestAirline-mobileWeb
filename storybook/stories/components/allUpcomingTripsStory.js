import { storiesOf } from '@storybook/react';
import React from 'react';
import AllUpcomingTrips from 'src/myAccount/components/allUpcomingTrips';
import UpcomingTripsBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/upcoming-trips/upcomingTripsBuilder';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import createMockStore from 'test/unit/helpers/createMockStore';

const mockStore = createMockStore();
const store = mockStore({
  app: {
    toggles: {
      AIRCRAFT_TYPE_TRIPCARD: false
    }
  }
});
storiesOf('components/allUpcomingTrips', module)
  .addDecorator(StoryReduxProvider(store))
  .add('oneway', () => {
    return (
      <div>
        <AllUpcomingTrips trips={new UpcomingTripsBuilder().withOneWayFlight().build().upcomingTripsPage} />
      </div>
    );
  })
  .add('oneway with connection', () => {
    return (
      <div>
        <AllUpcomingTrips
          trips={new UpcomingTripsBuilder().withOneWayFlightHasConnection().build().upcomingTripsPage}
        />
      </div>
    );
  })
  .add('roundtrip', () => {
    return (
      <div>
        <AllUpcomingTrips trips={new UpcomingTripsBuilder().withRoundTripFlight().build().upcomingTripsPage} />
      </div>
    );
  })
  .add('space-available non-rev standby', () => {
    return (
      <div>
        <AllUpcomingTrips
          trips={new UpcomingTripsBuilder().withSpaceAvailableNonRevStandby().build().upcomingTripsPage}
        />
      </div>
    );
  })
  .add('space-available standby', () => {
    return (
      <div>
        <AllUpcomingTrips trips={new UpcomingTripsBuilder().withSpaceAvailableStandby().build().upcomingTripsPage} />
      </div>
    );
  })
  .add('checkin', () => {
    return (
      <div>
        <AllUpcomingTrips trips={new UpcomingTripsBuilder().withCheckinFlight().build().upcomingTripsPage} />
      </div>
    );
  })
  .add('departed', () => {
    return (
      <div>
        <AllUpcomingTrips trips={new UpcomingTripsBuilder().withDepartedFlight().build().upcomingTripsPage} />
      </div>
    );
  })
  .add('departed with connection', () => {
    return (
      <div>
        <AllUpcomingTrips
          trips={new UpcomingTripsBuilder().withDepartedFlightHasConnection().build().upcomingTripsPage}
        />
      </div>
    );
  })
  .add('delayed', () => {
    return (
      <div>
        <AllUpcomingTrips trips={new UpcomingTripsBuilder().withDelayedFlight().build().upcomingTripsPage} />
      </div>
    );
  })
  .add('now boarding delayed', () => {
    return (
      <div>
        <AllUpcomingTrips trips={new UpcomingTripsBuilder().withOnboardingDelayedFlight().build().upcomingTripsPage} />
      </div>
    );
  })
  .add('now boarding view bp', () => {
    return (
      <div>
        <AllUpcomingTrips
          trips={new UpcomingTripsBuilder().withOnboardingViewBoardingPassFlight().build().upcomingTripsPage}
        />
      </div>
    );
  })
  .add('boarding position', () => {
    return (
      <div>
        <AllUpcomingTrips
          trips={new UpcomingTripsBuilder().withViewBoardingPositionFlight().build().upcomingTripsPage}
        />
      </div>
    );
  })
  .add('unaccompanied minor', () => {
    return (
      <div>
        <AllUpcomingTrips trips={new UpcomingTripsBuilder().withUnaccompaniedMinor().build().upcomingTripsPage} />
      </div>
    );
  })
  .add('cancelled flight', () => {
    return (
      <div>
        <AllUpcomingTrips trips={new UpcomingTripsBuilder().withCancelledFlight().build().upcomingTripsPage} />
      </div>
    );
  })
  .add('companion', () => {
    return (
      <div>
        <AllUpcomingTrips trips={new UpcomingTripsBuilder().withCompanion().build().upcomingTripsPage} />
      </div>
    );
  })
  .add('car', () => {
    return (
      <div>
        <AllUpcomingTrips trips={new UpcomingTripsBuilder().withCar().build().upcomingTripsPage} />
      </div>
    );
  })
  .add('with upgraded boarding button', () => {
    return (
      <div>
        <AllUpcomingTrips
          trips={new UpcomingTripsBuilder().withViewUpgradedBoardingLink().build().upcomingTripsPage}
          UPGRADED_BOARDING
        />
      </div>
    );
  })
  .add('with track checked bags button', () => {
    return (
      <div>
        <AllUpcomingTrips
          trips={new UpcomingTripsBuilder().withTrackCheckedBagsLink().build().upcomingTripsPage}
          UPGRADED_BOARDING
        />
      </div>
    );
  })

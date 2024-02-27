// @flow
import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import type { UpcomingTripPage } from 'src/shared/flow-typed/shared.types';

const getUpcomingTrips = (state) => _.get(state, 'app.upcomingTrips', {});

export const getTripsThatNeedToCheckIn = createSelector(
  [getUpcomingTrips],
  (upcomingTrips: { upcomingTripsPage?: Array<UpcomingTripPage> }) =>
    _.filter(
      upcomingTrips.upcomingTripsPage || [],
      (trip) => trip.isWithin24Hours && !_.isEmpty(trip._links.checkInViewReservationPage)
    )
);

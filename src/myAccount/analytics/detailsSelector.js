import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getUpcomingTripsPage = (state) => _.get(state, 'app.upcomingTrips.upcomingTripsPage');

export const getDetails = createSelector([getUpcomingTripsPage], (upcomingTripsPage = {}) => {
  const checkInButton = upcomingTripsPage
    .flatMap((trip = {}) => trip.pages || [])
    .some((bound = {}) => bound.isCheckInEligible && !bound.isCheckedIn);

  return { checkInButton };
});

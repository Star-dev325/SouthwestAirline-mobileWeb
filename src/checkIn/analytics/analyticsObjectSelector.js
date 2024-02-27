import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getCheckInViewReservationPageAnalytics = (state) =>
  _.get(state, 'app.checkIn.checkInViewReservationPage._analytics');
const getCheckInConfirmationPageAnalytics = (state) => _.get(state, 'app.checkIn.checkInConfirmationPage._analytics');

const getAnalyticsObject = (checkInViewReservationPageAnalytics, checkInConfirmationPageAnalytics) => {
  if (checkInConfirmationPageAnalytics) {
    return { ...checkInConfirmationPageAnalytics };
  } else {
    return { ...checkInViewReservationPageAnalytics };
  }
};

export const getOriginDestination = createSelector(
  [getCheckInViewReservationPageAnalytics, getCheckInConfirmationPageAnalytics],
  (checkInViewReservationPageAnalytics, checkInConfirmationPageAnalytics) => ({
    ...getAnalyticsObject(checkInViewReservationPageAnalytics, checkInConfirmationPageAnalytics)
  })
);

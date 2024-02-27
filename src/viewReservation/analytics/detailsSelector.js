import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getViewReservation = (state) => _.get(state, 'app.viewReservation');

const getNameChangeData = (state) => _.get(state, 'app.viewReservation.travelInformationPage.analytics');

const DEFAULT_NAME = '';
const isNameChanged = (origName, newName) => {
  const formValuesAllowNullToEqualEmptyString = origName === null && newName === '';

  return !_.isEqual(origName, newName) && !formValuesAllowNullToEqualEmptyString;
};

export const getDetails = createSelector([getViewReservation, getNameChangeData], (reservation, nameChangeData) => {
  const viewResAnalytics = _.get(reservation, 'flightReservation.viewReservationAnalytics', {});
  const _analytics = _.get(reservation, 'flightReservation._analytics', {});
  const isOnStandby = _.chain(reservation.flightReservation).get('bounds').some('standbyFlight').value();
  const isMultiPax = _.get(reservation, 'flightReservation.passengers', 0).length > 1;
  const isReaccom = _.get(reservation, 'flightReservation._links.reaccom') !== null;
  let daysToTrip = _.get(reservation, 'travelInformationPage.response.editPNRPassengerPage._analytics.daysToTrip');

  if (daysToTrip === '0') {
    daysToTrip = 'Zero';
  }

  const nameDataExists =
    !_.isEmpty(_.get(nameChangeData, 'origName')) && !_.isEmpty(_.get(nameChangeData, 'changedName'));
  const travelerNameAnalytics = {
    change: {
      firstName:
        nameDataExists &&
        isNameChanged(
          _.get(nameChangeData, 'origName.firstName', DEFAULT_NAME),
          _.get(nameChangeData, 'changedName.firstName', DEFAULT_NAME)
        ),
      middleName:
        nameDataExists &&
        isNameChanged(
          _.get(nameChangeData, 'origName.middleName', DEFAULT_NAME),
          _.get(nameChangeData, 'changedName.middleName', DEFAULT_NAME)
        ),
      lastName:
        nameDataExists &&
        isNameChanged(
          _.get(nameChangeData, 'origName.lastName', DEFAULT_NAME),
          _.get(nameChangeData, 'changedName.lastName', DEFAULT_NAME)
        )
    }
  };
  const isCheckInEligible = _.get(reservation, 'flightReservation.isCheckInEligible', false);
  const isCheckedIn = _.get(reservation, 'flightReservation.isCheckedIn', false);
  const checkInButton = isCheckInEligible && !isCheckedIn;

  return {
    isOnStandby,
    isMultiPax,
    isReaccom,
    daysToTrip,
    checkInButton,
    ...viewResAnalytics,
    ..._analytics,
    ...travelerNameAnalytics
  };
});

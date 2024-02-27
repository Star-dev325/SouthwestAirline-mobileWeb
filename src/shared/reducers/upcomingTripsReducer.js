import _ from 'lodash';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import myAccountActionTypes from 'src/myAccount/actions/myAccountActionTypes';

const { SHARED__FETCH_UPCOMING_TRIPS, SHARED__FETCH_UPCOMING_TRIPS_SUCCESS } = SharedActionTypes;

const {
  MY_ACCOUNT__FETCH_UPCOMING_TRIPS,
  MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS,
  MY_ACCOUNT__CLEAR_UPCOMING_TRIPS,
  MY_ACCOUNT__FETCH_ACCOUNT_INFO
} = myAccountActionTypes;

export const upcomingTrips = (state = {}, action = {}) => {
  switch (action.type) {
    case SHARED__FETCH_UPCOMING_TRIPS:
    case MY_ACCOUNT__FETCH_UPCOMING_TRIPS:
    case MY_ACCOUNT__CLEAR_UPCOMING_TRIPS:
    case MY_ACCOUNT__FETCH_ACCOUNT_INFO:
      return {};
    case SHARED__FETCH_UPCOMING_TRIPS_SUCCESS:
    case MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS:
      return _.cloneDeep(action.response);
    default:
      return state;
  }
};

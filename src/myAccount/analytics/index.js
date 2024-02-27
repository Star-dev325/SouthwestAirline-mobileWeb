import MyAccountActionTypes from 'src/myAccount/actions/myAccountActionTypes';
import { getDetails } from 'src/myAccount/analytics/detailsSelector';
import { upcomingTripsMktgSelector } from 'src/myAccount/analytics/upcomingTripsMktgSelector';
import {
  generateUpdatedFlowStoreForAnalytics,
  generateFlowActionListForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';

const { MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS } = MyAccountActionTypes;
const upcomingTripsSelector = {
  details: {
    actions: [MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS],
    selector: getDetails
  }
};

export const generateUpcomingTripsStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(upcomingTripsSelector, state, actionType);

export const analyticsActionsForUpcomingTrips = generateFlowActionListForAnalytics(upcomingTripsSelector);

export const dataLayerSelectorsForUpcomingTrips = {
  [MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS]: upcomingTripsMktgSelector
};

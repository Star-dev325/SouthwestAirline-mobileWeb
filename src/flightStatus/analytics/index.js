import {
  generateUpdatedFlowStoreForAnalytics,
  generateFlowActionListForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';
import flightStatusActionTypes from 'src/flightStatus/actions/flightStatusActionTypes';
import { getSearch } from 'src/flightStatus/analytics/searchSelector';
import { getFlightDetails } from 'src/flightStatus/analytics/flightDetailsSelector';

const {
  FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS_SUCCESS,
  FLIGHT_STATUS__FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS_SUCCESS,
  FLIGHT_STATUS__SAVE_SELECTED_RECENT_SEARCH_REQUEST,
  FLIGHT_STATUS__LOOKUP_FLIGHT_DETAILS_SUCCESS
} = flightStatusActionTypes;

const flightStatusSelectors = {
  search: {
    actions: [
      FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS_SUCCESS,
      FLIGHT_STATUS__FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS_SUCCESS,
      FLIGHT_STATUS__SAVE_SELECTED_RECENT_SEARCH_REQUEST
    ],
    selector: getSearch
  },
  flightDetails: {
    actions: [FLIGHT_STATUS__LOOKUP_FLIGHT_DETAILS_SUCCESS],
    selector: getFlightDetails
  }
};

export const generateUpdatedFlightStatusStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(flightStatusSelectors, state, actionType);

export const analyticsActionsForFlightStatus = generateFlowActionListForAnalytics(flightStatusSelectors);

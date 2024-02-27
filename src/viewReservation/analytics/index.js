import airCancelActionTypes from 'src/airCancel/actions/airCancelActionTypes';
import { sameDayBoundSelectionPageMktgSelector } from 'src/sameDay/analytics/sameDayBoundSelectionPageMktgSelector';
import {
  generateUpdatedFlowStoreForAnalytics,
  generateFlowActionListForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';
import viewReservationActionTypes from 'src/viewReservation/actions/viewReservationActionTypes';
import { getDetails } from 'src/viewReservation/analytics/detailsSelector';
import { flightViewReservationMktgSelector } from 'src/viewReservation/analytics/flightViewReservationMktgSelector';
import { getIsNonRevPnr } from 'src/viewReservation/analytics/nonRevSelector';
import { getPnr } from 'src/viewReservation/analytics/pnrSelector';

const { AIR_CANCEL__RESET_FLOW_DATA } = airCancelActionTypes;

const {
  VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION,
  VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS,
  VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO_SUCCESS,
  VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION_SUCCESS
} = viewReservationActionTypes;

const viewReservationSelector = {
  details: {
    actions: [
      VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS,
      VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION_SUCCESS,
      AIR_CANCEL__RESET_FLOW_DATA
    ],
    selector: getDetails
  },
  search: {
    actions: [VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION],
    selector: getPnr
  },
  isnonrev: {
    actions: [VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS],
    selector: getIsNonRevPnr
  }
};

export const generateViewReservationStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(viewReservationSelector, state, actionType);

export const analyticsActionsForViewReservation = generateFlowActionListForAnalytics(viewReservationSelector);

export const dataLayerSelectorsForViewReservation = {
  [VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS]: flightViewReservationMktgSelector,
  [VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO_SUCCESS]: sameDayBoundSelectionPageMktgSelector
};

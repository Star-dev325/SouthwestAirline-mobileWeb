import {
  generateUpdatedFlowStoreForAnalytics,
  generateFlowActionListForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';
import airCancelActionTypes from 'src/airCancel/actions/airCancelActionTypes';
import { flightCancelMktgSelector } from 'src/airCancel/analytics/flightCancelMktgSelector';
import { flightCancelRefundMktgSelector } from 'src/airCancel/analytics/flightCancelRefundMktgSelector';
import { flightCancelConfirmationMktgSelector } from 'src/airCancel/analytics/flightCancelConfirmationMktgSelector';
import { flightCancelSelectBoundMktgSelector } from 'src/airCancel/analytics/flightCancelSelectBoundMktgSelector';
import { getOriginalReservation } from 'src/airCancel/analytics/originalReservationSelector';

const {
  AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS,
  AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS,
  AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS,
  AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_SUCCESS,
  AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL_SUCCESS,
  AIR_CANCEL__RESET_FLOW_DATA,
  AIR_CANCEL__SELECT_BOUND_ANALYTICS
} = airCancelActionTypes;

const airCancelSelectors = {
  originalReservation: {
    actions: [
      AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_SUCCESS,
      AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS,
      AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS,
      AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS,
      AIR_CANCEL__RESET_FLOW_DATA
    ],
    selector: getOriginalReservation
  }
};

export const generateUpdatedAirCancelStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(airCancelSelectors, state, actionType);

export const analyticsActionsForAirCancel = generateFlowActionListForAnalytics(airCancelSelectors);
export const dataLayerSelectorsForAirCancel = {
  [AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS]: flightCancelMktgSelector,
  [AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS]: flightCancelRefundMktgSelector,
  [AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS]: flightCancelConfirmationMktgSelector,
  [AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL_SUCCESS]: flightCancelMktgSelector,
  [AIR_CANCEL__SELECT_BOUND_ANALYTICS]: flightCancelSelectBoundMktgSelector
};

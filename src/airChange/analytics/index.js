import AirChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';
import { flightChangeConfirmationMktgSelector } from 'src/airChange/analytics/flightChangeConfirmationMktgSelector';
import { flightChangeMktgSelector } from 'src/airChange/analytics/flightChangeMktgSelector';
import { flightChangePricingMktgSelector } from 'src/airChange/analytics/flightChangePricingMktgSelector';
import { flightChangeSelectedBoundsMktgSelector } from 'src/airChange/analytics/flightChangeSelectedBoundsMktgSelector';
import { flightChangeSelectedFlightMktgSelector } from 'src/airChange/analytics/flightChangeSelectedFlightMktgSelector';
import { flightChangeShoppingMktgSelector } from 'src/airChange/analytics/flightChangeShoppingMktgSelector';
import { flightReaccomConfirmationMktgSelector } from 'src/airChange/analytics/flightReaccomConfirmationMktgSelector';
import { flightReaccomSelectFlightMktgSelector } from 'src/airChange/analytics/flightReaccomSelectFlightMktgSelector';
import { flightReaccomShoppingMktgSelector } from 'src/airChange/analytics/flightReaccomShoppingMktgSelector';
import { flightReaccomSummaryMktgSelector } from 'src/airChange/analytics/flightReaccomSummaryMktgSelector';
import { getFlightSelections } from 'src/airChange/analytics/flightSelectionsSelectors';
import { getPayment } from 'src/airChange/analytics/paymentSelectors';
import { getSearch } from 'src/airChange/analytics/searchSelectors';
import { selectFlightPageMktgSelector } from 'src/airChange/analytics/selectFlightPageMktgSelector';
import { getSwabiz } from 'src/airChange/analytics/swabizSelectors';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';
import {
  generateUpdatedFlowStoreForAnalytics,
  generateFlowActionListForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';

const {
  AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION_SUCCESS,
  AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS,
  AIR_CHANGE__FETCH_FLIGHT_SHOPPING_SUCCESS,
  AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE_SUCCESS,
  AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE_SUCCESS,
  AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING_SUCCESS,
  AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE_SUCCESS,
  AIR_CHANGE__FETCH_SPLIT_PNR_RESERVATION_SUCCESS,
  AIR_CHANGE__REACCOM_SAVE_SELECTED_PRODUCTS,
  AIR_CHANGE__SAVE_PAYMENT_INFO,
  AIR_CHANGE__SAVE_SELECTED_BOUNDS,
  AIR_CHANGE__SAVE_SELECTED_FLIGHT,
  AIR_CHANGE__SAVE_SHOPPING_SEARCH_REQUEST,
  AIR_CHANGE__SELECT_BOUND_ANALYICS
} = AirChangeActionTypes;

const { TRACE_AIR_CHANGE_PAYMENT_TYPE } = AnalyticsActionTypes;

const airChangeSelectors = {
  originalReservation: {
    actions: [AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE_SUCCESS],
    selector: getSwabiz
  },
  search: {
    actions: [AIR_CHANGE__SAVE_SHOPPING_SEARCH_REQUEST],
    selector: getSearch
  },
  payment: {
    actions: [
      TRACE_AIR_CHANGE_PAYMENT_TYPE,
      AIR_CHANGE__SAVE_PAYMENT_INFO,
      AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION_SUCCESS
    ],
    selector: getPayment
  },
  flightSelections: {
    actions: [AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS, AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION_SUCCESS],
    selector: getFlightSelections
  }
};

export const generateUpdatedAirChangeStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(airChangeSelectors, state, actionType);

export const analyticsActionsForAirChange = generateFlowActionListForAnalytics(airChangeSelectors);
export const dataLayerSelectorsForAirChange = {
  [AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION_SUCCESS]: flightChangeConfirmationMktgSelector,
  [AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS]: flightChangePricingMktgSelector,
  [AIR_CHANGE__FETCH_FLIGHT_SHOPPING_SUCCESS]: flightChangeShoppingMktgSelector,
  [AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE_SUCCESS]: flightReaccomConfirmationMktgSelector,
  [AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE_SUCCESS]: flightReaccomSelectFlightMktgSelector,
  [AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING_SUCCESS]: flightReaccomShoppingMktgSelector,
  [AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE_SUCCESS]: flightChangeMktgSelector,
  [AIR_CHANGE__FETCH_SPLIT_PNR_RESERVATION_SUCCESS]: selectFlightPageMktgSelector,
  [AIR_CHANGE__REACCOM_SAVE_SELECTED_PRODUCTS]: flightReaccomSummaryMktgSelector,
  [AIR_CHANGE__SAVE_SELECTED_BOUNDS]: flightChangeSelectedBoundsMktgSelector,
  [AIR_CHANGE__SAVE_SELECTED_FLIGHT]: flightChangeSelectedFlightMktgSelector,
  [AIR_CHANGE__SELECT_BOUND_ANALYICS]: selectFlightPageMktgSelector
};

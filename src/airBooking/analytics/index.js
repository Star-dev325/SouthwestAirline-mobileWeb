import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import { getChase } from 'src/airBooking/analytics/chaseSelector';
import { getConfirmation } from 'src/airBooking/analytics/confirmationSelector';
import { flightConfirmationMktgSelector } from 'src/airBooking/analytics/flightConfirmationMktgSelector';
import { flightPricingMktgSelector } from 'src/airBooking/analytics/flightPricingMktgSelector';
import { getFlightSelections } from 'src/airBooking/analytics/flightSelectionsSelector';
import { flightShoppingMktgSelector } from 'src/airBooking/analytics/flightShoppingMktgSelector';
import { flightShoppingMultiSelectMktgSelector } from 'src/airBooking/analytics/flightShoppingMultiSelectMktgSelector';
import { frequentTravelerMktgSelector } from 'src/airBooking/analytics/frequentTravelerMktgSelector';
import { getAmadeusShoppingIds } from 'src/airBooking/analytics/getAmadeusShoppingIdsSelector';
import { getLowFareCalendarRequest } from 'src/airBooking/analytics/lowFareCalendarSelector';
import { passengerInfoMktgSelector } from 'src/airBooking/analytics/passengerInfoMktgSelector';
import { getPassengers } from 'src/airBooking/analytics/passengersSelector';
import { getPayment } from 'src/airBooking/analytics/paymentSelector';
import { getPricing } from 'src/airBooking/analytics/pricingSelector';
import { purchaseSummaryMktgSelector } from 'src/airBooking/analytics/purchaseSummaryMktgSelector';
import { getResults } from 'src/airBooking/analytics/resultsSelector';
import { getReview } from 'src/airBooking/analytics/reviewSelector';
import { getSearch } from 'src/airBooking/analytics/searchSelector';
import { selectedFlightMktgSelector } from 'src/airBooking/analytics/selectedFlightMktgSelector';
import { selectedFrequentTravelerMktgSelector } from 'src/airBooking/analytics/selectedFrequentTravelerMktgSelector';
import { youngTravelerPageMktgSelector } from 'src/airBooking/analytics/youngTravelerPageMktgSelector';
import ChaseActionTypes from 'src/chase/actions/chaseActionTypes';
import CreditCardActionTypes from 'src/shared/actions/creditCardActionTypes';
import analyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';
import {
  generateFlowActionListForAnalytics, generateUpdatedFlowStoreForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';

const {
  AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE,
  AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS,
  AIR_BOOKING__UPDATE_FLIGHT_INITIAL_SEARCH,
  AIR_BOOKING__SORT_FLIGHT_SHOPPING_PAGE_BY,
  AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE_SUCCESS,
  AIR_BOOKING__SAVE_PASSENGER,
  AIR_BOOKING__PREFILL_PASSENGER_INFO,
  AIR_BOOKING__UPDATE_PASSENGER,
  AIR_BOOKING__SAVE_PAYMENT_INFO,
  AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS,
  AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
  AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_FAILED,
  AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE,
  AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS,
  AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_SUCCESS,
  AIR_BOOKING__RESET_AIR_BOOKING_FLOW_DATA,
  AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_OUTBOUND_ANALYTICS,
  AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_INBOUND_ANALYTICS,
  AIR_BOOKING__RESUME_AIR_BOOKING_FLOW_DATA,
  AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS,
  AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_FAILED,
  AIR_BOOKING__SAVE_SELECTED_FLIGHT,
  AIR_BOOKING__LOAD_FREQUENT_TRAVELER_PAGE,
  AIR_BOOKING__SELECTED_FREQUENT_TRAVELER,
  AIR_BOOKING__FETCH_FLIGHT_SHOPPING_MULTI_SELECT_PAGE_SUCCESS
} = AirBookingActionTypes;

const { CHASE__UPDATE_CHASE_FLOW_COMPLETED } = ChaseActionTypes;

const { SWITCH_EARLYBIRD_IN_PATH_BUTTON, TRACE_YOUNG_TRAVELER_PAGE } = analyticsActionTypes;

const { CREDIT_CARD__SET_SAVED_CREDIT_CARDS } = CreditCardActionTypes;

const airBookingSelectors = {
  flightSelections: {
    actions: [AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE_SUCCESS],
    selector: getFlightSelections
  },
  search: {
    actions: [AIR_BOOKING__UPDATE_FLIGHT_INITIAL_SEARCH, AIR_BOOKING__RESUME_AIR_BOOKING_FLOW_DATA],
    selector: getSearch
  },
  results: {
    actions: [AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS, AIR_BOOKING__SORT_FLIGHT_SHOPPING_PAGE_BY],
    selector: getResults
  },
  pricing: {
    actions: [
      AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS,
      AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_FAILED,
      AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE_SUCCESS,
      CHASE__UPDATE_CHASE_FLOW_COMPLETED
    ],
    selector: getPricing
  },
  passengers: {
    actions: [AIR_BOOKING__PREFILL_PASSENGER_INFO, AIR_BOOKING__SAVE_PASSENGER, AIR_BOOKING__UPDATE_PASSENGER],
    selector: getPassengers
  },
  payment: {
    actions: [
      AIR_BOOKING__SAVE_PAYMENT_INFO,
      AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS,
      CREDIT_CARD__SET_SAVED_CREDIT_CARDS,
      AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS
    ],
    selector: getPayment
  },
  review: {
    actions: [
      AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
      AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_FAILED,
      SWITCH_EARLYBIRD_IN_PATH_BUTTON,
      AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE,
      AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE_SUCCESS
    ],
    selector: getReview
  },
  confirmation: {
    actions: [AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS],
    selector: getConfirmation
  },
  chase: {
    actions: [AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS],
    selector: getChase
  },
  lowFareCalendar: {
    actions: [
      AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_SUCCESS,
      AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS,
      AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_OUTBOUND_ANALYTICS,
      AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_INBOUND_ANALYTICS,
      AIR_BOOKING__RESET_AIR_BOOKING_FLOW_DATA
    ],
    selector: getLowFareCalendarRequest
  },
  amadeus: {
    actions: [AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS, AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE],
    selector: getAmadeusShoppingIds
  }
};

export const generateUpdatedAirBookingStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(airBookingSelectors, state, actionType);

export const analyticsActionsForAirBooking = generateFlowActionListForAnalytics(airBookingSelectors);
export const dataLayerSelectorsForAirBooking = {
  [AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS]: flightConfirmationMktgSelector,
  [AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS]: purchaseSummaryMktgSelector,
  [AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE_SUCCESS]: flightPricingMktgSelector,
  [AIR_BOOKING__FETCH_FLIGHT_SHOPPING_MULTI_SELECT_PAGE_SUCCESS]: flightShoppingMultiSelectMktgSelector,
  [AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS]: flightShoppingMktgSelector,
  [AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS]: passengerInfoMktgSelector,
  [AIR_BOOKING__LOAD_FREQUENT_TRAVELER_PAGE]: frequentTravelerMktgSelector,
  [AIR_BOOKING__SAVE_SELECTED_FLIGHT]: selectedFlightMktgSelector,
  [AIR_BOOKING__SELECTED_FREQUENT_TRAVELER]: selectedFrequentTravelerMktgSelector,
  [TRACE_YOUNG_TRAVELER_PAGE]: youngTravelerPageMktgSelector
};

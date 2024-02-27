jest.mock('src/airBooking/analytics/flightShoppingMktgSelector', () => ({
  flightShoppingMktgSelector: jest.fn(() => 'flight shopping data')
}));
jest.mock('src/airBooking/analytics/flightPricingMktgSelector', () => ({
  flightPricingMktgSelector: jest.fn(() => 'flight pricing data')
}));
jest.mock('src/airBooking/analytics/flightConfirmationMktgSelector', () => ({
  flightConfirmationMktgSelector: jest.fn(() => 'flight confirmation data')
}));
jest.mock('src/airBooking/analytics/frequentTravelerMktgSelector', () => ({
  frequentTravelerMktgSelector: jest.fn(() => 'frequent traveler data')
}));
jest.mock('src/airBooking/analytics/passengerInfoMktgSelector', () => ({
  passengerInfoMktgSelector: jest.fn(() => 'passenger info data')
}));
jest.mock('src/airBooking/analytics/selectedFrequentTravelerMktgSelector', () => ({
  selectedFrequentTravelerMktgSelector: jest.fn(() => 'selected frequent traveler')
}));
jest.mock('src/airBooking/analytics/flightShoppingMultiSelectMktgSelector', () => ({
  flightShoppingMultiSelectMktgSelector: jest.fn(() => 'multiselect data')
}));
jest.mock('src/airBooking/analytics/youngTravelerPageMktgSelector', () => ({
  youngTravelerPageMktgSelector: jest.fn(() => 'young traveler data')
}));
jest.mock('src/shared/analytics/helpers/analyticsHelper', () => ({
  generateFlowActionListForAnalytics: jest.fn(() => [
    AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS,
    AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE,
    AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_FAILED,
    AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
    AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE_SUCCESS,
    AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE,
    AIR_BOOKING__FETCH_FLIGHT_SHOPPING_MULTI_SELECT_PAGE_SUCCESS,
    AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS,
    AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_SUCCESS,
    AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_FAILED,
    AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS,
    AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS,
    AIR_BOOKING__PREFILL_PASSENGER_INFO,
    AIR_BOOKING__RESET_AIR_BOOKING_FLOW_DATA,
    AIR_BOOKING__RESUME_AIR_BOOKING_FLOW_DATA,
    AIR_BOOKING__SAVE_PASSENGER,
    AIR_BOOKING__SAVE_PAYMENT_INFO,
    AIR_BOOKING__SORT_FLIGHT_SHOPPING_PAGE_BY,
    AIR_BOOKING__UPDATE_FLIGHT_INITIAL_SEARCH,
    AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_INBOUND_ANALYTICS,
    AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_OUTBOUND_ANALYTICS,
    AIR_BOOKING__UPDATE_PASSENGER,
    SWITCH_EARLYBIRD_IN_PATH_BUTTON,
    CHASE__UPDATE_CHASE_FLOW_COMPLETED,
    FETCH_SAVED_CREDIT_CARDS
  ]),
  generateUpdatedFlowStoreForAnalytics: jest.fn((selectors, state, actionType) => {
    switch (actionType) {
      case 'AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS': {
        return { results: 'result data', lowFareCalendar: 'lfc data', amadeus: 'amadeus data' };
      }
      case 'AIR_BOOKING__UPDATE_FLIGHT_INITIAL_SEARCH': {
        return { search: 'search data' };
      }
      case 'AIR_BOOKING__RESUME_AIR_BOOKING_FLOW_DATA': {
        return { search: 'search data' };
      }
      case 'NOT_LISTENING_ACTION': {
        return {};
      }
      case 'AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE_SUCCESS': {
        return {
          pricing: 'pricing data',
          flightSelections: 'flightSelections data',
          review: 'review data'
        };
      }
      case 'AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS': {
        return {
          confirmation: 'confirmation data',
          payment: 'payment data'
        };
      }
      case 'AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_SUCCESS': {
        return { lowFareCalendar: 'lfc data' };
      }
      case 'AIR_BOOKING__RESET_AIR_BOOKING_FLOW_DATA': {
        return { lowFareCalendar: 'lfc data' };
      }
      case 'AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_OUTBOUND_ANALYTICS': {
        return { lowFareCalendar: 'lfc data' };
      }
      case 'AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_INBOUND_ANALYTICS': {
        return { lowFareCalendar: 'lfc data' };
      }
    }
  })
}));

import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import * as AirBookingAnalytics from 'src/airBooking/analytics/index';
import ChaseActionTypes from 'src/chase/actions/chaseActionTypes';
import CreditCardActionTypes from 'src/shared/actions/creditCardActionTypes';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';
import { generateFlowActionListForAnalytics } from 'src/shared/analytics/helpers/analyticsHelper';

const {
  AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS,
  AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE,
  AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_FAILED,
  AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
  AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE_SUCCESS,
  AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE,
  AIR_BOOKING__FETCH_FLIGHT_SHOPPING_MULTI_SELECT_PAGE_SUCCESS,
  AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS,
  AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_SUCCESS,
  AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_FAILED,
  AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS,
  AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS,
  AIR_BOOKING__LOAD_FREQUENT_TRAVELER_PAGE,
  AIR_BOOKING__PREFILL_PASSENGER_INFO,
  AIR_BOOKING__RESET_AIR_BOOKING_FLOW_DATA,
  AIR_BOOKING__RESUME_AIR_BOOKING_FLOW_DATA,
  AIR_BOOKING__SAVE_PASSENGER,
  AIR_BOOKING__SAVE_PAYMENT_INFO,
  AIR_BOOKING__SELECTED_FREQUENT_TRAVELER,
  AIR_BOOKING__SORT_FLIGHT_SHOPPING_PAGE_BY,
  AIR_BOOKING__UPDATE_FLIGHT_INITIAL_SEARCH,
  AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_INBOUND_ANALYTICS,
  AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_OUTBOUND_ANALYTICS,
  AIR_BOOKING__UPDATE_PASSENGER
} = AirBookingActionTypes;

const {
  SWITCH_EARLYBIRD_IN_PATH_BUTTON,
  TRACE_YOUNG_TRAVELER_PAGE
} = AnalyticsActionTypes;

const {
  CHASE__UPDATE_CHASE_FLOW_COMPLETED
} = ChaseActionTypes;

const {
  FETCH_SAVED_CREDIT_CARDS
} = CreditCardActionTypes;

const mockActionData = [
  AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS,
  AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE,
  AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_FAILED,
  AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
  AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE_SUCCESS,
  AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE,
  AIR_BOOKING__FETCH_FLIGHT_SHOPPING_MULTI_SELECT_PAGE_SUCCESS,
  AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS,
  AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_SUCCESS,
  AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_FAILED,
  AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS,
  AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS,
  AIR_BOOKING__PREFILL_PASSENGER_INFO,
  AIR_BOOKING__RESET_AIR_BOOKING_FLOW_DATA,
  AIR_BOOKING__RESUME_AIR_BOOKING_FLOW_DATA,
  AIR_BOOKING__SAVE_PASSENGER,
  AIR_BOOKING__SAVE_PAYMENT_INFO,
  AIR_BOOKING__SORT_FLIGHT_SHOPPING_PAGE_BY,
  AIR_BOOKING__UPDATE_FLIGHT_INITIAL_SEARCH,
  AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_INBOUND_ANALYTICS,
  AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_OUTBOUND_ANALYTICS,
  AIR_BOOKING__UPDATE_PASSENGER,
  SWITCH_EARLYBIRD_IN_PATH_BUTTON,
  CHASE__UPDATE_CHASE_FLOW_COMPLETED,
  FETCH_SAVED_CREDIT_CARDS
];

describe('index', () => {
  describe('analyticsActionsForAirBooking', () => {
    it('should return analytics actions for airBooking from selectors', () => {
      expect(generateFlowActionListForAnalytics()).toStrictEqual(mockActionData);
    });
  });

  describe('dataLayerSelectorsForAirBooking', () => {
    it('should return the selectors used for the marketing data layer', () => {
      expect(
        AirBookingAnalytics.dataLayerSelectorsForAirBooking[AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE_SUCCESS]()
      ).toStrictEqual('flight pricing data');
      expect(
        AirBookingAnalytics.dataLayerSelectorsForAirBooking[AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS]()
      ).toStrictEqual('flight confirmation data');
      expect(
        AirBookingAnalytics.dataLayerSelectorsForAirBooking[AIR_BOOKING__LOAD_FREQUENT_TRAVELER_PAGE]()
      ).toStrictEqual('frequent traveler data');
      expect(
        AirBookingAnalytics.dataLayerSelectorsForAirBooking[
          AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS
        ]()
      ).toStrictEqual('passenger info data');
      expect(
        AirBookingAnalytics.dataLayerSelectorsForAirBooking[AIR_BOOKING__SELECTED_FREQUENT_TRAVELER]()
      ).toStrictEqual('selected frequent traveler');
      expect(
        AirBookingAnalytics.dataLayerSelectorsForAirBooking[
          AIR_BOOKING__FETCH_FLIGHT_SHOPPING_MULTI_SELECT_PAGE_SUCCESS
        ]()
      ).toStrictEqual('multiselect data');
      expect(
        AirBookingAnalytics.dataLayerSelectorsForAirBooking[TRACE_YOUNG_TRAVELER_PAGE]()
      ).toStrictEqual('young traveler data');
    });
  });

  describe('generateAirBookingStore', () => {
    it('should generate fields that listen to FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS action', () => {
      const triggeredActionType = AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS;

      const updatedData = AirBookingAnalytics.generateUpdatedAirBookingStore('state', triggeredActionType);

      expect(updatedData).toStrictEqual({
        results: 'result data',
        lowFareCalendar: 'lfc data',
        amadeus: 'amadeus data'
      });
    });

    it('should generate fields that listen to AIR_BOOKING__UPDATE_FLIGHT_INITIAL_SEARCH action', () => {
      const triggeredActionType = AIR_BOOKING__UPDATE_FLIGHT_INITIAL_SEARCH;

      const updatedData = AirBookingAnalytics.generateUpdatedAirBookingStore('state', triggeredActionType);

      expect(updatedData).toStrictEqual({
        search: 'search data'
      });
    });

    it('should update AirBookingStore searchRequest that listen to AIR_BOOKING__RESUME_AIR_BOOKING_FLOW_DATA action', () => {
      const triggeredActionType = AIR_BOOKING__RESUME_AIR_BOOKING_FLOW_DATA;

      const updatedData = AirBookingAnalytics.generateUpdatedAirBookingStore('state', triggeredActionType);

      expect(updatedData).toStrictEqual({
        search: 'search data'
      });
    });

    it('should not generate any field when no selector listen to triggered action', () => {
      const triggeredActionType = 'NOT_LISTENING_ACTION';

      const updatedData = AirBookingAnalytics.generateUpdatedAirBookingStore('state', triggeredActionType);

      expect(updatedData).toStrictEqual({});
    });

    it('should generate pricing field that listens to FETCH_FLIGHT_PRICING_PAGE_SUCCESS acton', () => {
      const triggeredActionType = AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE_SUCCESS;

      const updatedData = AirBookingAnalytics.generateUpdatedAirBookingStore('state', triggeredActionType);

      expect(updatedData).toStrictEqual({
        pricing: 'pricing data',
        flightSelections: 'flightSelections data',
        review: 'review data'
      });
    });

    it('should generate confirmation field that listens to FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS acton', () => {
      const triggeredActionType = AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS;

      const updatedData = AirBookingAnalytics.generateUpdatedAirBookingStore('state', triggeredActionType);

      expect(updatedData).toStrictEqual({
        confirmation: 'confirmation data',
        payment: 'payment data'
      });
    });

    it('should generate lfc field that listens to FETCH_LOW_FARE_CALENDAR_SUCCESS acton', () => {
      const triggeredActionType = AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_SUCCESS;

      const updatedData = AirBookingAnalytics.generateUpdatedAirBookingStore('state', triggeredActionType);

      expect(updatedData).toStrictEqual({
        lowFareCalendar: 'lfc data'
      });
    });

    it('should generate lfc field that listens to AIR_BOOKING__RESET_AIR_BOOKING_FLOW_DATA acton', () => {
      const triggeredActionType = AIR_BOOKING__RESET_AIR_BOOKING_FLOW_DATA;

      const updatedData = AirBookingAnalytics.generateUpdatedAirBookingStore('state', triggeredActionType);

      expect(updatedData).toStrictEqual({
        lowFareCalendar: 'lfc data'
      });
    });

    it('should generate lfc field that listens to AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_OUTBOUND_ANALYTICS acton', () => {
      const triggeredActionType = AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_OUTBOUND_ANALYTICS;

      const updatedData = AirBookingAnalytics.generateUpdatedAirBookingStore('state', triggeredActionType);

      expect(updatedData).toStrictEqual({
        lowFareCalendar: 'lfc data'
      });
    });

    it('should generate lfc field that listens to AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_INBOUND_ANALYTICS acton', () => {
      const triggeredActionType = AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_INBOUND_ANALYTICS;

      const updatedData = AirBookingAnalytics.generateUpdatedAirBookingStore('state', triggeredActionType);

      expect(updatedData).toStrictEqual({
        lowFareCalendar: 'lfc data'
      });
    });
  });
});

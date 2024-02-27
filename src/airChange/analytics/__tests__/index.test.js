jest.mock('src/airChange/analytics/flightChangeConfirmationMktgSelector', () => ({
  flightChangeConfirmationMktgSelector: jest.fn(() => flightChangeConfirmationMktgData)
}));
jest.mock('src/airChange/analytics/flightChangeMktgSelector', () => ({
  flightChangeMktgSelector: jest.fn(() => flightChangeMktgData)
}));
jest.mock('src/airChange/analytics/flightChangePricingMktgSelector', () => ({
  flightChangePricingMktgSelector: jest.fn(() => flightChangePricingMktgData)
}));
jest.mock('src/airChange/analytics/flightChangeSelectedBoundsMktgSelector', () => ({
  flightChangeSelectedBoundsMktgSelector: jest.fn(() => flightChangeSelectedBoundsMktgSelector)
}));
jest.mock('src/airChange/analytics/flightChangeShoppingMktgSelector', () => ({
  flightChangeShoppingMktgSelector: jest.fn(() => flightChangeShoppingMktgData)
}));
jest.mock('src/airChange/analytics/flightReaccomConfirmationMktgSelector', () => ({
  flightReaccomConfirmationMktgSelector: jest.fn(() => flightReaccomConfirmationMktgData)
}));
jest.mock('src/airChange/analytics/flightReaccomSelectFlightMktgSelector', () => ({
  flightReaccomSelectFlightMktgSelector: jest.fn(() => flightReaccomSelectFlightMktgSelector)
}));
jest.mock('src/airChange/analytics/flightReaccomShoppingMktgSelector', () => ({
  flightReaccomShoppingMktgSelector: jest.fn(() => flightReaccomShoppingMktgSelector)
}));
jest.mock('src/airChange/analytics/flightReaccomSummaryMktgSelector', () => ({
  flightReaccomSummaryMktgSelector: jest.fn(() => flightReaccomSummaryMktgSelector)
}));
jest.mock('src/airChange/analytics/selectFlightPageMktgSelector', () => ({
  selectFlightPageMktgSelector: jest.fn(() => selectPassengersPageMktgData)
}));
jest.mock('src/shared/analytics/helpers/analyticsHelper', () => ({
  generateFlowActionListForAnalytics: jest.fn(() => [
    AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION_SUCCESS,
    AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS,
    AIR_CHANGE__FETCH_FLIGHT_SHOPPING_SUCCESS,
    AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE_SUCCESS,
    AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE_SUCCESS,
    AIR_CHANGE__FETCH_SPLIT_PNR_RESERVATION_SUCCESS,
    AIR_CHANGE__SAVE_PAYMENT_INFO,
    AIR_CHANGE__SAVE_SELECTED_BOUNDS,
    AIR_CHANGE__SAVE_SHOPPING_SEARCH_REQUEST
  ]),
  generateUpdatedFlowStoreForAnalytics: jest.fn((selectors, state, actionType) => {
    switch (actionType) {
      case 'AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE_SUCCESS': {
        return {
          originalReservation: {
            isSwabiz: true
          }
        };
      }
      case 'AIR_CHANGE__SAVE_SHOPPING_SEARCH_REQUEST': {
        return {
          search: { ...searchRequest }
        };
      }
      case 'AIR_CHANGE__SAVE_PAYMENT_INFO': {
        return {
          payment: {
            city: 'Brooklyn',
            state: 'AS',
            saveNewCardSelected: false,
            storedCard: true,
            type: 'VISA',
            zipcode: '12312'
          }
        };
      }
      case 'AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS': {
        return {
          flightSelections: {
            adult: {
              outbound: {
                selectedFareProduct: {
                  fareClass: 'T'
                }
              },
              inbound: {
                selectedFareProduct: {
                  fareClass: 'Z'
                }
              }
            },
            'air.fareClassb1': 'S',
            'air.fareClassb2': 'T',
            'air.fareProductIdb1': 'WGA',
            'air.fareProductIdb2': 'WGA',
            'air.fareTypeb1': 'WGA',
            'air.fareTypeb2': 'WGA'
          }
        };
      }
    }
  })
}));

import airChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';
import { generateFlowActionListForAnalytics } from 'src/shared/analytics/helpers/analyticsHelper';
import * as AirChangeAnalytics from 'src/airChange/analytics/index';

const searchRequest = {
  origin: 'ALB',
  destination: 'ABQ',
  tripType: 'roundTrip',
  departureDate: '2018-10-03',
  returnDate: '2018-10-06',
  promoCodeIsValid: true,
  currentLocationUsed: true
};
const flightChangeConfirmationMktgData = 'flight change confirmation mktg data';
const flightChangeMktgData = 'flight change mktg data';
const flightChangePricingMktgData = 'flight change pricing mktg data';
const flightChangeSelectedBoundsMktgSelector = 'flight change selected bounds mktg data';
const flightChangeShoppingMktgData = 'flight change shopping mktg data';
const flightReaccomConfirmationMktgData = 'flight reaccom confirmation mktg data';
const flightReaccomSelectFlightMktgSelector = 'flight reaccom select flight mktg data';
const flightReaccomShoppingMktgSelector = 'flight reaccom shopping mktg data';
const flightReaccomSummaryMktgSelector = 'flight reaccom summary mktg data';
const selectPassengersPageMktgData = 'select passengers page mktg data';

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
  AIR_CHANGE__SAVE_SHOPPING_SEARCH_REQUEST
} = airChangeActionTypes;

const mockActionData = [
  AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION_SUCCESS,
  AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS,
  AIR_CHANGE__FETCH_FLIGHT_SHOPPING_SUCCESS,
  AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE_SUCCESS,
  AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE_SUCCESS,
  AIR_CHANGE__FETCH_SPLIT_PNR_RESERVATION_SUCCESS,
  AIR_CHANGE__SAVE_PAYMENT_INFO,
  AIR_CHANGE__SAVE_SELECTED_BOUNDS,
  AIR_CHANGE__SAVE_SHOPPING_SEARCH_REQUEST
];

describe('index', () => {
  describe('analyticsActionsForAirChange', () => {
    it('should return analytics actions for airChange from selectors', () => {
      expect(generateFlowActionListForAnalytics()).toStrictEqual(mockActionData);
    });
  });

  describe('dataLayerSelectorsForAirBooking', () => {
    it('should return the selectors used for the marketing data layer', () => {
      expect(
        AirChangeAnalytics.dataLayerSelectorsForAirChange[
          airChangeActionTypes.AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE_SUCCESS
        ]()
      ).toStrictEqual(flightChangeMktgData);
      expect(
        AirChangeAnalytics.dataLayerSelectorsForAirChange[
          airChangeActionTypes.AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS
        ]()
      ).toStrictEqual(flightChangePricingMktgData);
      expect(
        AirChangeAnalytics.dataLayerSelectorsForAirChange[
          airChangeActionTypes.AIR_CHANGE__FETCH_FLIGHT_SHOPPING_SUCCESS
        ]()
      ).toStrictEqual(flightChangeShoppingMktgData);
      expect(
        AirChangeAnalytics.dataLayerSelectorsForAirChange[
          airChangeActionTypes.AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE_SUCCESS
        ]()
      ).toStrictEqual(flightReaccomConfirmationMktgData);
      expect(
        AirChangeAnalytics.dataLayerSelectorsForAirChange[
          airChangeActionTypes.AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION_SUCCESS
        ]()
      ).toStrictEqual(flightChangeConfirmationMktgData);
      expect(
        AirChangeAnalytics.dataLayerSelectorsForAirChange[AIR_CHANGE__FETCH_SPLIT_PNR_RESERVATION_SUCCESS]()
      ).toStrictEqual(selectPassengersPageMktgData);
      expect(
        AirChangeAnalytics.dataLayerSelectorsForAirChange[AIR_CHANGE__SAVE_SELECTED_BOUNDS]()
      ).toStrictEqual(flightChangeSelectedBoundsMktgSelector);
      expect(
        AirChangeAnalytics.dataLayerSelectorsForAirChange[AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE_SUCCESS]()
      ).toStrictEqual(flightReaccomSelectFlightMktgSelector);
      expect(
        AirChangeAnalytics.dataLayerSelectorsForAirChange[AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING_SUCCESS]()
      ).toStrictEqual(flightReaccomShoppingMktgSelector);
      expect(
        AirChangeAnalytics.dataLayerSelectorsForAirChange[AIR_CHANGE__REACCOM_SAVE_SELECTED_PRODUCTS]()
      ).toStrictEqual(flightReaccomSummaryMktgSelector);
    });
  });

  describe('generateUpdatedAirChangeStore', () => {
    it('should generate fields that listen to AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE_SUCCESS action', () => {
      const updateData = AirChangeAnalytics.generateUpdatedAirChangeStore('state', AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE_SUCCESS);

      expect(updateData).toStrictEqual({
        originalReservation: {
          isSwabiz: true
        }
      });
    });

    it('should generate fields that listen to AIR_CHANGE__FETCH_FLIGHT_SHOPPING success or failed action', () => {
      const successSearch = AirChangeAnalytics.generateUpdatedAirChangeStore('state', AIR_CHANGE__SAVE_SHOPPING_SEARCH_REQUEST);

      expect(successSearch).toStrictEqual({
        search: { ...searchRequest }
      });
    });

    it('should generate fields that listen to AIR_CHANGE__SAVE_PAYMENT_INFO action', () => {
      const updateData = AirChangeAnalytics.generateUpdatedAirChangeStore('state', AIR_CHANGE__SAVE_PAYMENT_INFO);

      expect(updateData).toStrictEqual({
        payment: {
          city: 'Brooklyn',
          state: 'AS',
          saveNewCardSelected: false,
          storedCard: true,
          type: 'VISA',
          zipcode: '12312'
        }
      });
    });

    it('should generate fields that listen to AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS action', () => {
      const updateData = AirChangeAnalytics.generateUpdatedAirChangeStore('state', AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS);

      expect(updateData).toStrictEqual({
        flightSelections: {
          adult: {
            outbound: {
              selectedFareProduct: {
                fareClass: 'T'
              }
            },
            inbound: {
              selectedFareProduct: {
                fareClass: 'Z'
              }
            }
          },
          'air.fareClassb1': 'S',
          'air.fareClassb2': 'T',
          'air.fareProductIdb1': 'WGA',
          'air.fareProductIdb2': 'WGA',
          'air.fareTypeb1': 'WGA',
          'air.fareTypeb2': 'WGA'
        }
      });
    });
  });
});

import airCancelActionTypes from 'src/airCancel/actions/airCancelActionTypes';
import { generateFlowActionListForAnalytics } from 'src/shared/analytics/helpers/analyticsHelper';
import ViewReservationActionTypes from 'src/viewReservation/actions/viewReservationActionTypes';
import * as ViewReservationAnalytics from 'src/viewReservation/analytics/index';

const {
  VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS,
  VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION,
  VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO_SUCCESS,
  VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION_SUCCESS
} = ViewReservationActionTypes;

const { AIR_CANCEL__RESET_FLOW_DATA } = airCancelActionTypes;

const mockActionData = [
  VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS,
  VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION,
  VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION_SUCCESS,
  AIR_CANCEL__RESET_FLOW_DATA
];

jest.mock('src/viewReservation/analytics/flightViewReservationMktgSelector', () => ({
  flightViewReservationMktgSelector: jest.fn(() => flightViewReservationMktgData)
}));
jest.mock('src/viewReservation/analytics/detailsSelector', () => ({
  getDetails: jest.fn(() => ({ pnr: 'ABC123', isOnStandby: false, isSwabiz: true }))
}));
jest.mock('src/viewReservation/analytics/pnrSelector', () => ({
  getPnr: jest.fn(() => ({ pnr: 'ABC123' }))
}));
jest.mock('src/shared/analytics/helpers/analyticsHelper', () => ({
  generateFlowActionListForAnalytics: jest.fn(() => [
    VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS,
    VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION,
    VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION_SUCCESS,
    AIR_CANCEL__RESET_FLOW_DATA
  ]),
  generateUpdatedFlowStoreForAnalytics: jest.fn((selectors, state, actionType) => {
    switch (actionType) {
      case 'VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS': {
        return {
          details: {
            pnr: 'ABC123',
            isOnStandby: false,
            isSwabiz: true
          },
          isnonrev: false
        };
      }
      case 'VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION': {
        return {
          search: {
            pnr: 'ABC123'
          }
        };
      }
      case 'VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO_SUCCESS': {
        return {
          boundSelectionMessage: 'Test bound selection message',
          _meta: { showBoundSelection: true }
        };
      }
    }
  })
}));

const flightViewReservationMktgData = 'flight view reservation mktg data';

describe('index', () => {
  describe('analyticsActionsForViewReservation', () => {
    it('should return analytics actions for airChange from selectors', () => {
      expect(generateFlowActionListForAnalytics()).toStrictEqual(mockActionData);
    });
  });

  describe('generateUpdatedViewReservationStore', () => {
    it('should generate fields that listen to VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS action', () => {
      const updateData = ViewReservationAnalytics.generateViewReservationStore(
        'state',
        VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS
      );

      expect(updateData).toStrictEqual({
        details: {
          pnr: 'ABC123',
          isOnStandby: false,
          isSwabiz: true
        },
        isnonrev: false
      });
    });

    it('should generate fields that listen to VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION action', () => {
      const successSearch = ViewReservationAnalytics.generateViewReservationStore(
        'state',
        VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION
      );

      expect(successSearch).toStrictEqual({
        search: {
          pnr: 'ABC123'
        }
      });
    });

    it('should generate fields that listen to VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO_SUCCESS action', () => {
      const successRes = ViewReservationAnalytics.generateViewReservationStore(
        'state',
        VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO_SUCCESS
      );

      expect(successRes).toStrictEqual({
        boundSelectionMessage: 'Test bound selection message',
        _meta: { showBoundSelection: true }
      });
    });
  });

  describe('dataLayerSelectorsForViewReservation', () => {
    it('should return the selector used for the marketing data layer', () => {
      expect(
        ViewReservationAnalytics.dataLayerSelectorsForViewReservation[
          VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS
        ]()
      ).toStrictEqual(flightViewReservationMktgData);
    });
  });
});

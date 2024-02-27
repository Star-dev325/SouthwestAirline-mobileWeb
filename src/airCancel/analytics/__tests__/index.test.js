import airCancelActionTypes from 'src/airCancel/actions/airCancelActionTypes';
import { generateFlowActionListForAnalytics } from 'src/shared/analytics/helpers/analyticsHelper';
import * as AirCancelAnalytics from 'src/airCancel/analytics/index';

const {
  AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS,
  AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS,
  AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS,
  AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_SUCCESS,
  AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL_SUCCESS,
  AIR_CANCEL__RESET_FLOW_DATA
} = airCancelActionTypes;
const flightCancelMktgData = 'flight cancel mktg data';
const flightCancelRefundMktgData = 'flight cancel refund mktg data';
const flightCancelConfirmationMktgData = 'flight cancel confirmation mktg data';

const mockActionData = [
  AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS,
  AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS,
  AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS,
  AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_SUCCESS,
  AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL_SUCCESS,
  AIR_CANCEL__RESET_FLOW_DATA
];

jest.mock('src/airCancel/analytics/swabizSelectors', () => ({
  getSwabiz: jest.fn(() => ({ isSwabiz: true }))
}));
jest.mock('src/airCancel/analytics/flightCancelMktgSelector', () => ({
  flightCancelMktgSelector: jest.fn(() => flightCancelMktgData)
}));
jest.mock('src/airCancel/analytics/flightCancelRefundMktgSelector', () => ({
  flightCancelRefundMktgSelector: jest.fn(() => flightCancelRefundMktgData)
}));
jest.mock('src/airCancel/analytics/flightCancelConfirmationMktgSelector', () => ({
  flightCancelConfirmationMktgSelector: jest.fn(() => flightCancelConfirmationMktgData)
}));
jest.mock('src/shared/analytics/helpers/analyticsHelper', () => ({
  generateFlowActionListForAnalytics: jest.fn(() => mockActionData)
}));
jest.mock('src/airCancel/analytics/flightCancelSelectBoundMktgSelector', () => ({
  flightCancelSelectBoundMktgSelector: jest.fn(() => flightCancelMktgData)
}));

describe('index', () => {
  describe('analyticsActionsForAirCancel', () => {
    it('should return analytics actions for air cancel selectors', () => {
      expect(generateFlowActionListForAnalytics()).toStrictEqual(mockActionData);
    });
  });

  describe('dataLayerSelectorsForAirCancel', () => {
    it('should return the selectors used for the marketing data layer', () => {
      expect(
        AirCancelAnalytics.dataLayerSelectorsForAirCancel[AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS]()
      ).toStrictEqual(flightCancelMktgData);
      expect(
        AirCancelAnalytics.dataLayerSelectorsForAirCancel[AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS]()
      ).toStrictEqual(flightCancelRefundMktgData);
      expect(
        AirCancelAnalytics.dataLayerSelectorsForAirCancel[AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS]()
      ).toStrictEqual(flightCancelConfirmationMktgData);
      expect(
        AirCancelAnalytics.dataLayerSelectorsForAirCancel[AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL_SUCCESS]()
      ).toStrictEqual(flightCancelMktgData);
    });
  });
});

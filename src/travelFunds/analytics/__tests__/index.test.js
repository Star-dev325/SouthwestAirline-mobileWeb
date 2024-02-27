import travelFundActionTypes from 'src/travelFunds/actions/travelFundsActionTypes';
import * as TravelFundsAnalytics from 'src/travelFunds/analytics/index';

const travelFundsConfirmationResponse = 'travel funds confirmation mktg_data';
const travelFundsValidationResponse = 'travel funds validatation mktg_data';
const viewTravelFundResponse = 'view travel fund mktg_data';
const viewUnusedTravelFundsResponse = 'view unused travel funds mktg_data';

jest.mock('src/travelFunds/analytics/travelFundsConfirmationMktgSelector', () => ({
  travelFundsConfirmationMktgSelector: jest.fn(() => travelFundsConfirmationResponse)
}));
jest.mock('src/travelFunds/analytics/travelFundsValidationMktgSelector', () => ({
  travelFundsValidationMktgSelector: jest.fn(() => travelFundsValidationResponse)
}));
jest.mock('src/travelFunds/analytics/viewTravelFundMktgSelector', () => ({
  viewTravelFundMktgSelector: jest.fn(() => viewTravelFundResponse)
}));
jest.mock('src/travelFunds/analytics/viewUnusedTravelFundsMktgSelector', () => ({
  viewUnusedTravelFundsMktgSelector: jest.fn(() => viewUnusedTravelFundsResponse)
}));

describe('index', () => {
  describe('dataLayerSelectorsForTravelFund', () => {
    it('should return the selectors used for the marketing data layer', () => {
      expect(
        TravelFundsAnalytics.dataLayerSelectorsForTravelFunds[
          travelFundActionTypes.TRAVEL_FUNDS__FETCH_TRANSFER_TRAVEL_FUNDS_SUCCESS
        ]()
      ).toStrictEqual(travelFundsConfirmationResponse);
      expect(
        TravelFundsAnalytics.dataLayerSelectorsForTravelFunds[
          travelFundActionTypes.TRAVEL_FUNDS__FETCH_VALIDATE_FUNDS_SUCCESS
        ]()
      ).toStrictEqual(travelFundsValidationResponse);
      expect(
        TravelFundsAnalytics.dataLayerSelectorsForTravelFunds[
          travelFundActionTypes.TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS
        ]()
      ).toStrictEqual(viewTravelFundResponse);
      expect(
        TravelFundsAnalytics.dataLayerSelectorsForTravelFunds[
          travelFundActionTypes.TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_SUCCESS
        ]()
      ).toStrictEqual(viewUnusedTravelFundsResponse);
    });
  });
});

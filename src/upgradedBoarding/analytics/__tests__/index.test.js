import upgradedBoardingActionTypes from 'src/upgradedBoarding/actions/upgradedBoardingActionTypes';
import * as UpgradedBoardingAnalytics from 'src/upgradedBoarding/analytics/index';

const upgradedBoardingPurchaseResponse = 'upgraded boarding purchase mktg_data';
const upgradedBoardingConfirmationResponse = 'upgraded boarding confirmation mktg_data';

jest.mock('src/upgradedBoarding/analytics/upgradedBoardingPurchaseMktgSelector', () => ({
  upgradedBoardingPurchaseMktgSelector: jest.fn(() => upgradedBoardingPurchaseResponse)
}));
jest.mock('src/upgradedBoarding/analytics/upgradedBoardingConfirmationMktgSelector', () => ({
  upgradedBoardingConfirmationMktgSelector: jest.fn(() => upgradedBoardingConfirmationResponse)
}));

describe('index', () => {
  describe('dataLayerSelectorsForUpgradedBoarding', () => {
    it('should return the upgradedBoardingPurchaseMktgSelector used for the marketing data layer', () => {
      expect(
        UpgradedBoardingAnalytics.dataLayerSelectorsForUpgradedBoarding[
          upgradedBoardingActionTypes.UPGRADED_BOARDING__FETCH_RESERVATION_SUCCESS
        ]()
      ).toStrictEqual(upgradedBoardingPurchaseResponse);
    });

    it('should return the upgradedBoardingConfirmationMktgSelector used for the marketing data layer', () => {
      expect(
        UpgradedBoardingAnalytics.dataLayerSelectorsForUpgradedBoarding[
          upgradedBoardingActionTypes.UPGRADED_BOARDING__FETCH_PURCHASE_SUCCESS
        ]()
      ).toStrictEqual(upgradedBoardingConfirmationResponse);
    });
  });
});

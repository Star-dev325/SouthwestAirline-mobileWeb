import * as travelFundsStoreAnalytics from 'src/shared/analytics/travelFundsStore/index';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

describe('TravelFundsStoreAnalytics', () => {
  context('analytics actions for TravelFundsStore', () => {
    it('should return analytics actions for lastSearchedFund from selectors', () => {
      const { analyticsActionsForTravelFundsStore } = travelFundsStoreAnalytics;

      expect(analyticsActionsForTravelFundsStore).to.include.members([AnalyticsActionTypes.SAVE_LAST_SEARCHED_FUND]);

      expect(analyticsActionsForTravelFundsStore).to.have.lengthOf(1);
    });
  });

  context('generate TravelFundsStore', () => {
    it('should return undefined if nothing exists', () => {
      const state = {};
      const actionType = AnalyticsActionTypes.SAVE_LAST_SEARCHED_FUND;

      const result = travelFundsStoreAnalytics.generateTravelFundsStore(state, actionType);

      expect(result).to.deep.equal({
        lastSearchedFund: undefined,
        lastSearchedFundData: undefined
      });
    });

    it('should return the data as stored in redux', () => {
      const state = {
        analytics: {
          TravelFundsStore: {
            lastSearchedFund: {
              fundType: 'luv-voucher',
              fundData: {
                voucherNumber: '1234567890',
                securityCode: '1234'
              }
            }
          }
        }
      };
      const actionType = AnalyticsActionTypes.SAVE_LAST_SEARCHED_FUND;

      const result = travelFundsStoreAnalytics.generateTravelFundsStore(state, actionType);

      expect(result).to.deep.equal({
        lastSearchedFund: 'luv-voucher',
        lastSearchedFundData: {
          voucherNumber: '1234567890',
          securityCode: '1234'
        }
      });
    });
  });
});

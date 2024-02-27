import travelFundsAnalyticsReducers from 'src/shared/analytics/reducers/travelFundsAnalyticsReducers';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

const { SAVE_LAST_SEARCHED_FUND } = AnalyticsActionTypes;

describe('travelFundsAnalyticsReducer', () => {
  context('lastSearchedFund', () => {
    it('should set lastSearchedFund if action.lastSearchedFund exists', () => {
      const newState = travelFundsAnalyticsReducers(undefined, {
        type: SAVE_LAST_SEARCHED_FUND,
        lastSearchedFund: {
          fundType: 'luv-voucher',
          fundData: {
            voucherNumber: '1234567890',
            securityCode: '1234'
          }
        }
      });

      expect(newState.lastSearchedFund).to.deep.equal({
        fundType: 'luv-voucher',
        fundData: {
          voucherNumber: '1234567890',
          securityCode: '1234'
        }
      });
    });

    it('should return default state when action is undefined', () => {
      expect(travelFundsAnalyticsReducers().lastSearchedFund).to.deep.equal(false);
    });
  });
});

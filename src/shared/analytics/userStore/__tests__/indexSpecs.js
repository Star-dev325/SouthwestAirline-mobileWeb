import * as userStoreAnalytics from 'src/shared/analytics/userStore/index';
import AccountActionTypes from 'src/shared/actions/accountActionTypes';

describe('analytics for user store', () => {
  context('analytics actions for UserStore', () => {
    it('should return analytics actions for save account info from selectors', () => {
      const { analyticsActionsForUserStore } = userStoreAnalytics;

      expect(analyticsActionsForUserStore).to.include.members([AccountActionTypes.ACCOUNT__SAVE_ACCOUNT_INFO]);

      expect(analyticsActionsForUserStore).to.have.lengthOf(1);
    });
  });

  context('generate UserStore', () => {
    it('should return undefined if nothing exists', () => {
      const state = {};
      const actionType = AccountActionTypes.ACCOUNT__SAVE_ACCOUNT_INFO;

      const result = userStoreAnalytics.generateUserStore(state, actionType);

      expect(result).to.deep.equal({
        accountNumber: undefined,
        email: undefined,
        redeemablePoints: undefined,
        tier: undefined
      });
    });

    it('should return the data as stored in redux', () => {
      const state = {
        app: {
          account: {
            accountInfo: {
              customerInfo: {
                accountNumber: '600597056',
                emailAddress: 'f660ab912ec121d1b1e928a0bb4bc61b15f5ad44d5efdc4e1c92a25e99b8e44a'
              },
              rapidRewardsDetails: {
                tierInfo: {
                  tier: 'A_LIST_PREFERRED'
                },
                redeemablePoints: 33476
              }
            }
          }
        }
      };
      const actionType = AccountActionTypes.ACCOUNT__SAVE_ACCOUNT_INFO;

      const result = userStoreAnalytics.generateUserStore(state, actionType);

      expect(result).to.deep.equal({
        accountNumber: '600597056',
        email: 'f660ab912ec121d1b1e928a0bb4bc61b15f5ad44d5efdc4e1c92a25e99b8e44a',
        redeemablePoints: 33476,
        tier: 'A_LIST_PREFERRED'
      });
    });
  });
});

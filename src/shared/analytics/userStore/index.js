import _ from 'lodash';

import {
  generateUpdatedFlowStoreForAnalytics,
  generateFlowActionListForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';
import AccountActionTypes from 'src/shared/actions/accountActionTypes';

const userStoreSelectors = {
  accountNumber: {
    actions: [AccountActionTypes.ACCOUNT__SAVE_ACCOUNT_INFO],
    selector: (state) => _.get(state, 'app.account.accountInfo.customerInfo.accountNumber')
  },
  email: {
    actions: [AccountActionTypes.ACCOUNT__SAVE_ACCOUNT_INFO],
    selector: (state) => _.get(state, 'app.account.accountInfo.customerInfo.emailAddress')
  },
  redeemablePoints: {
    actions: [AccountActionTypes.ACCOUNT__SAVE_ACCOUNT_INFO],
    selector: (state) => _.get(state, 'app.account.accountInfo.rapidRewardsDetails.redeemablePoints')
  },
  tier: {
    actions: [AccountActionTypes.ACCOUNT__SAVE_ACCOUNT_INFO],
    selector: (state) => _.get(state, 'app.account.accountInfo.rapidRewardsDetails.tierInfo.tier')
  }
};

export const generateUserStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(userStoreSelectors, state, actionType);

export const analyticsActionsForUserStore = generateFlowActionListForAnalytics(userStoreSelectors);

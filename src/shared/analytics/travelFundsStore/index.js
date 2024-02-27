import _ from 'lodash';
import {
  generateUpdatedFlowStoreForAnalytics,
  generateFlowActionListForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

const travelFundsStoreSelectors = {
  lastSearchedFund: {
    actions: [AnalyticsActionTypes.SAVE_LAST_SEARCHED_FUND],
    selector: (store) => _.get(store, 'analytics.TravelFundsStore.lastSearchedFund.fundType')
  },
  lastSearchedFundData: {
    actions: [AnalyticsActionTypes.SAVE_LAST_SEARCHED_FUND],
    selector: (store) => _.get(store, 'analytics.TravelFundsStore.lastSearchedFund.fundData')
  }
};

export const generateTravelFundsStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(travelFundsStoreSelectors, state, actionType);

export const analyticsActionsForTravelFundsStore = generateFlowActionListForAnalytics(travelFundsStoreSelectors);

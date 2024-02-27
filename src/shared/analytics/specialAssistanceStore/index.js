import _ from 'lodash';
import {
  generateUpdatedFlowStoreForAnalytics,
  generateFlowActionListForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

const specialAssistanceStoreSelectors = {
  selectionMade: {
    actions: [AnalyticsActionTypes.SPECIAL_ASSISTANCE_SELECTED],
    selector: (store) => _.get(store, 'analytics.SpecialAssistanceStore.selectionMade')
  }
};

export const generateSpecialAssistanceStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(specialAssistanceStoreSelectors, state, actionType);

export const analyticsActionsForSpecialAssistanceStore = generateFlowActionListForAnalytics(
  specialAssistanceStoreSelectors
);

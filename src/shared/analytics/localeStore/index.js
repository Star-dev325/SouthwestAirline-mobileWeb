import {
  generateUpdatedFlowStoreForAnalytics,
  generateFlowActionListForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

const localeStoreSelectors = {
  locale: {
    actions: [AnalyticsActionTypes.SET_LOCALE],
    selector: () => 'en'
  }
};

export const generateLocaleStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(localeStoreSelectors, state, actionType);

export const analyticsActionsForLocaleStore = generateFlowActionListForAnalytics(localeStoreSelectors);

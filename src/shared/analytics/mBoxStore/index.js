import _ from 'lodash';
import {
  generateUpdatedFlowStoreForAnalytics,
  generateFlowActionListForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

const { SHARED__ROUTE_CHANGED } = SharedActionTypes;

const mBoxSelectors = {
  Total_mboxCalls_Counter: {
    actions: [AnalyticsActionTypes.MBOX_ANALYTICS_UPDATE_TOTAL_CALLS, SHARED__ROUTE_CHANGED],
    selector: (store) => _.get(store, 'analytics.mBoxStore.totalMboxCallsCounter')
  },
  Failed_mboxCalls_Counter: {
    actions: [AnalyticsActionTypes.MBOX_ANALYTICS_UPDATE_FAILED_CALLS, SHARED__ROUTE_CHANGED],
    selector: (store) => _.get(store, 'analytics.mBoxStore.failedMboxCallsCounter')
  },
  mBox_TimeOut_Artifact: {
    actions: [AnalyticsActionTypes.MBOX_ANALYTICS_UPDATE_TIMEOUT_ARTIFACT, SHARED__ROUTE_CHANGED],
    selector: (store) => _.get(store, 'analytics.mBoxStore.mBoxTimeOutArtifact')
  }
};

export const generateMBoxStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(mBoxSelectors, state, actionType);

export const analyticsActionsForMBoxStore = generateFlowActionListForAnalytics(mBoxSelectors);

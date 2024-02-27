import _ from 'lodash';

import {
  generateUpdatedFlowStoreForAnalytics,
  generateFlowActionListForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';

const { SHARED__SET_APP_READY } = SharedActionTypes;

const webViewStoreSelectors = {
  isWebView: {
    actions: [SHARED__SET_APP_READY],
    selector: (state) => _.get(state, 'app.webView.isWebView')
  },
  deviceType: {
    actions: [SHARED__SET_APP_READY],
    selector: (state) => _.get(state, 'app.webView.deviceType')
  }
};

export const generateWebViewStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(webViewStoreSelectors, state, actionType);

export const analyticsActionsForWebViewStore = generateFlowActionListForAnalytics(webViewStoreSelectors);

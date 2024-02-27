import { combineReducers } from 'redux';

import { LOGIN_STATES } from 'src/shared/constants/webViewConstants';
import SharedConstants from 'src/shared/constants/sharedConstants';

import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import WebViewActionTypes from 'src/shared/actions/webViewActionTypes';

const { DATA_CHANNEL } = SharedConstants;
const { SHARED__ROUTE_CHANGED } = SharedActionTypes;

const {
  WEB_VIEW__HANDLE_DEEP_LINK_CONTINUE,
  WEB_VIEW__HANDLE_EXTERNAL_PAYMENT_AUTHORIZED,
  WEB_VIEW__HANDLE_PAYPAL_AUTH,
  WEB_VIEW__SEND_DISPLAY_LOGIN,
  WEB_VIEW__SEND_EXIT,
  WEB_VIEW__SET_ADOBE_ID,
  WEB_VIEW__SET_DEVICE_TYPE,
  WEB_VIEW__SET_IS_NOT_WEB_VIEW,
  WEB_VIEW__SET_IS_WEB_VIEW,
  WEB_VIEW__SET_SHARE_FLIGHT_STATUS,
  WEB_VIEW__SET_UPGRADE_TYPE,
  WEB_VIEW__SET_WEB_VIEW_CHANNEL,
  WEB_VIEW__UPDATE_ACCOUNT_SUCCESS
} = WebViewActionTypes;

const isWebView = (state = false, action = {}) => {
  switch (action.type) {
    case WEB_VIEW__SET_IS_WEB_VIEW:
      return true;
    case WEB_VIEW__SET_IS_NOT_WEB_VIEW:
      return false;
    default:
      return state;
  }
};

const isReRoute = (state = false, action = {}) => {
  switch (action.type) {
    case WEB_VIEW__SEND_EXIT:
      return !!action.route;
    default:
      return state;
  }
};

const deviceType = (state = DATA_CHANNEL, action = {}) => {
  switch (action.type) {
    case WEB_VIEW__SET_DEVICE_TYPE:
      return action.value;
    default:
      return state;
  }
};

const webViewChannel = (state = null, action = {}) => {
  switch (action.type) {
    case WEB_VIEW__SET_WEB_VIEW_CHANNEL:
      return action.value;
    default:
      return state;
  }
};

const adobeId = (state = null, action = {}) => {
  switch (action.type) {
    case WEB_VIEW__SET_ADOBE_ID:
      return action.value;
    default:
      return state;
  }
};

const webViewLoginStatus = (state = '', action = {}) => {
  switch (action.type) {
    case WEB_VIEW__SEND_DISPLAY_LOGIN:
      return LOGIN_STATES.PENDING;
    case WEB_VIEW__UPDATE_ACCOUNT_SUCCESS:
      return action.response;
    case SHARED__ROUTE_CHANGED:
      return '';
    default:
      return state;
  }
};

const shareFlightStatus = (state = false, action = {}) => {
  switch (action.type) {
    case WEB_VIEW__SET_SHARE_FLIGHT_STATUS:
      return action.value;
    default:
      return state;
  }
};

const upgradeType = (state = '', action = {}) => {
  switch (action.type) {
    case WEB_VIEW__SET_UPGRADE_TYPE:
      return action.value;
    default:
      return state;
  }
};

const webViewPayPalAuthorizedToken = (state = '', action = {}) => {
  switch (action.type) {
    case WEB_VIEW__HANDLE_PAYPAL_AUTH:
      return action.token;
    default:
      return state;
  }
};

const webViewDeepLinkContinue = (state = false, action = {}) => {
  switch (action.type) {
    case WEB_VIEW__HANDLE_DEEP_LINK_CONTINUE:
      return action.value;
    default:
      return state;
  }
};

const webViewExternalPaymentAuthorizedSearchString = (state = null, action = {}) => {
  switch (action.type) {
    case WEB_VIEW__HANDLE_EXTERNAL_PAYMENT_AUTHORIZED:
      return action.value;
    default:
      return state;
  }
};

export default combineReducers({
  isWebView,
  deviceType,
  adobeId,
  webViewLoginStatus,
  shareFlightStatus,
  webViewPayPalAuthorizedToken,
  isReRoute,
  webViewChannel,
  webViewDeepLinkContinue,
  webViewExternalPaymentAuthorizedSearchString,
  upgradeType
});

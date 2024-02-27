import { handleRouteChange as handleRouteChangeFn } from '@swa-ui/hybrid';
import _ from 'lodash';
import { getMcvid } from 'src/airBooking/helpers/amcvCookieHelper';
import FlightStatusActionTypes from 'src/flightStatus/actions/flightStatusActionTypes';
import { clearSpinnerAndModalOptions } from 'src/login/actions/reLoginModalActions';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import WebViewActionTypes from 'src/shared/actions/webViewActionTypes';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import { sendErrorLog } from 'src/shared/api/loggingApi';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';
import { AUTH_EVENTS, COOKIES, appId } from 'src/shared/constants/webViewConstants';
import * as WebViewHelper from 'src/shared/helpers/webViewHelper';
import * as Cookie from 'src/shared/swa-persistence/cookie';

const {
  WEB_VIEW__HANDLE_OAUTH,
  WEB_VIEW__HANDLE_AUTH_EVENT,
  WEB_VIEW__HANDLE_ROUTE_CHANGE,
  WEB_VIEW__SEND_EXIT,
  WEB_VIEW__SEND_DISPLAY_LOGIN,
  WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS,
  WEB_VIEW__SEND_SHARE_FLIGHT_STATUS_DETAILS,
  WEB_VIEW__SEND_CHASE_SESSION,
  WEB_VIEW__SEND_DISPLAY_APP_REVIEW
} = WebViewActionTypes;
const { SHARED__ROUTE_CHANGED } = SharedActionTypes;
const { FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS } = FlightStatusActionTypes;

const isInWebViewState = (store) => _.get(store.getState(), 'app.webView.isWebView');

const handleWebViewExit = (store, { route }) => isInWebViewState(store) && WebViewHelper.exitWebView(route);

const handleLogin = (store, { options }) => isInWebViewState(store) && WebViewHelper.showNativeAppLogin(options);

const shouldSetWebViewState = () => WebViewHelper.hasWebViewParam() || WebViewHelper.hasWebViewInterface();

const handleEnableNavigationControls = (store, { isEnabled }) =>
  isInWebViewState(store) && WebViewHelper.enableNavigationControls(isEnabled);

const handleDisplayAppReview = (store) => isInWebViewState(store) && WebViewHelper.displayAppReview();

const checkWebViewPage = (store) =>
  isInWebViewState(store) && WebViewHelper.isOnHomePage() && store.dispatch(WebViewActions.exitWebView());

const handleChaseSession = (store, { value }) => isInWebViewState(store) && WebViewHelper.rememberChaseInfo(value);

const handleUpdateFlightStatusSearches = (store, { searches }) =>
  isInWebViewState(store) && WebViewHelper.updateFlightStatusSearches({ recentSearches: searches });

const handleShareFlightStatusDetails = (store, { shareDetails }) =>
  isInWebViewState(store) && WebViewHelper.shareFlightStatusDetails({ shareDetails });

const handleOAuth = ({ dispatch, getState }, { isAdd, value }) =>
  (isAdd ? dispatch(WebViewActions.addOAuth(value, getState)) : dispatch(WebViewActions.removeOAuth()));

const handleAuthEvent = ({ dispatch, getState }, { value }) => {
  const { type } = WebViewHelper.decodeMessage(value);

  switch (type) {
    case AUTH_EVENTS.USER_CANCEL:
      dispatch(WebViewActions.voidApplePayTransaction(getState));
      dispatch(clearSpinnerAndModalOptions());
      break;
    default:
  }
};

const handleWebViewState = (store) => {
  if (!isInWebViewState(store) && shouldSetWebViewState()) {
    store.dispatch(WebViewActions.isWebView());
    store.dispatch(WebViewActions.refreshAuth());
  }
};

const handleRouteChange = (store, { history, route, state }) => {
  handleQueryParams(store);
  handleMissingAdobeMcvidCookie(store);
  isInWebViewState(store) && WebViewHelper.isLandingPage(route) && store.dispatch(WebViewActions.refreshAuth());

  handleRouteChangeFn(history, appId, route, state);
};

const handleWebViewChannel = ({ dispatch }) => {
  const channel = WebViewHelper.getChannelParam();

  WebViewHelper.rememberChannel(channel);
  channel && dispatch(WebViewActions.setWebViewChannel(channel));
};

const handleWebViewCorporateChannel = () => {
  const channel = WebViewHelper.getCorporateChannelParam();

  WebViewHelper.rememberCorporateChannel(channel);
};

const handleWebViewApiKey = () => {
  const apiKey = WebViewHelper.getApiKeyParam();

  WebViewHelper.rememberApiKey(apiKey);
};

const handleWebViewDevice = ({ dispatch }) => {
  const deviceType = WebViewHelper.getDeviceTypeParam();

  deviceType && dispatch(WebViewActions.setDeviceType(deviceType));
};

const handleWebViewShareFlightStatus = ({ dispatch }) => {
  const shareFlightStatus = WebViewHelper.getShareFlightStatusParam();

  shareFlightStatus && dispatch(WebViewActions.setShareFlightStatus(shareFlightStatus));
};
const handleWebViewUpgradeType = ({ dispatch }) => {
  const upgradeType = WebViewHelper.getUpgradeTypeParam();

  upgradeType && dispatch(WebViewActions.setUpgradeType(upgradeType));
};

const handleWebViewExperienceId = () => {
  const experienceId = WebViewHelper.getExperienceId();

  WebViewHelper.rememberExperienceId(experienceId);
};

const handleWebViewAppVersion = () => {
  const appVersion = WebViewHelper.getAppVersion();

  WebViewHelper.rememberAppVersion(appVersion);
};

const handleWebViewAdobeId = (store) => {
  const state = _.cloneDeep(store.getState());
  const adobeId = _.get(state, 'app.webView.adobeId');
  const adobeIdParam = WebViewHelper.getAdobeIdParam();
  const adobeIdCookie = Cookie.getValue(COOKIES.ADOBE_ID);
  const adobeIdToSet = adobeIdParam || adobeId;

  !adobeIdCookie && adobeIdParam && store.dispatch(WebViewActions.setAdobeId(adobeIdParam));
  !adobeIdCookie && adobeIdToSet && Cookie.setValue(COOKIES.ADOBE_ID, adobeIdToSet);
};

const handleLoginBanner = (store) => {
  const { isLoggedIn } = store.getState().app.account;

  if (!isLoggedIn && !Cookie.getValue(COOKIES.SHOW_LOGIN_BANNER)) {
    Cookie.setValue(COOKIES.SHOW_LOGIN_BANNER, 'true');
  }
};

const handlePageLoad = (store) => {
  handleWebViewState(store);
  checkWebViewPage(store);
  handleQueryParams(store);
  handleLoginBanner(store);
};

const handleQueryParams = (store) => {
  if (isInWebViewState(store)) {
    handleWebViewChannel(store);
    handleWebViewCorporateChannel();
    handleWebViewApiKey();
    handleWebViewExperienceId();
    handleWebViewAppVersion();
    handleWebViewDevice(store);
    handleWebViewShareFlightStatus(store);
    handleWebViewAdobeId(store);
    handleWebViewUpgradeType(store);
  }
};

const handleMissingAdobeMcvidCookie = (store) => {
  const state = _.cloneDeep(store.getState());
  const adobeId = _.get(state, 'app.webView.adobeId');

  if (isInWebViewState(store) && !getMcvid()) {
    sendErrorLog([
      {
        action: '',
        component: 'webViewMiddleware',
        count: 1,
        details: adobeId,
        errorCode: null,
        httpCode: null,
        level: LOG_LEVEL.ERROR,
        location: _.get(window, 'location.pathname'),
        message: 'Adobe AMCV cookie missing in webview'
      }
    ]);
  }
};

const handleActions = (store, action) => {
  switch (action.type) {
    case WEB_VIEW__SEND_EXIT:
      handleWebViewExit(store, action);
      break;
    case WEB_VIEW__SEND_DISPLAY_LOGIN:
      handleLogin(store, action);
      break;
    case WEB_VIEW__HANDLE_OAUTH:
      handleOAuth(store, action);
      break;
    case WEB_VIEW__HANDLE_AUTH_EVENT:
      handleAuthEvent(store, action);
      break;
    case WEB_VIEW__HANDLE_ROUTE_CHANGE:
      handleRouteChange(store, action);
      break;
    case WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS:
      handleEnableNavigationControls(store, action);
      break;
    case WEB_VIEW__SEND_DISPLAY_APP_REVIEW:
      handleDisplayAppReview(store);
      break;
    case FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS:
      handleUpdateFlightStatusSearches(store, action);
      break;
    case WEB_VIEW__SEND_SHARE_FLIGHT_STATUS_DETAILS:
      handleShareFlightStatusDetails(store, action);
      break;
    case WEB_VIEW__SEND_CHASE_SESSION:
      handleChaseSession(store, action);
      break;
    case SHARED__ROUTE_CHANGED:
      handlePageLoad(store);
      break;
  }
};

const webViewMiddleware = (store) => (next) => (action) => {
  try {
    handleActions(store, action);
  } catch (e) {
    // Swallowing Error
  }

  return next(action);
};

export default webViewMiddleware;

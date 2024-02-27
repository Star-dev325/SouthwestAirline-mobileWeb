// @flow
import { handleRouteChange as handleRouteChangeFn } from '@swa-ui/hybrid';
import _ from 'lodash';
import { matchPath } from 'react-router';
import { history } from 'src/appHistory';
import * as LocalStorageCache from 'src/shared/cache/localStorageCache';
import appConfig from 'src/shared/config/appConfig';
import { DEBOUNCE_DELAY } from 'src/shared/constants/timeoutConstants';
import {
  appId,
  LOGIN_TYPES,
  LOGIN_STATES,
  NATIVE_FUNCTIONS,
  NORMALIZED_ROUTES,
  QUERY_PARAMS,
  ROUTES
} from 'src/shared/constants/webViewConstants';
import { isObject } from 'src/shared/helpers/jsUtils';
import { transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import StorageKeys from 'src/shared/helpers/storageKeys';
import {
  getCurrentRouteState,
  getPrevRouteState,
  isBrowserBackOrForward
} from 'src/shared/routeUtils/routeStateHelper';
import store2 from 'store2';

import type { RecentSearchRequestType } from 'src/flightStatus/flow-typed/flightStatus.types';
import type { CurrencyType, NativeAppLoginOptions } from 'src/shared/flow-typed/shared.types';

const {
  WEB_VIEW_CHANNEL,
  WEB_VIEW_API_KEY,
  WEB_VIEW_CORPORATE_CHANNEL,
  OAUTH_LOGIN_STATUS,
  WEB_VIEW_EXPERIENCE_ID,
  WEB_VIEW_APP_VERSION
} = StorageKeys;
const { PENDING, NATIVE_LOG_IN, NATIVE_LOG_OUT } = LOGIN_STATES;
const {
  CHANNEL,
  CORPORATE_CHANNEL,
  WEB_VIEW,
  API_KEY,
  DEVICE_TYPE,
  SHARE_FLIGHT_STATUS,
  ADOBE_ID,
  EXPERIENCE_ID,
  APP_VERSION,
  UPGRADE_TYPE
} = QUERY_PARAMS;
const {
  BLANK,
  FLIGHT_STATUS,
  CAR_BOOKING,
  AIR_BOOKING,
  AIR_BOOKING_APPLY_RAPID_REWARDS,
  AIR_BOOKING_LEGACY,
  LOOKUP_TRAVEL_FUNDS,
  CONTACT_TRACING,
  OFFERS,
  UPGRADED_BOARDING,
  UPGRADED_BOARDING_PURCHASE,
  UPGRADED_BOARDING_CONFIRMATION,
  AIR_UPGRADE,
  AIR_UPGRADE_SELECT_BOUNDS,
  MY_ACCOUNT_PROMO_CODES
} = ROUTES;
const {
  AIR_BOOKING_INDEX,
  AIR_BOOKING_FLIGHT_SHOPPING
} = NORMALIZED_ROUTES;
const {
  EXIT,
  PAGE_RENDERED,
  DISPLAY_LOGIN,
  LOGOUT,
  UPDATE_FLIGHT_STATUS_SEARCHES,
  ENABLE_NAVIGATION_CONTROLS,
  DISPLAY_APP_REVIEW,
  SHARE_FLIGHT_STATUS_DETAILS,
  DISPLAY_APPLE_PAY,
  CHASE_PROMO_CLICKED,
  SAVE_CHASE_OFFERS
} = NATIVE_FUNCTIONS;

type Props = {
  isWebView: boolean,
  webViewLoginStatus: string
};

export const isWebViewLogin = (props: Props, prevProps: Props) => {
  const { isWebView, webViewLoginStatus } = props;
  const { webViewLoginStatus: prevWebViewLoginStatus } = prevProps;

  const didDisplayLogin = prevWebViewLoginStatus === PENDING;
  const didLogin = webViewLoginStatus === NATIVE_LOG_IN;

  return isWebView && didDisplayLogin && didLogin;
};

export const isWebViewLogout = (props: Props, prevProps: Props) => {
  const { isWebView, webViewLoginStatus } = props;
  const { webViewLoginStatus: prevWebViewLoginStatus } = prevProps;

  const didDisplayLogin = prevWebViewLoginStatus === PENDING;
  const didLogout = webViewLoginStatus === NATIVE_LOG_OUT;

  return isWebView && didDisplayLogin && didLogout;
};

const getQueryParam = (param: string) => {
  const queryParamsStr = _.get(history, 'location.search', '');
  const queryParams = transformSearchToQuery(queryParamsStr) || {};

  return _.get(queryParams, param);
};

export const hasWebViewInterface = () =>
  _.hasAny(window, [androidInterface(PAGE_RENDERED), iosInterface(PAGE_RENDERED)]);

export const getBooleanQueryParam = (paramKey: string) => getQueryParam(paramKey) === 'true';
export const hasWebViewParam = () => getBooleanQueryParam(WEB_VIEW);
export const getChannelParam = () => getQueryParam(CHANNEL);
export const getCorporateChannelParam = () => getQueryParam(CORPORATE_CHANNEL);
export const getApiKeyParam = () => getQueryParam(API_KEY);
export const getDeviceTypeParam = () => getQueryParam(DEVICE_TYPE);
export const getShareFlightStatusParam = () => getBooleanQueryParam(SHARE_FLIGHT_STATUS);
export const getUpgradeTypeParam = () => getQueryParam(UPGRADE_TYPE);
export const getAdobeIdParam = () => getQueryParam(ADOBE_ID);
export const getExperienceId = () => getQueryParam(EXPERIENCE_ID);
export const getAppVersion = () => getQueryParam(APP_VERSION);

export const isOnHomePage = () => _.get(history, 'location.pathname') === '/';

const androidInterface = (FUNCTION_NAME: string) => `AndroidInterface.${FUNCTION_NAME}`;
const iosInterface = (FUNCTION_NAME: string) => `webkit.messageHandlers.${FUNCTION_NAME}.postMessage`;
const simulatorInterface = (FUNCTION_NAME: string) => `SimulatorInterface.${FUNCTION_NAME}`;

const sendMessageToNativeApps = (FUNCTION_NAME: string, value: string) => {
  _.invoke(window, androidInterface(FUNCTION_NAME), value);
  _.invoke(window, iosInterface(FUNCTION_NAME), value);
  _.invoke(window, simulatorInterface(FUNCTION_NAME), value);
};

export const exitWebView = (route: string) => {
  sendMessageToNativeApps(EXIT, route);
  _.isEmpty(route) && handleRouteChangeFn(history, appId, BLANK, '');
};

export const chasePromoClicked = (target: string, linkType: string, isChaseCombo: boolean, referrer: string) => {
  const message = encodeMessage({
    target,
    linkType,
    isChaseCombo,
    referrer
  });

  sendMessageToNativeApps(CHASE_PROMO_CLICKED, message);
};

export const showNativeAppLogin = (options: NativeAppLoginOptions) => {
  const defaultOptions = { loginType: LOGIN_TYPES.NORMAL, continueAsGuest: false };
  const message = encodeMessage({ ...defaultOptions, ...options });

  sendMessageToNativeApps(DISPLAY_LOGIN, message);
};

export const showNativeApplePay = (moneyTotal: CurrencyType) =>
  sendMessageToNativeApps(DISPLAY_APPLE_PAY, encodeMessage(moneyTotal));

export const updateFlightStatusSearches = (flightStatusSearches: Array<RecentSearchRequestType>) =>
  sendMessageToNativeApps(UPDATE_FLIGHT_STATUS_SEARCHES, encodeMessage(flightStatusSearches));

export const shareFlightStatusDetails = (shareDetails: *) =>
  sendMessageToNativeApps(SHARE_FLIGHT_STATUS_DETAILS, encodeMessage(shareDetails));

export const sendChaseOffers = (chaseOffers: *) =>
  sendMessageToNativeApps(SAVE_CHASE_OFFERS, encodeMessage(chaseOffers));

export const enableNavigationControls = (isEnabled: boolean) =>
  sendMessageToNativeApps(ENABLE_NAVIGATION_CONTROLS, _.toString(isEnabled));

export const displayAppReview = () => sendMessageToNativeApps(DISPLAY_APP_REVIEW, '');

export const handleNativeLogout = () => sendMessageToNativeApps(LOGOUT, '');

const remember = (key: string, value: string) => {
  value && store2.set(key, value);
};

export const rememberChannel = (nativeChannel: string) => remember(WEB_VIEW_CHANNEL, nativeChannel);
export const rememberCorporateChannel = (nativeCorporateChannel: string) =>
  remember(WEB_VIEW_CORPORATE_CHANNEL, nativeCorporateChannel);
export const rememberApiKey = (nativeApiKey: string) => remember(WEB_VIEW_API_KEY, nativeApiKey);
export const rememberExperienceId = (nativeExperienceId: string) =>
  remember(WEB_VIEW_EXPERIENCE_ID, nativeExperienceId);
export const rememberAppVersion = (nativeAppVersion: string) => remember(WEB_VIEW_APP_VERSION, nativeAppVersion);

export const rememberChaseInfo = (encodedValue: string) => {
  const value = decodeMessage(encodedValue);
  const { chaseSessionId } = value;

  if (chaseSessionId) {
    LocalStorageCache.saveSwaOffersIdentity();
    LocalStorageCache.saveChaseSessionId(chaseSessionId);
    LocalStorageCache.deleteChasePrequalOffers();
  }
};

const getValidRoute = (route: string = '') => {
  const baseRoute = route.split('?')[0];

  switch (baseRoute) {
    case FLIGHT_STATUS:
    case CAR_BOOKING:
    case CONTACT_TRACING:
    case AIR_BOOKING:
    case AIR_BOOKING_APPLY_RAPID_REWARDS:
    case AIR_BOOKING_LEGACY:
    case AIR_BOOKING_INDEX:
    case AIR_BOOKING_FLIGHT_SHOPPING:
    case LOOKUP_TRAVEL_FUNDS:
    case OFFERS:
    case UPGRADED_BOARDING:
    case UPGRADED_BOARDING_PURCHASE:
    case UPGRADED_BOARDING_CONFIRMATION:
    case AIR_UPGRADE:
    case AIR_UPGRADE_SELECT_BOUNDS:
    case MY_ACCOUNT_PROMO_CODES:
      return route;
    default:
      return BLANK;
  }
};

export const isBlankPage = (routeKey: string) => _.startsWith(routeKey, BLANK);
export const isLandingPage = (routeKey: string) => getValidRoute(routeKey) !== BLANK;

export const decodeMessage = (encodedMessage: string) => {
  try {
    const decodedMessage = Buffer.from(encodedMessage, 'base64').toString() || '{}';

    return JSON.parse(decodedMessage) || {};
  } catch (e) {
    return {};
  }
};

export const encodeMessage = (decodedMessage: *): string => {
  try {
    const stringifiedMessage = JSON.stringify(decodedMessage);

    return Buffer.from(stringifiedMessage).toString('base64');
  } catch (e) {
    return '';
  }
};

export const isIndexPage = (routePath: string, currentPathName: string) => (
  isObject(routePath) ?
    Object.values(routePath).some((path) => matchPath(currentPathName, { path: String(path), exact: true })?.isExact ?? false)
    : matchPath(currentPathName, { path: routePath, exact: true })?.isExact ?? false
);

export const isOnWebViewLandingPage = (persistentHistory: Array<*>, landingPagePath: string) => {
  const currentState = getCurrentRouteState(persistentHistory);
  const previousState = getPrevRouteState(persistentHistory);

  const currentPathName = currentState?.pathname;
  const previousPathName = previousState?.pathname;

  const isOnLandingPage = isIndexPage(landingPagePath, currentPathName);
  const isFromBlankPage = matchPath(previousPathName, { path: '/blank', exact: true });

  return !!isOnLandingPage && !!isFromBlankPage && !isBrowserBackOrForward(currentState);
};

export const shouldShowContinueAsGuest = (loginType: string) =>
  ![LOGIN_TYPES.POINTS, LOGIN_TYPES.TRANSFER_TRAVEL_FUNDS].includes(loginType);

const hasIosToken = () => {
  const { scope } = store2.get(OAUTH_LOGIN_STATUS) || {};

  return _.includes(scope, 'ios');
};

const getWebViewApiValue = (localStorageKey: string, appConfigValue: string) => {
  const localStorageValue = store2.get(localStorageKey);

  return hasIosToken() && !localStorageValue ? appConfigValue : localStorageValue;
};

export const debouncedFn = _.debounce((fn: *) => fn && fn(), DEBOUNCE_DELAY, { leading: true, trailing: false });
export const getWebViewApiKey = () => getWebViewApiValue(WEB_VIEW_API_KEY, appConfig.IOS_API_KEY);
export const getWebViewChannel = () => getWebViewApiValue(WEB_VIEW_CHANNEL, appConfig.IOS_API_CHANNEL);
export const getWebViewCorporateChannel = () =>
  getWebViewApiValue(WEB_VIEW_CORPORATE_CHANNEL, appConfig.IOS_API_CORPORATE_CHANNEL);

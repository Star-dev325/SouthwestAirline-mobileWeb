// @flow
import dayjs from 'dayjs';
import _ from 'lodash';
import { resetAirBookingPurchaseData } from 'src/airBooking/actions/airBookingActions';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import {
  clearSpinnerAndModalOptions,
  setReLoginCallbackFunctions,
  setRetryFunctions
} from 'src/login/actions/reLoginModalActions';
import {
  cleanUpAccountInfo,
  cleanUpAssociatedInfo,
  getAccountInfo,
  updateAccountInfo,
  updateCorporateInfo
} from 'src/shared/actions/accountActions';
import { initiateVoidTransaction } from 'src/shared/actions/alternativeFormsOfPaymentActions';
import { asyncActionFinish, asyncActionStart } from 'src/shared/actions/sharedActions';
import WebViewActionTypes, { apiActionCreator } from 'src/shared/actions/webViewActionTypes';
import * as LocalStorageCache from 'src/shared/cache/localStorageCache';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { APPLE_PAY_CARD_ID } from 'src/shared/constants/creditCardConstants';
import { LOGIN_STATES } from 'src/shared/constants/webViewConstants';
import * as AccountInfoHelper from 'src/shared/helpers/accountInfoHelper';
import BrowserObject from 'src/shared/helpers/browserObject';
import { decodeJwt } from 'src/shared/helpers/loginSessionHelper';
import { forceDomUpdatesAndThenExecute } from 'src/shared/helpers/uiHelper';
import * as WebViewHelper from 'src/shared/helpers/webViewHelper';
import * as Cookie from 'src/shared/swa-persistence/cookie';
import { transformToCorporateInfo } from 'src/shared/transformers/corporateInfoTransformer';

const {
  WEB_VIEW__HANDLE_APPLE_PAY,
  WEB_VIEW__HANDLE_AUTH_EVENT,
  WEB_VIEW__HANDLE_DEEP_LINK_CONTINUE,
  WEB_VIEW__HANDLE_EXTERNAL_PAYMENT_AUTHORIZED,
  WEB_VIEW__HANDLE_OAUTH,
  WEB_VIEW__HANDLE_PAYPAL_AUTH,
  WEB_VIEW__HANDLE_ROUTE_CHANGE,
  WEB_VIEW__SEND_CHASE_SESSION,
  WEB_VIEW__SEND_EXIT,
  WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS,
  WEB_VIEW__SEND_DISPLAY_APP_REVIEW,
  WEB_VIEW__SEND_DISPLAY_LOGIN,
  WEB_VIEW__SEND_SHARE_FLIGHT_STATUS_DETAILS,
  WEB_VIEW__SET_ADOBE_ID,
  WEB_VIEW__SET_DEVICE_TYPE,
  WEB_VIEW__SET_IS_NOT_WEB_VIEW,
  WEB_VIEW__SET_IS_WEB_VIEW,
  WEB_VIEW__SET_WEB_VIEW_CHANNEL,
  WEB_VIEW__SET_SHARE_FLIGHT_STATUS,
  WEB_VIEW__SET_UPGRADE_TYPE,
  WEB_VIEW__UPDATE_ACCOUNT
} = WebViewActionTypes;
const { location } = BrowserObject;

import type { RouterHistory } from 'react-router';
import type {
  NativeAppLoginOptions,
  Dispatch as ThunkDispatch,
  WebViewOAuth
} from 'src/shared/flow-typed/shared.types';

const { NATIVE_LOG_IN, NATIVE_LOG_OUT } = LOGIN_STATES;

export const isWebView = () => ({
  type: WEB_VIEW__SET_IS_WEB_VIEW
});

export const isNotWebView = () => ({
  type: WEB_VIEW__SET_IS_NOT_WEB_VIEW
});

export const exitWebView = (route: string = '') => ({
  type: WEB_VIEW__SEND_EXIT,
  route
});

export const setDeviceType = (value: string) => ({
  type: WEB_VIEW__SET_DEVICE_TYPE,
  value
});

export const setWebViewChannel = (value: string) => ({
  type: WEB_VIEW__SET_WEB_VIEW_CHANNEL,
  value
});

export const setAdobeId = (value: string) => ({
  type: WEB_VIEW__SET_ADOBE_ID,
  value
});

export const setShareFlightStatus = (value: boolean) => ({
  type: WEB_VIEW__SET_SHARE_FLIGHT_STATUS,
  value
});

export const shareFlightStatusDetails = (shareDetails: *) => ({
  type: WEB_VIEW__SEND_SHARE_FLIGHT_STATUS_DETAILS,
  shareDetails
});

export const setUpgradeType = (value: string) => ({
  type: WEB_VIEW__SET_UPGRADE_TYPE,
  value
});

export const handleOAuth = (isAdd: boolean, value: WebViewOAuth) => ({
  type: WEB_VIEW__HANDLE_OAUTH,
  value,
  isAdd
});

export const handleAuthEvent = (value: string) => ({
  type: WEB_VIEW__HANDLE_AUTH_EVENT,
  value
});

export const handleRouteChange = (history: RouterHistory, route: string, state: string) => ({
  type: WEB_VIEW__HANDLE_ROUTE_CHANGE,
  history,
  route,
  state
});

export const showNativeAppLogin = (options: NativeAppLoginOptions = {}) => ({
  type: WEB_VIEW__SEND_DISPLAY_LOGIN,
  options
});

export const handleNativeLogout = () => (dispatch: ThunkDispatch, getState: *) => {
  const webView = _.get(getState(), 'app.webView.isWebView');

  webView && WebViewHelper.handleNativeLogout();
};

export const enableNavigationControls = (isEnabled: boolean) => ({
  type: WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS,
  isEnabled
});

export const displayAppReview = () => ({
  type: WEB_VIEW__SEND_DISPLAY_APP_REVIEW
});

export const setPaypalAuthorized = (token: string) => ({
  type: WEB_VIEW__HANDLE_PAYPAL_AUTH,
  token
});

export const handleNativeApplePay = (request: string) => ({
  type: WEB_VIEW__HANDLE_APPLE_PAY,
  request
});

export const handleChaseSession = (value: string) => ({
  type: WEB_VIEW__SEND_CHASE_SESSION,
  value
});

export const handleDeepLinkContinue = (value: boolean) => ({
  type: WEB_VIEW__HANDLE_DEEP_LINK_CONTINUE,
  value
});

export const handleSaveChaseOffers = (encodedResponse: *) => () => {
  const response = WebViewHelper.decodeMessage(encodedResponse);
  const expirationTimestamp = _.get(response, 'expirationTimestamp');

  LocalStorageCache.saveChasePrequalOffers(response, null, expirationTimestamp);
};

export const handleExternalPaymentAuthorized = (value: ?string) => ({
  type: WEB_VIEW__HANDLE_EXTERNAL_PAYMENT_AUTHORIZED,
  value
});

const saveAccountInfo = () => (dispatch: ThunkDispatch) => {
  if (!AccountInfoHelper.getOauthLoginSession()) {
    return Promise.resolve();
  }

  return dispatch(getAccountInfo()).then((accountInfo) => {
    dispatch(CarBookingActions.saveUserAccountInfo(accountInfo));
  });
};

export const refreshAuth = () => (dispatch: ThunkDispatch) => {
  const existingAuth = AccountInfoHelper.getOauthLoginSession() || {};
  const accountInfo = AccountInfoHelper.getAccountInfo();
  const shouldSaveAccountInfo =
    dayjs().isAfter(_.get(accountInfo, 'expirationDate')) || (!_.isEmpty(existingAuth) && _.isEmpty(accountInfo));

  shouldSaveAccountInfo && dispatch(saveAccountInfo());
  !shouldSaveAccountInfo && !_.isEmpty(accountInfo) && dispatch(updateAccountInfo(accountInfo));
};

const { updateAccount, updateAccountSuccess, updateAccountFailed } = apiActionCreator(WEB_VIEW__UPDATE_ACCOUNT);

export const addOAuth = (encodedCredentials: string, getState: () => *) => (dispatch: ThunkDispatch) => {
  const id_token = Cookie.getValue('id_token');
  const decodedIdToken = id_token ? decodeJwt(id_token) : {};
  const decodedAuth = { ...decodedIdToken, id_token };

  if (!_.isEmpty(decodedIdToken)) {
    dispatch(updateAccount());
    AccountInfoHelper.rememberOauthLoginSession(decodedAuth);

    const CORPORATE_INFO_TIMEOUT_MIN = _.get(
      _.cloneDeep(getState()),
      'app.wcmContent.applicationProperties.CORPORATE_INFO_TIMEOUT_MIN',
      '30'
    );
    const corporateInfo = transformToCorporateInfo(decodedAuth, CORPORATE_INFO_TIMEOUT_MIN, true);

    dispatch(updateCorporateInfo(corporateInfo));

    forceDomUpdatesAndThenExecute(() => {
      dispatch(saveAccountInfo())
        .then(() => dispatch(updateAccountSuccess(NATIVE_LOG_IN)))
        .then(() => !encodedCredentials && dispatch(handleReLogin()))
        .catch(() => dispatch(updateAccountFailed()));
    });
  }
};

export const handleReLogin = () => (dispatch: *, getState: *) => {
  const state = _.cloneDeep(getState());
  const { reLoginModal = {} } = state?.app;
  const { reLoginCallbackFunctions = {}, reLoginLocation, retryFunctions = [] } = reLoginModal;
  const { postLoginCallbackFn = _.noop } = reLoginCallbackFunctions || {};
  const hasCallbackFunctionsForCurrentPage = reLoginLocation === location.pathname;

  !hasCallbackFunctionsForCurrentPage && dispatch(setReLoginCallbackFunctions({}));
  retryFunctions.length > 0 &&
    dispatch(_retryFailedCalls())
      .then(postLoginCallbackFn)
      .finally(() => dispatch(setReLoginCallbackFunctions({})));
};

const _retryFailedCalls = () => (dispatch: *, getState: *) => {
  const state = _.cloneDeep(getState());
  const { reLoginModal = {} } = state?.app;
  const { retryFunctions = [] } = reLoginModal;

  dispatch(asyncActionStart());
  Promise.all(_.map(retryFunctions, (retryFunction) => retryFunction()))
    .catch(_.noop)
    .finally(() => {
      dispatch(setRetryFunctions([]));
      dispatch(asyncActionFinish());
    });
};

export const removeOAuth = () => (dispatch: ThunkDispatch, getState: () => *) => {
  const existingAuth = AccountInfoHelper.getOauthLoginSession() || {};
  const hasToken = !!existingAuth.id_token;
  const state = _.cloneDeep(getState());
  const { reLoginModal = {} } = _.get(state, 'app');
  const { reLoginCallbackFunctions = {}, reLoginLocation } = reLoginModal;
  const { continueAsGuestFn } = reLoginCallbackFunctions || {};
  const hasGuestFlowForCurrentPage = reLoginLocation === location.pathname;

  if (hasToken) {
    dispatch(updateAccount());
    AccountInfoHelper.removeOauthLoginSession();
    forceDomUpdatesAndThenExecute(() => {
      dispatch(resetAirBookingPurchaseData());
      dispatch(cleanUpAccountInfo());
      dispatch(cleanUpAssociatedInfo());
      hasGuestFlowForCurrentPage && continueAsGuestFn && continueAsGuestFn(true);
      dispatch(clearSpinnerAndModalOptions());
      dispatch(updateAccountSuccess(NATIVE_LOG_OUT));
    });
  }
};

export const voidApplePayTransaction = () => (dispatch: ThunkDispatch, getState: () => *) => {
  const state = _.cloneDeep(getState());
  const applePayCard = state?.app?.applePay?.applePayCard;
  const paymentInfo = applePayCard?.formData?.paymentInfo;
  const hasSelectedApplePay = !!paymentInfo && paymentInfo.selectedCardId === APPLE_PAY_CARD_ID;

  if (hasSelectedApplePay) {
    const CEPTOR_VOID_API = state?.app?.toggles?.CEPTOR_VOID_API;
    const { reLoginModal = {} } = state?.app || {};
    const { reLoginLocation = "" } = reLoginModal || {};
    const hasGuestFlowForCurrentPage = reLoginLocation === location.pathname;
    const isValidApplePayCard = applePayCard && Object.keys(applePayCard).length > 0;

    if (CEPTOR_VOID_API && hasGuestFlowForCurrentPage && isValidApplePayCard) {
      dispatch(initiateVoidTransaction(PAYMENT_METHODS.APPLE_PAY, null, true, 'user continued as guest'));
    }
  }
};

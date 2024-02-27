// @flow

import _ from 'lodash';
import { push } from 'connected-react-router';
import ReLoginActionTypes from 'src/login/actions/reLoginActionTypes';
import * as AccountActions from 'src/shared/actions/accountActions';
import BrowserObject from 'src/shared/helpers/browserObject';
import { forceHideSpinner } from 'src/shared/actions/sharedActions';
import { showDialog, hideDialog } from 'src/shared/actions/dialogActions';
import { hasCorporateToken } from 'src/shared/helpers/loginSessionHelper';
import { shouldShowContinueAsGuest } from 'src/shared/helpers/webViewHelper';
import { addForbidUserClickBrowserBack } from 'src/shared/helpers/historyHelper';
import { handleNativeLogout, showNativeAppLogin } from 'src/shared/actions/webViewActions';
import { isPointsBooking } from 'src/shared/selectors/priceSelectors';
import { LOGIN_TYPES } from 'src/shared/constants/webViewConstants';
import i18n from '@swa-ui/locale';

import type { ReLoginModalOptionsType, ReLoginCallbackFunctionsType } from 'src/login/flow-typed/reLoginModal.types';

const { location } = BrowserObject;

export const showReLoginModal =
  (retryFunction: *, reLoginModalOptions: ?ReLoginModalOptionsType) => (dispatch: *, getState: () => *) => {
    const state = _.cloneDeep(getState());
    const accountNumber = _.get(state, 'app.account.accountNumber');
    const { isAccountNumberEditable = false } = reLoginModalOptions || {};

    if (accountNumber || isAccountNumberEditable) {
      hasCorporateToken()
        ? dispatch(showSessionExpiredPopUpForCorporate())
        : dispatch(_handleReLogin(retryFunction, reLoginModalOptions));
    } else {
      dispatch(cleanupReLoginModal());
    }
  };

const _handleReLogin =
  (retryFunction: *, reLoginModalOptions: ?ReLoginModalOptionsType) => (dispatch: *, getState: () => *) => {
    const state = _.cloneDeep(getState());
    const isActive = _.get(state, 'app.reLoginModal.isActive', false);
    const isWebView = _.get(state, 'app.webView.isWebView', false);
    const loginType = isPointsBooking(state) ? LOGIN_TYPES.POINTS : LOGIN_TYPES.PURCHASE;
    const reLoginActionType = isWebView ? ReLoginActionTypes.RETRY_FUNCTIONS : ReLoginActionTypes.SHOW_RE_LOGIN_MODAL;
    const shouldShowPointsLogin = !isWebView && loginType === LOGIN_TYPES.POINTS;

    !isActive && !isWebView && addForbidUserClickBrowserBack(() => dispatch(handleBackButtonOnReLoginModal()));
    isWebView && dispatch(showNativeAppLogin({ loginType, continueAsGuest: shouldShowContinueAsGuest(loginType) }));
    dispatch({ type: reLoginActionType, retryFunction, reLoginModalOptions, loginType });
    shouldShowPointsLogin && dispatch({ type: ReLoginActionTypes.IS_RE_LOGIN_POINTS_BOOKING });
  };

export const handleBackButtonOnReLoginModal = () => (dispatch: *, getState: () => *) => () =>
  _.get(getState(), 'app.reLoginModal.isActive', false);

export const hideReLoginModal = () => ({
  type: ReLoginActionTypes.HIDE_RE_LOGIN_MODAL
});

export const setReLoginCallbackFunctions = (reLoginCallbackFunctions?: ReLoginCallbackFunctionsType) => ({
  type: ReLoginActionTypes.SET_RE_LOGIN_CALLBACK_FUNCTIONS,
  reLoginCallbackFunctions,
  reLoginLocation: location.pathname
});

export const setRetryFunctions = (retryFunctions: []) => ({
  type: ReLoginActionTypes.RETRY_FUNCTIONS,
  retryFunctions
});

export const cleanupReLoginModal = () => (dispatch: *, getState: () => *) => {
  const shouldRedirectToHomePage = _.get(
    getState(),
    'app.reLoginModal.reLoginModalOptions.shouldRedirectToHomePage',
    false
  );

  dispatch(hideReLoginModal());
  dispatch(AccountActions.cleanUpEndOfSession());
  shouldRedirectToHomePage && dispatch(push('/'));
  dispatch(clearSpinnerAndModalOptions());
};

export const clearSpinnerAndModalOptions = () => (dispatch: *, getState: *) => {
  const state = _.cloneDeep(getState());
  const retryFunctionCounts = state?.app?.reLoginModal?.retryFunctions?.length;

  dispatch(forceHideSpinner(retryFunctionCounts));
  dispatch(setReLoginCallbackFunctions({}));
  dispatch(setRetryFunctions([]));
};

export const hideSessionExpiredPopUpForCorporate = () => (dispatch: *) => {
  dispatch(hideDialog())
    .then(() => dispatch(cleanupReLoginModal()))
    .then(() => handleNativeLogout())
    .then(() => dispatch(push('/')));
};

export const showSessionExpiredPopUpForCorporate = () => (dispatch: *) => {
  dispatch(
    showDialog({
      name: 'user-login-session-expired',
      title: i18n('ERROR__CORPORATE_SESSION_EXPIRED'),
      buttons: [
        {
          label: i18n('SHARED__BUTTON_TEXT__OK'),
          onClick: () => dispatch(hideSessionExpiredPopUpForCorporate())
        }
      ]
    })
  );
};

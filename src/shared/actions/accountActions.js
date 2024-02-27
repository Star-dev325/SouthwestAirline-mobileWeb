// @flow
import { removeCookies as removeResponsiveCookies, removeResponsiveStores } from '@swa-ui/authentication/logoutHandler';
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import store from 'store2';
import { cleanUpFrequentTravelerSelected } from 'src/airBooking/actions/airBookingActions';
import * as ChaseActions from 'src/chase/actions/chaseActions';
import CheckInLocalStorageHelper from 'src/checkIn/helpers/checkInLocalStorageHelper';
import transformToAccountInfo from 'src/myAccount/transformers/accountInfoTransformer';
import AccountActionTypes, { apiActionCreator } from 'src/shared/actions/accountActionTypes';
import * as CreditCardActions from 'src/shared/actions/creditCardActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import * as AccountsApi from 'src/shared/api/accountsApi';
import * as OAuthApi from 'src/shared/api/oAuthApi';
import * as SalesforceApi from 'src/shared/api/salesforceApi';
import { deleteUserInfo, loadUserInfo, saveUserInfo } from 'src/shared/cache/localStorageCache';
import { ERROR_CID_NOT_AVAILABLE } from 'src/shared/constants/errorCodes';
import * as AccountInfoHelper from 'src/shared/helpers/accountInfoHelper';
import { containsApiErrorCodes } from 'src/shared/helpers/errorCodesHelper';
import { decodeJwt, hasActiveSessionCookies } from 'src/shared/helpers/loginSessionHelper';
import StorageKeys from 'src/shared/helpers/storageKeys';
import * as Cookie from 'src/shared/swa-persistence/cookie';
import { transformToCorporateInfo } from 'src/shared/transformers/corporateInfoTransformer';
import { transformToOAuthErrorMessage } from 'src/shared/transformers/oauthErrorMessageTransformer';
import { transformUserInfo } from 'src/shared/transformers/userInfoTransformer';
import { expireHomeNavMenu } from 'src/wcm/actions/wcmActions';

import type { Company } from 'src/airBooking/flow-typed/airBooking.types';
import type { LoginFormDataType } from 'src/login/flow-typed/login.types';
import { LOGIN_RR_MISMATCH_ERROR_CODE } from 'src/shared/helpers/validateLoginHelper';

const {
  ACCOUNT__FETCH_ACCOUNT_INFO,
  ACCOUNT__FETCH_SALESFORCE_GUID,
  ACCOUNT__FETCH_USER_INFO,
  ACCOUNT__GET_SALESFORCE_GUID,
  ACCOUNT__GRANT_CORPORATE_TOKEN,
  ACCOUNT__GRANT_LEISURE_TOKEN,
  ACCOUNT__LOGIN_USER,
  ACCOUNT__LOGOUT_USER,
  ACCOUNT__SAVE_ACCOUNT_INFO,
  ACCOUNT__SAVE_ACCOUNT_NUMBER,
  ACCOUNT__SAVE_CORPORATE_INFO,
  ACCOUNT__SAVE_RECENT_FLIGHT_DESTINATION,
  ACCOUNT__SET_IS_LOGGED_IN,
  ACCOUNT__UPDATE_ACCOUNT_INFO_FETCHED
} = AccountActionTypes;

const { loginUser, loginUserSuccess, loginUserFailed } = apiActionCreator(ACCOUNT__LOGIN_USER);

export const login = (loginRequest: LoginFormDataType) => (dispatch: *, getState: () => *) => {
  dispatch(loginUser());
  const state = _.cloneDeep(getState());
  const CORPORATE_INFO_TIMEOUT_MIN = _.get(
    state,
    'app.wcmContent.applicationProperties.CORPORATE_INFO_TIMEOUT_MIN',
    '30'
  );
  const VALIDATE_LOGIN_USER = _.get(state, 'app.toggles.VALIDATE_LOGIN_USER', false);

  store.set(StorageKeys.VALIDATE_LOGIN_USER, VALIDATE_LOGIN_USER);

  return OAuthApi.login(loginRequest)
    .then((oauthLoginResponse) => {
      const response = _getDecodedOauthResponse(oauthLoginResponse);

      AccountInfoHelper.rememberOauthLoginSession(response);
      const { shouldRememberUser, userNameOrAccountNumber } = loginRequest;

      if (shouldRememberUser) {
        AccountInfoHelper.rememberUser(userNameOrAccountNumber);
      } else {
        AccountInfoHelper.forgetUser();
      }
      CheckInLocalStorageHelper.clearAcceptedHazmatDeclarations();
      const corporateInfo = transformToCorporateInfo(response, CORPORATE_INFO_TIMEOUT_MIN);

      if (corporateInfo) {
        dispatch(updateCorporateInfo(corporateInfo));
      }
    })
    .then(() => dispatch(getAccountInfo()))
    .then((transformedAccountInfo) => dispatch(loginUserSuccess(transformedAccountInfo)))
    .then(() => dispatch(expireHomeNavMenu()))
    .catch((err) => {
      dispatch(loginUserFailed(transformToOAuthErrorMessage(err)));

      LOGIN_RR_MISMATCH_ERROR_CODE === err?.responseJSON?.code && dispatch(logout());

      throw err;
    });
};

const { fetchAccountInfo, fetchAccountInfoSuccess, fetchAccountInfoFailed } =
  apiActionCreator(ACCOUNT__FETCH_ACCOUNT_INFO);

export const getAccountInfo = () => (dispatch: *, getState: () => *) => {
  const state = _.cloneDeep(getState());
  const ACCOUNT_INFO_TIMEOUT_MIN = _.get(state, 'app.wcmContent.applicationProperties.ACCOUNT_INFO_TIMEOUT_MIN', '1');

  dispatch(fetchAccountInfo());

  return AccountsApi.fetchAccountInfo()
    .then((response) => {
      dispatch(fetchAccountInfoSuccess(response));

      const transformedAccountInfo = transformToAccountInfo(response, ACCOUNT_INFO_TIMEOUT_MIN);

      AccountInfoHelper.rememberBasicAccountInfo(transformedAccountInfo);

      dispatch(updateAccountInfo(transformedAccountInfo));
      dispatch(setIsLoggedIn(true));
      dispatch(saveAccountNumber(_.get(transformedAccountInfo, 'customerInfo.accountNumber')));
      dispatch(updateAccountInfoFetched(true));

      return transformedAccountInfo;
    })
    .catch((err) => dispatch(fetchAccountInfoFailed(err)));
};

export const refreshCorporateInfo =
  (isHardRefresh: boolean = false) =>
    (dispatch: *, getState: () => *) => {
      const state = getState();
      const localStorageLoginInfo = store.get(StorageKeys.OAUTH_LOGIN_STATUS) || {};
      const activeCompanyIdAssociations = state?.app?.account?.corporateInfo?.activeCompanyIdAssociations;
      const shouldRefreshCorporateInfo =
      !activeCompanyIdAssociations &&
      (
        (localStorageLoginInfo &&
          localStorageLoginInfo['corporate.customerUserInformation.activeCompanyIdAssociations']) ||
        []
      ).length > 0;

      if (shouldRefreshCorporateInfo) {
        isHardRefresh
          ? deleteUserInfo()
          : _.includes(localStorageLoginInfo.scope, 'swabiz') && dispatch(removeSelectedCompany());
        !_.includes(localStorageLoginInfo.scope, 'swabiz') && dispatch(getUserInfo());
      }
    };

const { fetchUserInfo, fetchUserInfoSuccess, fetchUserInfoFailed } = apiActionCreator(ACCOUNT__FETCH_USER_INFO, {
  isSpinnerNeeded: false,
  shouldHideError: true
});

export const getUserInfo =
  (shouldUseFreshData: boolean = false) =>
    (dispatch: *, getState: () => *) => {
      const state = getState();
      const cachedUserInfo = loadUserInfo();

      if (!_.get(state, 'app.account.isLoggedIn') || !hasActiveSessionCookies()) {
        return Promise.resolve();
      }

      if (cachedUserInfo && !shouldUseFreshData) {
        return cachedUserInfo;
      }

      dispatch(fetchUserInfo());

      return OAuthApi.fetchUserInfo()
        .then((response) => {
          const transformedUserInfo = transformUserInfo(response);

          dispatch(fetchUserInfoSuccess(transformedUserInfo));
          const CORPORATE_INFO_TIMEOUT_MIN = _.get(
            state,
            'app.wcmContent.applicationProperties.CORPORATE_INFO_TIMEOUT_MIN',
            '30'
          );
          const isWebView = _.get(state, 'app.webView.isWebView', false);
          const selectedCompany = _.get(state, 'app.account.corporateInfo.selectedCompany');
          const corporateInfo = transformToCorporateInfo(
            response,
            CORPORATE_INFO_TIMEOUT_MIN,
            isWebView,
            selectedCompany
          );

          corporateInfo && dispatch(updateCorporateInfo(corporateInfo));
          saveUserInfo(transformedUserInfo);

          return transformedUserInfo;
        })
        .catch((err) => dispatch(fetchUserInfoFailed(err)));
    };

const { fetchSalesforceGuid, fetchSalesforceGuidSuccess, fetchSalesforceGuidFailed } = apiActionCreator(ACCOUNT__FETCH_SALESFORCE_GUID);

export const getSalesforceGuid = () => (dispatch: *) => {
  dispatch(fetchSalesforceGuid());

  return SalesforceApi.getSalesforceGuid().then((response) => {
    const { guidNumber } = response;
    
    dispatch(setSalesforceGuid(guidNumber));
    dispatch(fetchSalesforceGuidSuccess());
  }).catch(() => {
    dispatch(fetchSalesforceGuidFailed());
  });
};

const { logoutUser, logoutUserSuccess, logoutUserFailed } = apiActionCreator(ACCOUNT__LOGOUT_USER);

export const logout = () => (dispatch: *) => {
  dispatch(logoutUser());

  return OAuthApi.logout()
    .then((res) => {
      dispatch(cleanUpEndOfSession());
      CheckInLocalStorageHelper.clearAcceptedHazmatDeclarations();
      dispatch(logoutUserSuccess(res));
    })
    .catch(() => {
      dispatch(cleanUpEndOfSession());
      CheckInLocalStorageHelper.clearAcceptedHazmatDeclarations();
      dispatch(logoutUserFailed());
    });
};

const { grantCorporateToken, grantCorporateTokenSuccess, grantCorporateTokenFailed } =
  apiActionCreator(ACCOUNT__GRANT_CORPORATE_TOKEN);

export const saveSelectedCompany =
  (selectedCompany: Company) =>
    (dispatch: *, getState: () => *): Promise<*> =>
      new Promise((resolve: *, reject: *) => {
        dispatch(grantCorporateToken());
        const state = _.cloneDeep(getState());
        const CORPORATE_INFO_TIMEOUT_MIN = _.get(
          state,
          'app.wcmContent.applicationProperties.CORPORATE_INFO_TIMEOUT_MIN',
          '30'
        );

        return OAuthApi.grantCorporateToken(selectedCompany.companyId)
          .then((oauthLoginResponse) => {
            const response = _getDecodedOauthResponse(oauthLoginResponse);

            dispatch(grantCorporateTokenSuccess(response));
            AccountInfoHelper.rememberOauthLoginSession(response);
            const corporateInfo = transformToCorporateInfo(response, CORPORATE_INFO_TIMEOUT_MIN);

            corporateInfo && dispatch(updateCorporateInfo({ ...corporateInfo, selectedCompany }));
            resolve();
          })
          .catch((err) => {
            const companyDeactivatedMessage = i18n('ERROR__COMPANY_DEACTIVATED');
            const error = err.disableRetry ? { stopNextAction: true } : err;

            if (containsApiErrorCodes(err, ERROR_CID_NOT_AVAILABLE) && companyDeactivatedMessage) {
              _.set(err, 'responseJSON.message', companyDeactivatedMessage);
            }

            err.disableRetry ? dispatch(grantCorporateTokenFailed()) : dispatch(grantCorporateTokenFailed(err));
            reject(error);
          });
      });

const _getDecodedOauthResponse = (oauthLoginResponse: *) => {
  const id_token = Cookie.getValue('id_token');
  const decodedToken = id_token && decodeJwt(id_token);

  return decodedToken ? { ...oauthLoginResponse, ...decodedToken, id_token } : oauthLoginResponse;
};

export const removeSelectedCompany =
  (clearSessionOnFail: boolean = true) =>
    (dispatch: *) =>
      dispatch(handleLeisureTokenExchange(clearSessionOnFail));

const { grantLeisureToken, grantLeisureTokenSuccess, grantLeisureTokenFailed } =
  apiActionCreator(ACCOUNT__GRANT_LEISURE_TOKEN);

export const handleLeisureTokenExchange =
  (clearSessionOnFail: boolean = true) =>
    (dispatch: *, getState: () => *) => {
      const state = _.cloneDeep(getState());
      const CORPORATE_INFO_TIMEOUT_MIN = _.get(
        state,
        'app.wcmContent.applicationProperties.CORPORATE_INFO_TIMEOUT_MIN',
        '30'
      );
      const isWebView = _.get(state, 'app.webView.isWebView');

      if (isWebView) {
        return Promise.resolve();
      } else {
        dispatch(grantLeisureToken());

        return OAuthApi.grantLeisureToken()
          .then((oauthLoginResponse) => {
            const response = _getDecodedOauthResponse(oauthLoginResponse);

            dispatch(grantLeisureTokenSuccess(response));
            AccountInfoHelper.rememberOauthLoginSession(response);
            dispatch(cleanUpCorporateInfo());
            const corporateInfo = transformToCorporateInfo(response, CORPORATE_INFO_TIMEOUT_MIN);

            dispatch(updateCorporateInfo(corporateInfo));
          })
          .catch((err) => {
            if (clearSessionOnFail) {
              CheckInLocalStorageHelper.clearAcceptedHazmatDeclarations();
              dispatch(cleanUpEndOfSession());
            }

            dispatch(grantLeisureTokenFailed(err));
          });
      }
    };

export const cleanUpAccountInfo = () => (dispatch: *) => {
  dispatch(updateAccountInfo(null));
  dispatch(setIsLoggedIn(false));
  AccountInfoHelper.removeAccountInfo();
  dispatch(updateAccountInfoFetched(false));
};

export const cleanUpAssociatedInfo = () => (dispatch: *) => {
  dispatch(CreditCardActions.resetSavedCreditCards());
  dispatch(ChaseActions.resetChaseData());
};

export const cleanUpCorporateInfo = () => (dispatch: *) => {
  Cookie.deleteCookie('corporateToken');
  dispatch(updateCorporateInfo(null));
};

export const cleanUpEndOfSession =
  (isReLogin: boolean = false) =>
    (dispatch: *) => {
      AccountInfoHelper.removeOauthLoginSession();
      dispatch(cleanUpAccountInfo());
      dispatch(cleanUpCorporateInfo());
      dispatch(cleanUpAssociatedInfo());
      dispatch(expireHomeNavMenu());

      if (!isReLogin) {
        dispatch(FormDataActions.resetFormData());
        dispatch(cleanUpFrequentTravelerSelected());
      }

      removeResponsiveStores();
      removeResponsiveCookies();
      deleteUserInfo();
    };

export const saveAccountNumber = (accountNumber: string) => ({
  type: ACCOUNT__SAVE_ACCOUNT_NUMBER,
  accountNumber
});

export const saveRecentFlightAirport = (airportName: string) => ({
  type: ACCOUNT__SAVE_RECENT_FLIGHT_DESTINATION,
  airportName
});

export const setIsLoggedIn = (isLoggedIn: boolean) => ({
  type: ACCOUNT__SET_IS_LOGGED_IN,
  isLoggedIn
});

export const setSalesforceGuid = (salesforceGuid: string) => ({
  type: ACCOUNT__GET_SALESFORCE_GUID,
  salesforceGuid
});

export const updateAccountInfo = (accountInfo: *) => ({
  type: ACCOUNT__SAVE_ACCOUNT_INFO,
  accountInfo
});

export const updateAccountInfoFetched = (isFetched: boolean = false) => ({
  type: ACCOUNT__UPDATE_ACCOUNT_INFO_FETCHED,
  isFetched
});

export const updateCorporateInfo = (corporateInfo: *) => ({
  type: ACCOUNT__SAVE_CORPORATE_INFO,
  corporateInfo
});
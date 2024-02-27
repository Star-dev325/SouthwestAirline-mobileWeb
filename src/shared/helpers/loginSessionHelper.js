// @flow
import jwtDecode from 'jwt-decode';
import _ from 'lodash';
import { getErrorLogTimestamp, getLocationPathname } from 'src/shared/api/helpers/loggingHelper';
import { sendErrorLog } from 'src/shared/api/loggingApi';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';
import StorageKeys from 'src/shared/helpers/storageKeys';
import * as Cookie from 'src/shared/swa-persistence/cookie';
import localStorage from 'store2';

function _isUserSignedOut(loginInfo) {
  return _.isEmpty(loginInfo) || _.isEmpty(loginInfo.access_token);
}

export function hasSessionExpired() {
  const loginInfo = localStorage.get(StorageKeys.OAUTH_LOGIN_STATUS) || {};

  return _isUserSignedOut(loginInfo) ? false : !hasActiveSessionCookies();
}

export const hasCorporateToken = () => {
  const { scope } = localStorage.get(StorageKeys.OAUTH_LOGIN_STATUS) || {};

  return _.includes(scope, 'swabiz') || _.isNumber(getCompanyIdFromIdToken());
};

export const getCompanyIdFromIdToken = () => {
  const id_token = Cookie.getValue('id_token');
  const decodedToken = id_token && decodeJwt(id_token);

  return _.get(decodedToken, 'apiContext["companyInformation.companyId"]');
};

export const hasActiveSessionCookies = () => !!Cookie.getValue('id_token');

export const decodeJwt = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    sendErrorLog([
      {
        action: '',
        component: 'loginSessionHelper',
        count: 1,
        details: `Unable to decode token: ${token}`,
        errorCode: null,
        httpCode: null,
        level: LOG_LEVEL.ERROR,
        location: getLocationPathname(),
        message: 'Unable to decode token',
        timestamp: getErrorLogTimestamp()
      }
    ]);

    return {};
  }
};

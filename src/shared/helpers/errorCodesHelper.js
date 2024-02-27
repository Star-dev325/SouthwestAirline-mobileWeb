// @flow

import _ from 'lodash';
import HttpRequestError from 'src/shared/errors/httpRequestError';
import AccessTokenExpiredError from 'src/shared/errors/accessTokenExpiredError';
import UserNotLoginError from 'src/shared/errors/userNotLoginError';
import { AUTHENTICATION_ERROR_BASE, SESSION_TIMEOUT_ERRORS } from 'src/shared/constants/errorCodes';

import type { ApiErrorType } from 'src/shared/flow-typed/shared.types';

// TODO: To fix flow type for `expectedErrorCodes` after upgrade flow
export const containsApiErrorCodes = (apiErrorType: ApiErrorType, ...expectedErrorCodes: *): boolean => {
  const error: number = _.get(apiErrorType, 'responseJSON.code');

  return _.some(expectedErrorCodes, (expectedErrorCode) => {
    if (_.isNumber(expectedErrorCode)) {
      return expectedErrorCode === error;
    } else if (error && _.isArray(expectedErrorCode)) {
      return _.includes(expectedErrorCode, error);
    } else {
      return false;
    }
  });
};

export const isAuthenticationError = (error: HttpRequestError): boolean => {
  const hasAuthenticationError = _.chain(error).get('code').startsWith(AUTHENTICATION_ERROR_BASE).value();
  const hasAccessTokenError = error instanceof UserNotLoginError || error instanceof AccessTokenExpiredError;

  return hasAuthenticationError || hasAccessTokenError;
};

export const isSessionTimeoutError = (error: HttpRequestError): boolean => containsApiErrorCodes(error, SESSION_TIMEOUT_ERRORS);

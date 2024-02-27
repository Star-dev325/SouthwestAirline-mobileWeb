// @flow
import { store } from 'src/shared/redux/createStore';
import _ from 'lodash';
import UUIDRepo from 'src/app/stores/uuidRepo';
import { setReLoginCallbackFunctions, showReLoginModal } from 'src/login/actions/reLoginModalActions';
import { cleanUpEndOfSession, removeSelectedCompany } from 'src/shared/actions/accountActions';
import { forceHideSpinner } from 'src/shared/actions/sharedActions';
import { handleNativeLogout } from 'src/shared/actions/webViewActions';
import environment from 'src/shared/api/apiRoutes';
import { getErrorLogTimestamp, getLocationPathname, stringifyDetails } from 'src/shared/api/helpers/loggingHelper';
import { sendErrorLog } from 'src/shared/api/loggingApi';
import { getAppVersion } from 'src/shared/config/environmentConfig';
import {
  ERROR_SHAPE_ACCESS_DENIED,
  GATEWAY_LOGIN_ERRORS,
  GATEWAY_REAUTHENTICATE_ERRORS,
  GATEWAY_RELOGIN_ERRORS,
  GATEWAY_RETRY_ERRORS,
  GATEWAY_SCOPE_ERRORS
} from 'src/shared/constants/errorCodes';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';
import SharedConstants from 'src/shared/constants/sharedConstants';
import showCancelButtonPaths from 'src/shared/constants/showCancelButtonPaths';
import BrowserObject from 'src/shared/helpers/browserObject';
import { hasCorporateToken } from 'src/shared/helpers/loginSessionHelper';
import StorageKeys from 'src/shared/helpers/storageKeys';
import { param } from 'src/shared/helpers/urlHelper';
import { validateLoginResponse } from 'src/shared/helpers/validateLoginHelper';
import { getWebViewApiKey, getWebViewChannel, getWebViewCorporateChannel } from 'src/shared/helpers/webViewHelper';
import localStorage from 'store2';

import type { ApiErrorType, HttpRequest } from 'src/shared/flow-typed/shared.types';

const { OAUTH, apiErrorLogUrl } = SharedConstants;
const FORM_URL_ENCODE_CONTENT_TYPE = 'application/x-www-form-urlencoded';

type deferType = {
  promise: any,
  reject: any,
  resolve: any
};

export const defer = () => {
  const deferred = {};

  deferred.promise = new Promise<*>((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred;
};

export const ajax = (
  request: HttpRequest,
  authentication: ?boolean = false,
  timeout: ?number = 90000,
  channelId: ?string = '',
  deferFn: deferType = defer()
) => {
  const defaultHeadersAndTimeout = _getDefaultHeadersAndTimeout(timeout, channelId, request.contentType);
  const ajaxRequest = _createAjaxRequest(request);
  const apiCallParams = _.mergeWithoutUndefined({}, ajaxRequest, defaultHeadersAndTimeout);
  const shouldUseValidateLoginUser = localStorage.get(StorageKeys.VALIDATE_LOGIN_USER);
  const retryFn = request.url.includes('token')
    ? () => deferFn.reject({ disableRetry: true })
    : ajax.bind(null, request, authentication, timeout, channelId, deferFn);
  const isTokenCall = request.url.includes('v4/security/token');

  fetch(_formulateUrl(request), apiCallParams)
    .then(async (result) => {
      let resultJson = {};

      if (result.headers.get('content-type')) {
        resultJson = await result.json();
      }

      if (result.ok) {
        shouldUseValidateLoginUser &&
          isTokenCall &&
          validateLoginResponse({ ...apiCallParams, ...request }, result, resultJson);
        deferFn.resolve(resultJson);
      } else {
        return Promise.reject({ responseJSON: resultJson, status: result.status });
      }
    })
    .catch((error) =>
      _handleApiGatewayErrors(deferFn, retryFn, request.url, {
        ...error,
        then: () => new Promise((reject) => reject(error))
      })
    );

  return deferFn.promise;
};

const _formulateUrl = (request: HttpRequest) => {
  const { query, url } = request;

  return _.isEmpty(query) ? url : _appendQueryParams(url, query);
};

const _createAjaxRequest = (request: HttpRequest) => {
  const { body = {}, contentType, type, ...others } = request;

  const ajaxRequest = {
    method: type,
    ...others
  };

  let formBody = [];

  if (contentType === FORM_URL_ENCODE_CONTENT_TYPE) {
    formBody = Object.keys(body).reduce((accumulator, key) => {
      if (!body[key]) return accumulator;

      const encodedValue = _.get(body, key, '').replace(/\s/, '+');

      accumulator.push(`${key}=${encodedValue}`);

      return accumulator;
    }, []);
  }

  const data = contentType === FORM_URL_ENCODE_CONTENT_TYPE ? formBody.join('&') : JSON.stringify(body);

  return _.isEmpty(body) ? ajaxRequest : _.merge(ajaxRequest, { body: data });
};

const _getDefaultHeadersAndTimeout = (timeout: ?number, channelId: ?string, contentType: ?string) => {
  const webViewExperienceId = localStorage.get(StorageKeys.WEB_VIEW_EXPERIENCE_ID);
  const webViewAppVersion = localStorage.get(StorageKeys.WEB_VIEW_APP_VERSION);
  const webViewChannel = getWebViewChannel();
  const webViewCorporateChannel = getWebViewCorporateChannel();
  const shouldUseWebViewChannel = webViewChannel || webViewCorporateChannel;
  const leisureChannelId = webViewChannel || OAUTH.CHANNEL_ID;
  const corporateChannelId = webViewCorporateChannel || OAUTH.CHANNEL_ID_CORPORATE;
  const diagnostic = { spa: getAppVersion(), ...(webViewAppVersion && { native: webViewAppVersion }) };

  return {
    headers: {
      'X-API-Key': getWebViewApiKey() || environment.api,
      'X-Channel-ID':
        !shouldUseWebViewChannel && channelId ? channelId : hasCorporateToken() ? corporateChannelId : leisureChannelId,
      'X-User-Experience-ID': webViewExperienceId || UUIDRepo.getUUID(),
      'x-app-version': [webViewAppVersion, getAppVersion()].filter(Boolean).join('|'),
      'x-diagnostic': JSON.stringify(diagnostic),
      'x-mobile-js': 1,
      ...(contentType === FORM_URL_ENCODE_CONTENT_TYPE ? {} : { Accept: 'application/json' }),
      'Content-Type': contentType || 'application/json'
    },
    timeout
  };
};

const _appendQueryParams = (url: string, query: *) => {
  const existedQuery = url.split('?')[1];
  const stringifiedQuery = param(query);
  const queryParams = _.isEmpty(existedQuery) ? `?${stringifiedQuery}` : `&${stringifiedQuery}`;

  return url + queryParams;
};

const _shouldAllowToShowReLoginModal = (url) => {
  const { location } = BrowserObject;
  const softRequests = [{ url: 'userinfo', path: '/' }];

  const requestUrlAndPathMatches = (request) => url.includes(request.url) && location?.pathname === request.path;

  return !_.find(softRequests, requestUrlAndPathMatches);
};

const _shouldShowCancelButtonReLoginModal = (url) =>
  !!_.find(showCancelButtonPaths, (pathName) => url.includes(pathName));

const _handleApiGatewayErrors = (deferFn: deferType, retryFn: (*) => *, url: string, error: ApiErrorType) => {
  const errorCode = _.get(error, 'responseJSON.code');
  const { location } = BrowserObject;
  const loginErrorsModalOptions = {
    hasCancelButton: true,
    isAccountNumberEditable: true,
    shouldRedirectToHomePage: true
  };
  const reAuthModalOptions = { hasCancelButton: true, shouldRedirectToHomePage: true };
  const shouldShowCancelButton = _shouldShowCancelButtonReLoginModal(location?.pathname);
  const reLoginErrorsModalOptions = {
    hasCancelButton: shouldShowCancelButton,
    shouldRedirectToHomePage: shouldShowCancelButton
  };

  if (_.values(GATEWAY_SCOPE_ERRORS).includes(errorCode)) {
    store.dispatch(removeSelectedCompany()).then(retryFn);
  } else if (_.values(GATEWAY_LOGIN_ERRORS).includes(errorCode)) {
    store.dispatch(showReLoginModal(retryFn, loginErrorsModalOptions));
  } else if (_.values(GATEWAY_RELOGIN_ERRORS).includes(errorCode)) {
    if (_shouldAllowToShowReLoginModal(url)) {
      store.dispatch(showReLoginModal(retryFn, reLoginErrorsModalOptions));
    } else {
      store.dispatch(forceHideSpinner(0));
      store.dispatch(cleanUpEndOfSession());
    }
  } else if (_.values(GATEWAY_REAUTHENTICATE_ERRORS).includes(errorCode)) {
    store.dispatch(showReLoginModal(retryFn, reAuthModalOptions));
  } else if (_.values(GATEWAY_RETRY_ERRORS).includes(errorCode)) {
    store.dispatch(handleNativeLogout());
    store.dispatch(cleanUpEndOfSession());
    store.dispatch(setReLoginCallbackFunctions({}));
    retryFn(true);
  } else {
    _handleAllOtherErrors(deferFn, url, error);
  }
};

const _handleAllOtherErrors = (deferFn: deferType, url: string, error: ApiErrorType) => {
  _logErrors(url, error);
  deferFn.reject(error);
};

export const _logErrors = (url: string, apiError: ApiErrorType) => {
  const {
    responseJSON: { code, details = {}, error = '', httpStatusCode = '', message = '', requestId = '' } = {},
    status
  } = apiError;
  const MAX_LENGTH_CHAPI_ACCEPTS = 100;
  const logDetails = {
    ...details,
    code,
    error,
    httpStatusCode,
    message,
    requestId
  };

  if (apiError?.responseJSON && url !== `/api/logging/${apiErrorLogUrl}`) {
    const errorLog = [
      {
        action: url,
        component: 'restClient',
        count: 1,
        details: stringifyDetails(logDetails),
        errorCode: code,
        httpCode: status,
        level: LOG_LEVEL.ERROR,
        location: getLocationPathname(),
        message: message.substring(0, MAX_LENGTH_CHAPI_ACCEPTS),
        timestamp: getErrorLogTimestamp()
      }
    ];

    if (code === ERROR_SHAPE_ACCESS_DENIED) {
      errorLog[0].component = 'SHAPE';
    }
    sendErrorLog(errorLog);
  }
};

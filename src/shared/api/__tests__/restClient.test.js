jest.mock('src/shared/api/helpers/loggingHelper', () => ({
  getErrorLogTimestamp: jest.fn().mockReturnValue(1234567890),
  getLocationPathname: jest.fn().mockReturnValue('/mock/location/pathname'),
  stringifyDetails: jest.fn().mockReturnValue('Mock stringified details')
}));

import dayjs from 'dayjs';
import * as reLoginModalActions from 'src/login/actions/reLoginModalActions';
import * as accountActions from 'src/shared/actions/accountActions';
import * as webViewActions from 'src/shared/actions/webViewActions';
import { stringifyDetails } from 'src/shared/api/helpers/loggingHelper';
import * as loggingApi from 'src/shared/api/loggingApi';
import * as restClient from 'src/shared/api/restClient';
import { defer } from 'src/shared/api/restClient';
import * as environmentConfig from 'src/shared/config/environmentConfig';
import {
  ERROR_HAWAII_MESSAGE,
  ERROR_SHAPE_ACCESS_DENIED,
  GATEWAY_LOGIN_ERRORS,
  GATEWAY_REAUTHENTICATE_ERRORS,
  GATEWAY_RELOGIN_ERRORS,
  GATEWAY_RETRY_ERRORS,
  GATEWAY_SCOPE_ERRORS
} from 'src/shared/constants/errorCodes';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';
import SharedConstants from 'src/shared/constants/sharedConstants';
import * as loginSessionHelper from 'src/shared/helpers/loginSessionHelper';
import StorageKeys from 'src/shared/helpers/storageKeys';
import * as ValidateLoginHelper from 'src/shared/helpers/validateLoginHelper';
import { LOGIN_RR_MISMATCH_ERROR_CODE } from 'src/shared/helpers/validateLoginHelper';
import * as webViewHelper from 'src/shared/helpers/webViewHelper';
import localStorage from 'store2';
import LoginApiResponseBuilder from 'test/builders/apiResponse/loginApiResponseBuilder';
import waitFor from 'test/unit/helpers/waitFor';

const { apiErrorLogUrl } = SharedConstants;
const { WEB_VIEW_CHANNEL, WEB_VIEW_CORPORATE_CHANNEL, WEB_VIEW_API_KEY, WEB_VIEW_EXPERIENCE_ID, WEB_VIEW_APP_VERSION } =
  StorageKeys;

describe('rest client', () => {
  const mockAppVersion = '1.0.0';
  const mockLocationPathname = '/mock/location/pathname';
  const mockMessage = 'Sorry! We had a problem. Please try again.';
  const mockStringifiedDetails = 'Mock stringified details';
  const mockTimestamp = 1234567890;
  let restClientStub;
  let UUIDRepo;
  let environment;
  let fetchStub, localStorageGetStub, removeSelectedCompanyStub, sendErrorLogStub;
  let cleanUpEndOfSessionStub;
  let handleNativeLogoutStub;
  let showReLoginModalStub;
  let setReLoginCallbackFunctionsStub;
  let store;
  let REQUEST_DATA;
  let getWebViewApiKeyStub;
  let getWebViewChannelStub;
  let getWebViewCorporateChannelStub;
  let getAppVersionStub;
  let hasCorporateTokenStub;
  let apiResponseBuilder;
  let validateLoginResponseStub;

  beforeEach(() => {
    REQUEST_DATA = {
      url: 'http://url.com',
      params: 'params'
    };
    restClientStub = jest.spyOn(restClient, 'ajax');
    environment = require('src/shared/api/apiRoutes').default;
    UUIDRepo = require('src/app/stores/uuidRepo').default;
    ({ store } = require('src/shared/redux/createStore'));
    setReLoginCallbackFunctionsStub = jest.spyOn(reLoginModalActions, 'setReLoginCallbackFunctions');
    apiResponseBuilder = new LoginApiResponseBuilder().build();
    removeSelectedCompanyStub = jest
      .spyOn(accountActions, 'removeSelectedCompany')
      .mockReturnValue('mockRemoveSelectedCompanyAction');
    cleanUpEndOfSessionStub = jest
      .spyOn(accountActions, 'cleanUpEndOfSession')
      .mockReturnValue('mockCleanUpEndOfSessionStubAction');
    handleNativeLogoutStub = jest.fn();
    environment.api = 'API-KEY';
    sendErrorLogStub = jest.spyOn(loggingApi, 'sendErrorLog').mockImplementation(() => {});
    localStorageGetStub = jest.spyOn(localStorage, 'get');
    getWebViewApiKeyStub = jest.spyOn(webViewHelper, 'getWebViewApiKey');
    getWebViewApiKeyStub.mockReturnValue(undefined);
    getWebViewChannelStub = jest.spyOn(webViewHelper, 'getWebViewChannel');
    getWebViewChannelStub.mockReturnValue(undefined);
    getWebViewCorporateChannelStub = jest.spyOn(webViewHelper, 'getWebViewCorporateChannel');
    getWebViewCorporateChannelStub.mockReturnValue(undefined);
    hasCorporateTokenStub = jest.spyOn(loginSessionHelper, 'hasCorporateToken');
    hasCorporateTokenStub.mockReturnValue(false);
    getAppVersionStub = jest.spyOn(environmentConfig, 'getAppVersion');
    getAppVersionStub.mockReturnValue(mockAppVersion);
    showReLoginModalStub = jest.spyOn(reLoginModalActions, 'showReLoginModal');
    validateLoginResponseStub = jest.spyOn(ValidateLoginHelper, 'validateLoginResponse');
    jest.spyOn(UUIDRepo, 'getUUID').mockReturnValue('UUID');
    jest.spyOn(webViewActions, 'handleNativeLogout').mockImplementation(handleNativeLogoutStub);
    jest.spyOn(webViewHelper, 'handleNativeLogout').mockImplementation(handleNativeLogoutStub);
    jest.spyOn(store, 'dispatch').mockImplementation(() => {
      const promiseDefer = defer();

      promiseDefer.resolve();

      return promiseDefer.promise;
    });
    fetchStub = fetch.mockImplementation(() => {
      const promiseDefer = defer();

      promiseDefer.resolve({
        ok: true,
        json: jest.fn().mockReturnValue('response'),
        headers: { get: () => ({ 'content-type': 'json' }) }
      });

      return promiseDefer.promise;
    });
  });

  afterEach(() => {
    fetchStub.mockClear();
    jest.clearAllMocks();
  });

  it('should send http request with all 3 header keys even if authentication is false', async () => {
    localStorageGetStub.mockImplementation((arg) =>
      (arg === WEB_VIEW_EXPERIENCE_ID || arg === WEB_VIEW_APP_VERSION || arg === WEB_VIEW_API_KEY
        ? undefined
        : apiResponseBuilder)
    );

    const response = await restClientStub(REQUEST_DATA);

    expect(response).toBe('response');
    const { headers } = fetchStub.mock.calls[0][1];

    expect(headers['X-API-Key']).toBe('API-KEY');
    expect(headers['X-Channel-ID']).not.toBeNull();
    expect(headers['X-User-Experience-ID']).toBe('UUID');
    expect(headers['x-mobile-js']).toBe(1);
    expect(fetchStub.mock.calls[0][1]).toMatchObject({
      url: 'http://url.com',
      params: 'params',
      timeout: 90000
    });
  });

  it('should send http request with passed in timeout value', (done) => {
    localStorageGetStub.mockImplementation((arg) =>
      (arg === WEB_VIEW_EXPERIENCE_ID || arg === WEB_VIEW_APP_VERSION || arg === WEB_VIEW_API_KEY
        ? undefined
        : apiResponseBuilder)
    );

    restClientStub(REQUEST_DATA, false, 100).then((response) => {
      expect(response).toBe('response');
      expect(fetchStub.mock.calls[0][1]).toMatchObject({
        url: 'http://url.com',
        params: 'params',
        timeout: 100
      });
      done();
    });
  });

  it('should use provided channel id if no web view channel is set', (done) => {
    localStorageGetStub.mockImplementation((arg) =>
      ([WEB_VIEW_EXPERIENCE_ID, WEB_VIEW_APP_VERSION, WEB_VIEW_CHANNEL, WEB_VIEW_CORPORATE_CHANNEL].includes(arg)
        ? undefined
        : apiResponseBuilder)
    );

    restClientStub(REQUEST_DATA, false, 9000, 'MWEB_CORP').then(() => {
      expect(fetchStub.mock.calls[0][1].headers).toMatchObject({
        'X-Channel-ID': 'MWEB_CORP'
      });
      done();
    });
  });

  it('should use provided channel id if no web view channel is set even if different from oauth scope', (done) => {
    localStorageGetStub.mockImplementation((arg) =>
      ([WEB_VIEW_EXPERIENCE_ID, WEB_VIEW_APP_VERSION, WEB_VIEW_CHANNEL, WEB_VIEW_CORPORATE_CHANNEL].includes(arg)
        ? undefined
        : apiResponseBuilder)
    );

    restClientStub(REQUEST_DATA, false, 9000, 'MWEB').then(() => {
      expect(fetchStub.mock.calls[0][1].headers).toMatchObject({
        'X-Channel-ID': 'MWEB'
      });
      done();
    });
  });

  it('should use corporate channel id if corporate token was received', (done) => {
    localStorageGetStub.mockImplementation((arg) =>
      ([WEB_VIEW_EXPERIENCE_ID, WEB_VIEW_APP_VERSION, WEB_VIEW_CHANNEL, WEB_VIEW_CORPORATE_CHANNEL].includes(arg)
        ? undefined
        : apiResponseBuilder)
    );
    hasCorporateTokenStub.mockReturnValue(true);

    restClientStub(REQUEST_DATA).then(() => {
      expect(fetchStub.mock.calls[0][1].headers).toMatchObject({
        'X-Channel-ID': 'MWEB_CORP'
      });
      done();
    });
  });

  it('should use leisure channel id if leisure token was received', (done) => {
    localStorageGetStub.mockImplementation((arg) =>
      ([WEB_VIEW_EXPERIENCE_ID, WEB_VIEW_APP_VERSION, WEB_VIEW_CHANNEL].includes(arg) ? undefined : apiResponseBuilder)
    );

    restClientStub(REQUEST_DATA, false).then(() => {
      expect(fetchStub.mock.calls[0][1].headers).toMatchObject({
        'X-Channel-ID': 'MWEB'
      });
      done();
    });
  });

  it('should use web view api key if it exists', (done) => {
    const apiKey = 'WEB_VIEW_API_KEY';

    getWebViewApiKeyStub.mockReturnValue(apiKey);

    restClientStub(REQUEST_DATA).then((response) => {
      expect(response).toBe('response');
      expect(fetchStub.mock.calls[0][1].headers).toMatchObject({
        'X-API-Key': apiKey
      });

      done();
    });
  });

  it('should use web view channel if it exists', (done) => {
    const channel = 'WEB_VIEW_CHANNEL';

    getWebViewChannelStub.mockReturnValue(channel);

    REQUEST_DATA.url = 'http://url/mobile-air-operations/';

    restClientStub(REQUEST_DATA, false).then(() => {
      expect(fetchStub).toBeCalledWith('http://url/mobile-air-operations/', {
        url: 'http://url/mobile-air-operations/',
        params: 'params',
        headers: {
          'X-API-Key': 'API-KEY',
          'X-Channel-ID': channel,
          'X-User-Experience-ID': 'UUID',
          'x-app-version': mockAppVersion,
          "x-diagnostic": "{\"spa\":\"1.0.0\"}",
          'x-mobile-js': 1,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 90000
      });
      done();
    });
  });

  it('should use web view corporate channel if it exists', (done) => {
    const corporateChannel = 'WEB_VIEW_CORPORATE_CHANNEL';

    getWebViewCorporateChannelStub.mockReturnValue(corporateChannel);
    hasCorporateTokenStub.mockReturnValue(true);

    REQUEST_DATA.url = 'http://url/mobile-air-operations/';

    restClientStub(REQUEST_DATA, false).then(() => {
      expect(fetchStub).toBeCalledWith(REQUEST_DATA.url, {
        url: 'http://url/mobile-air-operations/',
        params: 'params',
        headers: {
          'X-API-Key': 'API-KEY',
          'X-Channel-ID': corporateChannel,
          'X-User-Experience-ID': 'UUID',
          'x-app-version': mockAppVersion,
          "x-diagnostic": "{\"spa\":\"1.0.0\"}",
          'x-mobile-js': 1,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 90000
      });
      done();
    });
  });

  it('should use web view experience id if it exists', (done) => {
    const mockWebViewExperienceId = 'mock_id';

    localStorageGetStub.mockImplementation((arg) =>
      ([WEB_VIEW_EXPERIENCE_ID].includes(arg) ? mockWebViewExperienceId : undefined)
    );
    REQUEST_DATA.url = 'http://url/mobile-air-operations/';

    restClientStub(REQUEST_DATA, false).then(() => {
      expect(fetchStub).toBeCalledWith(REQUEST_DATA.url, {
        url: 'http://url/mobile-air-operations/',
        params: 'params',
        headers: {
          'X-API-Key': 'API-KEY',
          'X-Channel-ID': 'MWEB',
          'X-User-Experience-ID': mockWebViewExperienceId,
          'x-app-version': mockAppVersion,
          "x-diagnostic": "{\"spa\":\"1.0.0\"}",
          'x-mobile-js': 1,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 90000
      });
      done();
    });
  });

  it('should use web view app version if it exists', (done) => {
    const mockWebViewAppVersion = '10.0.0';

    localStorageGetStub.mockImplementation((arg) =>
      ([WEB_VIEW_APP_VERSION].includes(arg) ? mockWebViewAppVersion : undefined)
    );
    REQUEST_DATA.url = 'http://url/mobile-air-operations/';

    restClientStub(REQUEST_DATA, false).then(() => {
      expect(fetchStub).toBeCalledWith(REQUEST_DATA.url, {
        url: 'http://url/mobile-air-operations/',
        params: 'params',
        headers: {
          'X-API-Key': 'API-KEY',
          'X-Channel-ID': 'MWEB',
          'X-User-Experience-ID': 'UUID',
          'x-app-version': `${mockWebViewAppVersion}|1.0.0`,
          "x-diagnostic": "{\"spa\":\"1.0.0\",\"native\":\"10.0.0\"}",
          'x-mobile-js': 1,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 90000
      });
      done();
    });
  });

  it('should handle gateway authorization errors for public url', (done) => {
    REQUEST_DATA = { ...REQUEST_DATA, url: 'userinfo', path: '/' };
    const { path } = window.location;

    window.location.path = '/';
    fetchStub.mockClear();
    const getFakeAjax = (errorCode) => () => {
      const promiseDefer = defer();

      if (errorCode) {
        promiseDefer.reject({
          responseJSON: {
            code: errorCode,
            message: mockMessage
          },
          status: 400
        });
      } else {
        promiseDefer.resolve({
          ok: true,
          json: jest.fn().mockReturnValue('response'),
          headers: { get: () => ({ 'content-type': 'json' }) }
        });
      }

      return promiseDefer.promise;
    };

    fetchStub
      .mockImplementationOnce(getFakeAjax(GATEWAY_RELOGIN_ERRORS.ERROR_ACCESS_TOKEN_EXPIRED))
      .mockImplementationOnce(getFakeAjax());

    restClientStub(REQUEST_DATA);

    restClientStub(REQUEST_DATA).then(() => {
      expect(sendErrorLogStub).not.toHaveBeenCalled();
      window.location.path = path;
      done();
    });
  });

  it('should not set id token and authorization header if cookies exist', (done) => {
    REQUEST_DATA.url = 'http://url/mobile-misc/';
    localStorageGetStub.mockImplementation((arg) =>
      (['OAUTH_LOGIN_STATUS'].includes(arg)
        ? {
          access_token: 'access_token',
          expirationDate: dayjs().add(1, 'year').format(),
          id_token: 'id_token',
          token_type: 'Bearer'
        }
        : undefined)
    );

    restClientStub(REQUEST_DATA, true);

    waitFor.untilAssertPass(() => {
      expect(fetchStub).toBeCalledWith(REQUEST_DATA.url, {
        url: 'http://url/mobile-misc/',
        params: 'params',
        headers: {
          'X-API-Key': 'API-KEY',
          'X-Channel-ID': 'MWEB',
          'X-User-Experience-ID': 'UUID',
          'x-app-version': mockAppVersion,
          "x-diagnostic": "{\"spa\":\"1.0.0\"}",
          'x-mobile-js': 1,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 90000
      });
    }, done);
  });

  it('should handle gateway reLogin errors', (done) => {
    fetchStub.mockImplementation(() => {
      const promiseDefer = defer();

      promiseDefer.reject({
        responseJSON: {
          code: GATEWAY_RELOGIN_ERRORS.ERROR_ACCESS_TOKEN_NOT_VALID,
          message: ''
        },
        status: 401
      });

      return promiseDefer.promise;
    });

    restClientStub(REQUEST_DATA);

    waitFor.untilAssertPass(() => {
      expect(showReLoginModalStub).toHaveBeenCalled();
      expect(sendErrorLogStub).not.toHaveBeenCalled();
      expect(removeSelectedCompanyStub).not.toHaveBeenCalled();
    }, done);
  });

  it('should handle gateway retry errors', (done) => {
    const getFakeAjax = (errorCode) => () => {
      const promiseDefer = defer();

      if (errorCode) {
        promiseDefer.reject({
          responseJSON: {
            code: errorCode,
            message: mockMessage
          },
          status: 400
        });
      } else {
        promiseDefer.resolve({
          ok: true,
          json: jest.fn().mockReturnValue('response'),
          headers: { get: () => ({ 'content-type': 'json' }) }
        });
      }

      return promiseDefer.promise;
    };

    fetchStub
      .mockImplementationOnce(getFakeAjax(GATEWAY_RETRY_ERRORS.ERROR_ELEVATED_ACCESS_TOKEN_NOT_VALID))
      .mockImplementationOnce(getFakeAjax());

    restClientStub(REQUEST_DATA);

    waitFor.untilAssertPass(() => {
      expect(setReLoginCallbackFunctionsStub).toBeCalledWith({});
      expect(cleanUpEndOfSessionStub).toHaveBeenCalled();
      expect(handleNativeLogoutStub).toHaveBeenCalled();
    }, done);
  });

  it('should handle empty response', (done) => {
    const getFakeAjax = () => () => {
      const promiseDefer = defer();

      promiseDefer.resolve({
        ok: true,
        json: '',
        headers: { get: () => {} }
      });

      return promiseDefer.promise;
    };

    fetchStub.mockImplementationOnce(getFakeAjax());

    restClientStub(REQUEST_DATA);

    waitFor.untilAssertPass(() => {
      expect(setReLoginCallbackFunctionsStub).not.toHaveBeenCalled();
    }, done);
  });

  it('should handle empty response with reject', (done) => {
    const getFakeAjax = () => () => {
      const promiseDefer = defer();

      promiseDefer.reject({
        responseJSON: {
          code: 1,
          message: ''
        },
        status: 401
      });

      return promiseDefer.promise;
    };

    fetchStub.mockImplementationOnce(getFakeAjax());

    restClientStub(REQUEST_DATA).catch((data) => {
      data.then();
      expect(setReLoginCallbackFunctionsStub).not.toHaveBeenCalled();
      done();
    });
  });

  it('should handle gateway reauthenticate errors', (done) => {
    fetchStub.mockImplementation(() => {
      const promiseDefer = defer();

      promiseDefer.reject({
        responseJSON: {
          code: GATEWAY_REAUTHENTICATE_ERRORS.ERROR_ELEVATED_LOGIN_TIME_EXPIRED,
          message: ''
        },
        status: 401
      });

      return promiseDefer.promise;
    });

    restClientStub(REQUEST_DATA);

    waitFor.untilAssertPass(() => {
      expect(showReLoginModalStub).toHaveBeenCalled();
      expect(sendErrorLogStub).not.toHaveBeenCalled();
      expect(cleanUpEndOfSessionStub).not.toHaveBeenCalled();
      expect(removeSelectedCompanyStub).not.toHaveBeenCalled();
    }, done);
  });

  it('should log errors', async () => {
    const mockError = 'mock_error';
    const mockHttpStatusCode = 'MOCK_HTTP_STATUS_CODE';
    const mockRequestId = 'abc123';

    fetchStub.mockImplementation(() => {
      const promiseDefer = defer();

      promiseDefer.reject({
        responseJSON: {
          code: ERROR_HAWAII_MESSAGE,
          error: mockError,
          httpStatusCode: mockHttpStatusCode,
          message: mockMessage,
          requestId: mockRequestId
        },
        status: 400
      });

      return promiseDefer.promise;
    });

    const messages = [
      {
        action: 'http://url.com',
        component: 'restClient',
        count: 1,
        details: mockStringifiedDetails,
        errorCode: ERROR_HAWAII_MESSAGE,
        httpCode: 400,
        level: LOG_LEVEL.ERROR,
        location: mockLocationPathname,
        message: mockMessage,
        timestamp: mockTimestamp
      }
    ];

    await restClientStub(REQUEST_DATA).catch(() => {
      expect(sendErrorLogStub).toBeCalledWith(messages);
      expect(stringifyDetails).toBeCalledWith({
        code: ERROR_HAWAII_MESSAGE,
        error: mockError,
        httpStatusCode: mockHttpStatusCode,
        message: mockMessage,
        requestId: mockRequestId
      });
    });
  });

  it('should do regular calls for token call', (done) => {
    REQUEST_DATA = { ...REQUEST_DATA, url: 'api/security/v4/security/token' };

    const getFakeAjax = (errorCode) => () => {
      const promiseDefer = defer();

      if (errorCode) {
        promiseDefer.reject({
          responseJSON: {
            code: errorCode,
            message: mockMessage
          },
          status: 400
        });
      } else {
        promiseDefer.resolve({
          ok: true,
          json: jest.fn().mockReturnValue('response'),
          headers: { get: () => ({ 'content-type': 'json' }) }
        });
      }

      return promiseDefer.promise;
    };

    fetchStub.mockImplementationOnce(getFakeAjax(GATEWAY_RELOGIN_ERRORS.ERROR_ACCESS_TOKEN_EXPIRED));

    restClientStub(REQUEST_DATA);

    waitFor.untilAssertPass(() => {
      expect(sendErrorLogStub).not.toHaveBeenCalled();
    }, done);
  });

  it('should call validateLoginResponse', (done) => {
    validateLoginResponseStub.mockReturnValueOnce(true);
    localStorageGetStub.mockReturnValue({ VALIDATE_LOGIN_USER: true });
    REQUEST_DATA = { ...REQUEST_DATA, url: 'api/security/v4/security/token' };
    const getFakeAjax = () => () => {
      const promiseDefer = defer();

      promiseDefer.resolve({
        ok: true,
        json: '',
        headers: { get: () => {} }
      });

      return promiseDefer.promise;
    };

    fetchStub.mockImplementationOnce(getFakeAjax());

    restClientStub(REQUEST_DATA).then(() => {
      expect(validateLoginResponseStub).toHaveBeenCalled();
      done();
    });
  });

  it('should show relogin modal with cancel button in showCancelButtonPaths', (done) => {
    const getFakeAjax = (errorCode) => () => {
      const promiseDefer = defer();

      if (errorCode) {
        promiseDefer.reject({
          responseJSON: {
            code: errorCode,
            message: mockMessage
          },
          status: 400
        });
      } else {
        promiseDefer.resolve({
          ok: true,
          json: jest.fn().mockReturnValue('response'),
          headers: { get: () => ({ 'content-type': 'json' }) }
        });
      }

      return promiseDefer.promise;
    };

    REQUEST_DATA = { ...REQUEST_DATA, url: 'api/security/v4/security/token' };
    window.history.pushState({}, 'Upcoming Trips', '/my-account/upcoming-trips');
    fetchStub.mockImplementationOnce(getFakeAjax(GATEWAY_RELOGIN_ERRORS.ERROR_ACCESS_TOKEN_NOT_FOUND));

    restClientStub(REQUEST_DATA);

    waitFor.untilAssertPass(() => {
      expect(showReLoginModalStub).toHaveBeenCalledWith(expect.anything(), {
        hasCancelButton: true,
        shouldRedirectToHomePage: true
      });
      window.history.replaceState({}, '', '/');
    }, done);
  });

  describe('called with query parameters', () => {
    it('should add stringified query parameter onto url when there is no query string on url', () => {
      const request = {
        url: 'http://example.com/api',
        query: {
          key1: 'value1',
          key2: 'value2'
        }
      };

      return restClientStub(request).then(() => {
        expect(fetchStub.mock.calls[fetchStub.mock.calls.length - 1][0]).toBe(
          'http://example.com/api?key1=value1&key2=value2'
        );
      });
    });

    it('should append stringified query parameter onto url when there is query string on url', () => {
      const request = {
        url: 'http://example.com/api?key=value',
        query: {
          key1: 'value1',
          key2: 'value2'
        }
      };

      return restClientStub(request).then(() => {
        expect(fetchStub.mock.calls[fetchStub.mock.calls.length - 1][0]).toBe(
          'http://example.com/api?key=value&key1=value1&key2=value2'
        );
      });
    });
  });

  describe('called with body parameters', () => {
    it('should called with stringified body parameters', () => {
      const request = {
        url: 'http://example.com/api',
        body: {
          key1: 'value1',
          key2: 'value2'
        }
      };

      return restClientStub(request).then(() => {
        expect(fetchStub.mock.calls[fetchStub.mock.calls.length - 1][1].body).toBe('{"key1":"value1","key2":"value2"}');
      });
    });

    it('should called with original body parameters when content type is `x-www-form-urlencoded`', () => {
      const request = {
        url: 'http://example.com/api',
        body: {
          key1: 'value1',
          key2: 'value2',
          key3: ''
        },
        contentType: 'application/x-www-form-urlencoded'
      };

      return restClientStub(request).then(() => {
        expect(fetchStub.mock.calls[fetchStub.mock.calls.length - 1][1].body).toBe('key1=value1&key2=value2');
      });
    });
  });

  describe('user experience id and channel id in request header', () => {
    beforeEach(() => {
      localStorageGetStub.mockReturnValue(undefined);
    });

    it('should exist when making mobile-misc call', (done) => {
      REQUEST_DATA.url = 'http://url/mobile-misc/';

      restClientStub(REQUEST_DATA, false).then(() => {
        expect(fetchStub).toBeCalledWith(REQUEST_DATA.url, {
          url: 'http://url/mobile-misc/',
          params: 'params',
          headers: {
            'X-API-Key': 'API-KEY',
            'X-Channel-ID': 'MWEB',
            'X-User-Experience-ID': 'UUID',
            'x-app-version': mockAppVersion,
            "x-diagnostic": "{\"spa\":\"1.0.0\"}",
            'x-mobile-js': 1,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          timeout: 90000
        });
        done();
      });
    });

    it('should exist when making mobile-air-booking call', (done) => {
      REQUEST_DATA.url = 'http://url/mobile-air-booking/';

      restClientStub(REQUEST_DATA, false).then(() => {
        expect(fetchStub).toBeCalledWith(REQUEST_DATA.url, {
          url: 'http://url/mobile-air-booking/',
          params: 'params',
          headers: {
            'X-API-Key': 'API-KEY',
            'X-Channel-ID': 'MWEB',
            'X-User-Experience-ID': 'UUID',
            'x-app-version': mockAppVersion,
            "x-diagnostic": "{\"spa\":\"1.0.0\"}",
            'x-mobile-js': 1,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          timeout: 90000
        });
        done();
      });
    });

    it('should exist when making security call', (done) => {
      REQUEST_DATA.url = 'http://url/security/';

      restClientStub(REQUEST_DATA, false).then(() => {
        expect(fetchStub).toBeCalledWith(REQUEST_DATA.url, {
          url: 'http://url/security/',
          params: 'params',
          headers: {
            'X-API-Key': 'API-KEY',
            'X-Channel-ID': 'MWEB',
            'X-User-Experience-ID': 'UUID',
            'x-app-version': mockAppVersion,
            "x-diagnostic": "{\"spa\":\"1.0.0\"}",
            'x-mobile-js': 1,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          timeout: 90000
        });
        done();
      });
    });

    it('should exist when making x-resource call', (done) => {
      REQUEST_DATA.url = 'http://url/x-reservation/';

      restClientStub(REQUEST_DATA, false).then(() => {
        expect(fetchStub).toBeCalledWith(REQUEST_DATA.url, {
          url: 'http://url/x-reservation/',
          params: 'params',
          headers: {
            'X-API-Key': 'API-KEY',
            'X-Channel-ID': 'MWEB',
            'X-User-Experience-ID': 'UUID',
            'x-app-version': mockAppVersion,
            "x-diagnostic": "{\"spa\":\"1.0.0\"}",
            'x-mobile-js': 1,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          timeout: 90000
        });
        done();
      });
    });

    it('should exist when making mobile-air-operations call', (done) => {
      REQUEST_DATA.url = 'http://url/mobile-air-operations/';

      restClientStub(REQUEST_DATA, false).then(() => {
        expect(fetchStub).toBeCalledWith(REQUEST_DATA.url, {
          url: 'http://url/mobile-air-operations/',
          params: 'params',
          headers: {
            'X-API-Key': 'API-KEY',
            'X-Channel-ID': 'MWEB',
            'X-User-Experience-ID': 'UUID',
            'x-app-version': mockAppVersion,
            "x-diagnostic": "{\"spa\":\"1.0.0\"}",
            'x-mobile-js': 1,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          timeout: 90000
        });
        done();
      });
    });

    it('should exist when making mobile-air-shopping call', (done) => {
      REQUEST_DATA.url = 'http://url/mobile-air-shopping/';

      restClientStub(REQUEST_DATA, false).then(() => {
        expect(fetchStub).toBeCalledWith(REQUEST_DATA.url, {
          url: 'http://url/mobile-air-shopping/',
          params: 'params',
          headers: {
            'X-API-Key': 'API-KEY',
            'X-Channel-ID': 'MWEB',
            'X-User-Experience-ID': 'UUID',
            'x-app-version': mockAppVersion,
            "x-diagnostic": "{\"spa\":\"1.0.0\"}",
            'x-mobile-js': 1,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          timeout: 90000
        });
        done();
      });
    });
  });

  describe('error response from CHAPI', () => {
    it('should log errors', async () => {
      fetchStub.mockImplementation(() => {
        const promiseDefer = defer();

        promiseDefer.reject({
          responseJSON: {
            code: ERROR_HAWAII_MESSAGE,
            message: mockMessage
          },
          status: 400
        });

        return promiseDefer.promise;
      });

      const messages = [
        {
          action: 'http://url.com',
          component: 'restClient',
          count: 1,
          details: mockStringifiedDetails,
          errorCode: ERROR_HAWAII_MESSAGE,
          httpCode: 400,
          level: LOG_LEVEL.ERROR,
          location: mockLocationPathname,
          message: mockMessage,
          timestamp: mockTimestamp
        }
      ];

      await restClientStub({ ...REQUEST_DATA, url: 'http://url.com' }).catch(() => {
        expect(sendErrorLogStub).toBeCalledWith(messages);
      });
    });

    it('should log SHAPE errors with component specified', async () => {
      localStorageGetStub.mockImplementation((arg) =>
        (arg === 'OAUTH_LOGIN_STATUS'
          ? {
            access_token: 'access_token',
            expirationDate: dayjs().add(1, 'year').format(),
            id_token: 'id_token',
            token_type: 'Bearer'
          }
          : undefined)
      );

      fetchStub.mockImplementation(() => {
        const promiseDefer = defer();

        promiseDefer.reject({
          responseJSON: {
            code: ERROR_SHAPE_ACCESS_DENIED,
            message: mockMessage
          },
          status: 400
        });

        return promiseDefer.promise;
      });

      const messages = [
        {
          action: 'http://url.com',
          component: 'SHAPE',
          count: 1,
          details: mockStringifiedDetails,
          errorCode: ERROR_SHAPE_ACCESS_DENIED,
          httpCode: 400,
          level: LOG_LEVEL.ERROR,
          location: mockLocationPathname,
          message: mockMessage,
          timestamp: mockTimestamp
        }
      ];

      await restClientStub(REQUEST_DATA, true).catch(() => {
        expect(sendErrorLogStub).toBeCalledWith(messages);
      });
    });

    it('should convert corporate token to leisure and retry call when scope mismatch error received', (done) => {
      const getFakeAjax = (errorCode) => () => {
        const promiseDefer = defer();

        if (errorCode) {
          promiseDefer.reject({
            responseJSON: {
              code: errorCode,
              message: mockMessage
            },
            status: 400
          });
        } else {
          promiseDefer.resolve({
            ok: true,
            json: jest.fn().mockReturnValue('response'),
            headers: { get: () => ({ 'content-type': 'json' }) }
          });
        }

        return promiseDefer.promise;
      };

      sendErrorLogStub.mockClear();
      sendErrorLogStub = jest.spyOn(loggingApi, 'sendErrorLog').mockImplementation(() => {});
      fetchStub.mockClear();
      fetchStub
        .mockImplementationOnce(getFakeAjax(GATEWAY_SCOPE_ERRORS.ERROR_ACCESS_TOKEN_SCOPE_MISMATCH_OLD))
        .mockImplementationOnce(getFakeAjax());

      restClientStub(REQUEST_DATA)
        .then(() => {
          done();
        })
        .catch(() => {
          expect(sendErrorLogStub).not.toHaveBeenCalled();
          expect(store.dispatch).toBeCalledWith('mockRemoveSelectedCompanyAction');
          expect(removeSelectedCompanyStub).toHaveBeenCalled();
          expect(fetchStub.mock.calls.length > 1).toBe(true);
        });
    });

    it('should handle promise rejections', (done) => {
      const getFakeAjax = (errorCode) => () => {
        const promiseDefer = defer();

        if (errorCode) {
          promiseDefer.resolve({
            ok: false,
            json: jest.fn().mockReturnValue('response'),
            headers: { get: () => ({ 'content-type': 'json' }) }
          });
        } else {
          promiseDefer.resolve({
            ok: true,
            json: jest.fn().mockReturnValue('response'),
            headers: { get: () => ({ 'content-type': 'json' }) }
          });
        }

        return promiseDefer.promise;
      };

      sendErrorLogStub.mockClear();
      sendErrorLogStub = jest.spyOn(loggingApi, 'sendErrorLog').mockImplementation(() => {});
      fetchStub.mockClear();
      fetchStub
        .mockImplementationOnce(getFakeAjax(GATEWAY_SCOPE_ERRORS.ERROR_ACCESS_TOKEN_SCOPE_MISMATCH_OLD))
        .mockImplementationOnce(getFakeAjax());

      restClientStub(REQUEST_DATA)
        .then(() => {
          done();
        })
        .catch(() => {
          expect(sendErrorLogStub).toHaveBeenCalled();
          done();
        });
    });

    it(`should not log errors when the url is /api/logging/${apiErrorLogUrl}`, (done) => {
      fetchStub.mockImplementation(() => {
        const promiseDefer = defer();

        promiseDefer.reject({
          responseJSON: {
            code: ERROR_HAWAII_MESSAGE,
            message: mockMessage
          },
          status: 400
        });

        return promiseDefer.promise;
      });

      REQUEST_DATA = { ...REQUEST_DATA, url: `/api/logging/${apiErrorLogUrl}` };

      restClient._logErrors(`/api/logging/${apiErrorLogUrl}`, {});
      restClient._logErrors(`/api/logging/un`, {});
      restClient._logErrors(`/api/logging/${apiErrorLogUrl}`, {
        responseJSON: {
          code: ERROR_HAWAII_MESSAGE,
          message: mockMessage
        },
        status: 400
      });

      restClientStub(REQUEST_DATA).then(() => {
        expect(sendErrorLogStub).not.toHaveBeenCalled();
        done();
      });
    });

    it('should handle gateway login errors', (done) => {
      const getFakeAjax = (errorCode) => () => {
        const promiseDefer = defer();

        if (errorCode) {
          promiseDefer.reject({
            responseJSON: {
              code: GATEWAY_LOGIN_ERRORS.ERROR_RETRIEVING_RR_NUMBER_FROM_REQUEST,
              message: ''
            },
            status: 401
          });
        } else {
          promiseDefer.resolve({
            ok: true,
            json: jest.fn().mockReturnValue('response'),
            headers: { get: () => ({ 'content-type': 'json' }) }
          });
        }

        return promiseDefer.promise;
      };

      fetchStub
        .mockImplementationOnce(getFakeAjax(GATEWAY_LOGIN_ERRORS.ERROR_RETRIEVING_RR_NUMBER_FROM_REQUEST))
        .mockImplementationOnce(getFakeAjax());

      showReLoginModalStub.mockImplementation((r) => r());

      restClientStub(REQUEST_DATA)
        .then(() => done())
        .catch(() => {
          expect(showReLoginModalStub).toHaveBeenCalled();
          expect(sendErrorLogStub).not.toHaveBeenCalled();
          expect(cleanUpEndOfSessionStub).not.toHaveBeenCalled();
          expect(removeSelectedCompanyStub).not.toHaveBeenCalled();
          done();
        });
    });

    it('should log errors when user credentials or experience id mismatch', async () => {
      const responseJSONDetails = {
        "customerIdInResp": "601655902",
        "experienceIdReceived": "fd730c7a-cb84-4646-aa9e-e82713326cbd",
        "experienceIdInResp": "fd730c7a-cb84-4646-aa9e-e82713326cbd",
        "requestId": "fd730c7a-cb84-4646-aa9e-e82713326cbd:OYr4et0_TVikg1G1dZcPsQ:mweb",
        "usernameReceived": "601655902",
        "usernameInResp": "601655902"
      };

      fetchStub.mockImplementation(() => {
        const promiseDefer = defer();

        promiseDefer.reject({
          responseJSON: {
            code: LOGIN_RR_MISMATCH_ERROR_CODE,
            details: responseJSONDetails,
            error: 'SERVER FAILURE'
          },
          status: 200
        });

        return promiseDefer.promise;
      });

      const messages = [
        {
          action: '/api/security/v4/security/token',
          component: 'restClient',
          count: 1,
          details: mockStringifiedDetails,
          errorCode: 200003999,
          httpCode: 200,
          level: LOG_LEVEL.ERROR,
          location: mockLocationPathname,
          message: '',
          timestamp: mockTimestamp
        }
      ];

      await restClientStub({ ...REQUEST_DATA, url: '/api/security/v4/security/token' }).catch(() => {
        expect(sendErrorLogStub).toBeCalledWith(messages);
      });
    });
  });
});

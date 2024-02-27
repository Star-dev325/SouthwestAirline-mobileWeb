jest.mock('@swa-ui/hybrid', () => ({
  handleRouteChange: jest.fn()
}));

jest.mock('src/shared/constants/timeoutConstants', () => ({
  DEBOUNCE_DELAY: 1000
}));

import { handleRouteChange as handleRouteChangeFn } from '@swa-ui/hybrid';
import _ from 'lodash';
import { history } from 'src/appHistory';
import * as LocalStorageCache from 'src/shared/cache/localStorageCache';
import {
  LOGIN_TYPES,
  LOGIN_STATES,
  QUERY_PARAMS,
  ROUTES
} from 'src/shared/constants/webViewConstants';
import BrowserObject from 'src/shared/helpers/browserObject';
import StorageKeys from 'src/shared/helpers/storageKeys';
import {
  chasePromoClicked,
  decodeMessage,
  displayAppReview,
  enableNavigationControls,
  encodeMessage,
  exitWebView,
  getAdobeIdParam,
  getApiKeyParam,
  getAppVersion,
  getBooleanQueryParam,
  getCorporateChannelParam,
  getChannelParam,
  getDeviceTypeParam,
  getExperienceId,
  getShareFlightStatusParam,
  getUpgradeTypeParam,
  getWebViewApiKey,
  getWebViewChannel,
  getWebViewCorporateChannel,
  handleNativeLogout,
  hasWebViewInterface,
  hasWebViewParam,
  isBlankPage,
  isIndexPage,
  isLandingPage,
  isOnHomePage,
  isOnWebViewLandingPage,
  isWebViewLogin,
  isWebViewLogout,
  rememberApiKey,
  rememberAppVersion,
  rememberChannel,
  rememberChaseInfo,
  rememberCorporateChannel,
  rememberExperienceId,
  sendChaseOffers,
  shareFlightStatusDetails,
  shouldShowContinueAsGuest,
  showNativeApplePay,
  showNativeAppLogin,
  updateFlightStatusSearches
} from 'src/shared/helpers/webViewHelper.js';
import * as RouteStateHelper from 'src/shared/routeUtils/routeStateHelper';
import store2 from 'store2';

const { window } = BrowserObject;

const {
  AIR_BOOKING,
  AIR_BOOKING_LEGACY,
  BLANK,
  CAR_BOOKING,
  CONTACT_TRACING,
  FLIGHT_STATUS,
  LOOKUP_TRAVEL_FUNDS,
  OFFERS
} = ROUTES;
const {
  ADOBE_ID,
  API_KEY,
  APP_VERSION,
  CHANNEL,
  CORPORATE_CHANNEL,
  DEVICE_TYPE,
  EXPERIENCE_ID,
  SHARE_FLIGHT_STATUS,
  UPGRADE_TYPE,
  WEB_VIEW
} = QUERY_PARAMS;
const { NATIVE_LOG_IN, NATIVE_LOG_OUT, PENDING } = LOGIN_STATES;
const {
  OAUTH_LOGIN_STATUS,
  WEB_VIEW_API_KEY,
  WEB_VIEW_APP_VERSION,
  WEB_VIEW_CHANNEL,
  WEB_VIEW_CORPORATE_CHANNEL,
  WEB_VIEW_EXPERIENCE_ID
} = StorageKeys;

describe('WebViewHelper', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('isWebViewLogin', () => {
    it('should return false when not in a webview', () => {
      const props = { webViewLoginStatus: NATIVE_LOG_IN, isWebView: false };
      const prevProps = { ...props, webViewLoginStatus: PENDING };

      const result = isWebViewLogin(props, prevProps);

      expect(result).toEqual(false);
    });

    it(`should return false when previous props webViewLoginStatus was not ${PENDING}`, () => {
      const props = { webViewLoginStatus: NATIVE_LOG_IN, isWebView: true };
      const prevProps = { ...props, webViewLoginStatus: 'bad-value' };

      const result = isWebViewLogin(props, prevProps);

      expect(result).toEqual(false);
    });

    it(`should return false when current props are not ${NATIVE_LOG_IN}`, () => {
      const props = { webViewLoginStatus: 'bad-value', isWebView: true };
      const prevProps = { ...props, webViewLoginStatus: PENDING };

      const result = isWebViewLogin(props, prevProps);

      expect(result).toEqual(false);
    });

    it(`should return true when in a webview and was ${PENDING} and is now ${NATIVE_LOG_IN}`, () => {
      const props = { webViewLoginStatus: NATIVE_LOG_IN, isWebView: true };
      const prevProps = { ...props, webViewLoginStatus: PENDING };

      const result = isWebViewLogin(props, prevProps);

      expect(result).toEqual(true);
    });
  });

  describe('isWebViewLogout', () => {
    it('should return false when is not a webview', () => {
      const props = { webViewLoginStatus: NATIVE_LOG_OUT, isWebView: false };
      const prevProps = { ...props, webViewLoginStatus: PENDING };

      const result = isWebViewLogout(props, prevProps);

      expect(result).toEqual(false);
    });

    it(`should return false when previous props webViewLoginStatus was not ${PENDING}`, () => {
      const props = { webViewLoginStatus: NATIVE_LOG_OUT, isWebView: true };
      const prevProps = { ...props, webViewLoginStatus: 'bad-value' };

      const result = isWebViewLogout(props, prevProps);

      expect(result).toEqual(false);
    });

    it(`should return false when current props are not ${NATIVE_LOG_OUT}`, () => {
      const props = { webViewLoginStatus: 'bad-value', isWebView: true };
      const prevProps = { ...props, webViewLoginStatus: PENDING };

      const result = isWebViewLogout(props, prevProps);

      expect(result).toEqual(false);
    });

    it(`should return true when in a webview and was ${PENDING} and is now ${NATIVE_LOG_OUT}`, () => {
      const props = { webViewLoginStatus: NATIVE_LOG_OUT, isWebView: true };
      const prevProps = { ...props, webViewLoginStatus: PENDING };

      const result = isWebViewLogout(props, prevProps);

      expect(result).toEqual(true);
    });
  });

  describe('getBooleanQueryParam', () => {
    const paramKey = 'key';

    it('should return false when URL param key is missing', () => {
      history.location.search = '';

      expect(getBooleanQueryParam(paramKey)).toEqual(false);
    });

    it('should return false when URL param value is "false"', () => {
      history.location.search = `?${paramKey}=false`;

      expect(getBooleanQueryParam(paramKey)).toEqual(false);
    });

    it('should return true when URL param value is "true"', () => {
      history.location.search = `?${paramKey}=true`;

      expect(getBooleanQueryParam(paramKey)).toEqual(true);
    });
  });

  describe(`should check for the ${WEB_VIEW} query param and`, () => {
    it('return true when the value is true', () => {
      history.location.search = `?${WEB_VIEW}=true`;

      const result = hasWebViewParam();

      expect(result).toEqual(true);
    });

    it('return false when the value is false', () => {
      history.location.search = `?${WEB_VIEW}=false`;

      const result = hasWebViewParam();

      expect(result).toEqual(false);
    });

    it('return false when it does not exist', () => {
      history.location.search = '';

      const result = hasWebViewParam();

      expect(result).toEqual(false);
    });
  });

  describe(`should check for the ${CHANNEL} query param and`, () => {
    it('return the value when it exists', () => {
      const value = 'IOS';

      history.location.search = `?${CHANNEL}=${value}`;

      const result = getChannelParam();

      expect(result).toEqual(value);
    });

    it('return undefined when it does not exist', () => {
      history.location.search = '';

      const result = getChannelParam();

      expect(result).toEqual(undefined);
    });
  });

  describe(`should check for the ${CORPORATE_CHANNEL} query param and`, () => {
    it('return the value when it exists', () => {
      const value = 'IOS_CORP';

      history.location.search = `?${CORPORATE_CHANNEL}=${value}`;

      const result = getCorporateChannelParam();

      expect(result).toEqual(value);
    });

    it('return undefined when it does not exist', () => {
      history.location.search = '';

      const result = getCorporateChannelParam();

      expect(result).toEqual(undefined);
    });
  });

  describe(`should check for the ${API_KEY} query param and`, () => {
    it('return the value when it exists', () => {
      const value = 'apiKey';

      history.location.search = `?${API_KEY}=${value}`;

      const result = getApiKeyParam();

      expect(result).toEqual(value);
    });

    it('return undefined when it does not exist', () => {
      history.location.search = '';

      const result = getApiKeyParam();

      expect(result).toEqual(undefined);
    });
  });

  describe(`should check for the ${DEVICE_TYPE} query param and`, () => {
    it('return the value when it exists', () => {
      const value = 'IOS';

      history.location.search = `?${DEVICE_TYPE}=${value}`;

      const result = getDeviceTypeParam();

      expect(result).toEqual(value);
    });

    it('return undefined when it does not exist', () => {
      history.location.search = '';

      const result = getDeviceTypeParam();

      expect(result).toEqual(undefined);
    });
  });

  describe(`should check for the ${UPGRADE_TYPE} query param and`, () => {
    it('return the value when it exists', () => {
      const value = 'PLU';

      history.location.search = `?${UPGRADE_TYPE}=${value}`;

      const result = getUpgradeTypeParam();

      expect(result).toEqual(value);
    });

    it('return undefined when it does not exist', () => {
      history.location.search = '';

      const result = getUpgradeTypeParam();

      expect(result).toEqual(undefined);
    });
  });

  describe(`should check for the ${ADOBE_ID} query param and`, () => {
    it('return the value when it exists', () => {
      const value = 'mock adobe id';

      history.location.search = `?${ADOBE_ID}=${value}`;

      const result = getAdobeIdParam();

      expect(result).toEqual(value);
    });

    it('return undefined when it does not exist', () => {
      history.location.search = '';

      const result = getAdobeIdParam();

      expect(result).toEqual(undefined);
    });
  });

  describe(`should check for the ${EXPERIENCE_ID} query param and`, () => {
    it('return the value when it exists', () => {
      const value = 'mock experience id';

      history.location.search = `?${EXPERIENCE_ID}=${value}`;

      const result = getExperienceId();

      expect(result).toEqual(value);
    });

    it('return undefined when it does not exist', () => {
      history.location.search = '';

      const result = getExperienceId();

      expect(result).toEqual(undefined);
    });
  });

  describe(`should check for the ${APP_VERSION} query param and`, () => {
    it('return the value when it exists', () => {
      const value = 'mock experience id';

      history.location.search = `?${APP_VERSION}=${value}`;

      const result = getAppVersion();

      expect(result).toEqual(value);
    });

    it('return undefined when it does not exist', () => {
      history.location.search = '';

      const result = getAppVersion();

      expect(result).toEqual(undefined);
    });
  });

  describe(`should check for the ${SHARE_FLIGHT_STATUS} query param and`, () => {
    it('should return false when URL param shareFlightStatus is missing', () => {
      history.location.search = '';

      expect(getShareFlightStatusParam()).toEqual(false);
    });

    it('should return false when URL param shareFlightStatus is "false"', () => {
      history.location.search = `?${SHARE_FLIGHT_STATUS}=false`;

      expect(getShareFlightStatusParam()).toEqual(false);
    });

    it('should return true when URL param value is "true"', () => {
      history.location.search = `?${SHARE_FLIGHT_STATUS}=true`;

      expect(getShareFlightStatusParam()).toEqual(true);
    });
  });

  describe('should check if on the home page and', () => {
    it('return true if so', () => {
      history.location.pathname = '/';

      const result = isOnHomePage();

      expect(result).toEqual(true);
    });

    it('return false if not', () => {
      history.location.pathname = '/not-home-page';

      const result = isOnHomePage();

      expect(result).toEqual(false);
    });
  });

  describe('should check if blank page', () => {
    it('return false if flight status', () => {
      const result = isBlankPage(FLIGHT_STATUS);

      expect(result).toEqual(false);
    });

    it('return false if car booking', () => {
      const result = isBlankPage(CAR_BOOKING);

      expect(result).toEqual(false);
    });

    it('return true if blank', () => {
      const result = isBlankPage(BLANK);

      expect(result).toEqual(true);
    });

    it('return true if blank with query params', () => {
      const result = isBlankPage(`${BLANK}?webView=true`);

      expect(result).toEqual(true);
    });

    it('return false if invalid route', () => {
      const result = isBlankPage('invalid-route');

      expect(result).toEqual(false);
    });
  });

  describe('should check if landing page', () => {
    it('return true if flight status', () => {
      const result = isLandingPage(FLIGHT_STATUS);

      expect(result).toEqual(true);
    });

    it('return true if car booking', () => {
      const result = isLandingPage(CAR_BOOKING);

      expect(result).toEqual(true);
    });

    it('return true if lookup travel funds', () => {
      const result = isLandingPage(LOOKUP_TRAVEL_FUNDS);

      expect(result).toEqual(true);
    });

    it('return true if contact tracing', () => {
      const result = isLandingPage(CONTACT_TRACING);

      expect(result).toEqual(true);
    });

    it('return true if air booking', () => {
      const result = isLandingPage(AIR_BOOKING);

      expect(result).toEqual(true);
    });

    it('return true if offers', () => {
      const result = isLandingPage(OFFERS);

      expect(result).toEqual(true);
    });

    it('return true if air booking legacy route', () => {
      const result = isLandingPage(AIR_BOOKING_LEGACY);

      expect(result).toEqual(true);
    });

    it('return true if valid route and includes query params', () => {
      const result = isLandingPage(`${AIR_BOOKING}?webView=true`);

      expect(result).toEqual(true);
    });

    it('return false if blank', () => {
      const result = isLandingPage(BLANK);

      expect(result).toEqual(false);
    });

    it('return false if invalid route', () => {
      const result = isLandingPage('invalid-route');

      expect(result).toEqual(false);
    });
  });

  describe('should check if index page', () => {
    it('return true if accessing the index page for air booking and the path is a string', () => {
      const currentPath = '/air/booking/';
      const result = isIndexPage('/air/booking/', currentPath);

      expect(result).toEqual(true);
    });

    it('return true if accessing the index page for air booking and the path is an object', () => {
      const currentPath = '/air/booking/';
      const airBookingIndex = {
        canonicalPath: '/air/booking/',
        htmlPath: '/air/booking/index.html'
      };

      const result = isIndexPage(airBookingIndex, currentPath);

      expect(result).toEqual(true);
    });

    it('return false if accessing a non index page for air booking and the path is a string', () => {
      const currentPath = '/air/booking/passengers';
      const result = isIndexPage('/air/booking/', currentPath);

      expect(result).toEqual(false);
    });

    it('return true if accessing a non index page for air booking and the path is an object', () => {
      const currentPath = '/air/booking/passengers';
      const airBookingIndex = {
        canonicalPath: '/air/booking/',
        htmlPath: '/air/booking/index.html'
      };

      const result = isIndexPage(airBookingIndex, currentPath);

      expect(result).toEqual(false);
    });
  });

  describe('should send messages to the native apps', () => {
    afterEach(() => {
      jest.clearAllMocks();

      delete window.AndroidInterface;
      delete window.webkit;
    });

    describe('if the exitWebView method is called', () => {
      let replaceMock;

      beforeEach(() => {
        const androidInterfaceMock = { exit: jest.fn() };
        const iosInterfaceMock = { messageHandlers: { exit: { postMessage: jest.fn() } } };

        window.AndroidInterface = androidInterfaceMock;
        window.webkit = iosInterfaceMock;

        replaceMock = jest.fn();
      });

      it('should send the route if one is passed in', () => {
        const route = 'route';

        history.replace = replaceMock;

        exitWebView(route);

        expect(window.AndroidInterface.exit).toHaveBeenCalledWith(route);
        expect(window.webkit.messageHandlers.exit.postMessage).toHaveBeenCalledWith(route);
        expect(handleRouteChangeFn).not.toHaveBeenCalled();
      });

      it('should change route to blank if no route is passed in ', () => {
        const route = '';

        history.replace = replaceMock;

        exitWebView(route);

        expect(window.AndroidInterface.exit).toHaveBeenCalledWith(route);
        expect(window.webkit.messageHandlers.exit.postMessage).toHaveBeenCalledWith(route);
        expect(handleRouteChangeFn).toHaveBeenCalled();
      });
    });

    it('if the display login method is called', () => {
      const androidInterfaceMock = { displayLogin: jest.fn() };
      const iosInterfaceMock = { messageHandlers: { displayLogin: { postMessage: jest.fn() } } };

      window.AndroidInterface = androidInterfaceMock;
      window.webkit = iosInterfaceMock;

      const options = { loginType: LOGIN_TYPES.PURCHASE };

      const encodedMessage = encodeMessage({ ...options, continueAsGuest: false });

      showNativeAppLogin(options);

      expect(window.AndroidInterface.displayLogin).toHaveBeenCalledWith(encodedMessage);
      expect(window.webkit.messageHandlers.displayLogin.postMessage).toHaveBeenCalledWith(encodedMessage);
    });

    it('if the display apple pay is called', () => {
      const androidInterfaceMock = { displayApplePay: jest.fn() };
      const iosInterfaceMock = { messageHandlers: { displayApplePay: { postMessage: jest.fn() } } };

      window.AndroidInterface = androidInterfaceMock;
      window.webkit = iosInterfaceMock;

      const moneyTotal = { amount: '12345', currencyCode: 'USD' };

      const encodedMessage = encodeMessage(moneyTotal);

      showNativeApplePay(moneyTotal);

      expect(window.AndroidInterface.displayApplePay).toHaveBeenCalledWith(encodedMessage);
      expect(window.webkit.messageHandlers.displayApplePay.postMessage).toHaveBeenCalledWith(encodedMessage);
    });

    it('if the update flight searches method is called', () => {
      const androidInterfaceMock = { updateFlightStatusSearches: jest.fn() };
      const iosInterfaceMock = { messageHandlers: { updateFlightStatusSearches: { postMessage: jest.fn() } } };

      window.AndroidInterface = androidInterfaceMock;
      window.webkit = iosInterfaceMock;

      updateFlightStatusSearches([{ from: 'DAL', to: 'ATL', date: '2019-12-18', flightNumber: '1774' }]);

      expect(window.AndroidInterface.updateFlightStatusSearches).toHaveBeenCalled();
      expect(window.webkit.messageHandlers.updateFlightStatusSearches.postMessage).toHaveBeenCalled();
    });

    it('should send the encoded share flight status details message to the native app', () => {
      const androidInterfaceMock = { shareFlightStatusDetails: jest.fn() };
      const iosInterfaceMock = { messageHandlers: { shareFlightStatusDetails: { postMessage: jest.fn() } } };

      window.AndroidInterface = androidInterfaceMock;
      window.webkit = iosInterfaceMock;

      const shareDetails = {
        details: 'details'
      };
      const encodedSharedDetails = encodeMessage(shareDetails);

      shareFlightStatusDetails(shareDetails);

      expect(window.AndroidInterface.shareFlightStatusDetails).toHaveBeenCalledWith(encodedSharedDetails);
      expect(window.webkit.messageHandlers.shareFlightStatusDetails.postMessage).toHaveBeenCalledWith(encodedSharedDetails);
    });

    it('should send the encoded chase offers response message to the native app', () => {
      const androidInterfaceMock = { saveChaseOffers: jest.fn() };
      const iosInterfaceMock = { messageHandlers: { saveChaseOffers: { postMessage: jest.fn() } } };

      window.AndroidInterface = androidInterfaceMock;
      window.webkit = iosInterfaceMock;

      const chaseOffers = {
        offers: [{ acquisitionSourceCode: '1234' }, { acquisitionSourceCode: '4321' }],
        offerIdentifier: '3204890832666624'
      };

      const encodedChaseOffers = encodeMessage(chaseOffers);

      sendChaseOffers(chaseOffers);

      expect(window.AndroidInterface.saveChaseOffers).toHaveBeenCalledWith(encodedChaseOffers);
      expect(window.webkit.messageHandlers.saveChaseOffers.postMessage).toHaveBeenCalledWith(encodedChaseOffers);
    });

    it('if the set navigation controls method is called', () => {
      const androidInterfaceMock = { enableNavigationControls: jest.fn() };
      const iosInterfaceMock = { messageHandlers: { enableNavigationControls: { postMessage: jest.fn() } } };

      window.AndroidInterface = androidInterfaceMock;
      window.webkit = iosInterfaceMock;

      const isEnabled = false;

      enableNavigationControls(isEnabled);

      expect(window.AndroidInterface.enableNavigationControls).toHaveBeenCalledWith(_.toString(isEnabled));
      expect(window.webkit.messageHandlers.enableNavigationControls.postMessage).toHaveBeenCalledWith(_.toString(isEnabled));
    });

    it('if the display app review method is called', () => {
      const androidInterfaceMock = { displayAppReview: jest.fn() };
      const iosInterfaceMock = { messageHandlers: { displayAppReview: { postMessage: jest.fn() } } };

      window.AndroidInterface = androidInterfaceMock;
      window.webkit = iosInterfaceMock;

      displayAppReview();

      expect(window.AndroidInterface.displayAppReview).toHaveBeenCalled();
      expect(window.webkit.messageHandlers.displayAppReview.postMessage).toHaveBeenCalled();
    });

    it('if handleNativeLogout method is called', () => {
      const androidInterfaceMock = { logout: jest.fn() };
      const iosInterfaceMock = { messageHandlers: { logout: { postMessage: jest.fn() } } };

      window.AndroidInterface = androidInterfaceMock;
      window.webkit = iosInterfaceMock;

      handleNativeLogout();

      expect(window.AndroidInterface.logout).toHaveBeenCalled();
      expect(window.webkit.messageHandlers.logout.postMessage).toHaveBeenCalled();
    });

    it('if the chase promo clicked method is called', () => {
      const target = 'target';
      const linkType = 'link';
      const isChaseCombo = true;
      const referrer = 'referrer';

      const androidInterfaceMock = { handleChasePromoClicked: jest.fn() };
      const iosInterfaceMock = { messageHandlers: { handleChasePromoClicked: { postMessage: jest.fn() } } };

      window.AndroidInterface = androidInterfaceMock;
      window.webkit = iosInterfaceMock;

      const encodedMessage = encodeMessage({ target, linkType, isChaseCombo, referrer });

      chasePromoClicked(target, linkType, isChaseCombo, referrer);

      expect(window.AndroidInterface.handleChasePromoClicked).toHaveBeenCalledWith(encodedMessage);
      expect(window.webkit.messageHandlers.handleChasePromoClicked.postMessage).toHaveBeenCalledWith(encodedMessage);
    });
  });

  describe('should check web view interface and', () => {
    afterEach(() => {
      jest.clearAllMocks();

      delete window.AndroidInterface;
      delete window.webkit;
    });

    it('return true if both native app interfaces exist', () => {
      const androidInterfaceMock = { pageRendered: jest.fn() };
      const iosInterfaceMock = { messageHandlers: { pageRendered: { postMessage: jest.fn() } } };

      window.AndroidInterface = androidInterfaceMock;
      window.webkit = iosInterfaceMock;

      const result = hasWebViewInterface();

      expect(result).toEqual(true);
    });

    it('return true if Android interface exists', () => {
      const androidInterfaceMock = { pageRendered: jest.fn() };

      window.AndroidInterface = androidInterfaceMock;

      const result = hasWebViewInterface();

      expect(result).toEqual(true);
    });

    it('return true if iOS interface exists', () => {
      const iosInterfaceMock = { messageHandlers: { pageRendered: { postMessage: jest.fn() } } };

      window.webkit = iosInterfaceMock;

      const result = hasWebViewInterface();

      expect(result).toEqual(true);
    });

    it('return false if neither native app interfaces exist', () => {
      delete window.AndroidInterface;
      delete window.webkit;

      const result = hasWebViewInterface();

      expect(result).toEqual(false);
    });
  });

  describe('should remember', () => {
    let store2Mock;

    beforeEach(() => {
      store2Mock = jest.spyOn(store2, 'set').mockImplementation(() => jest.fn());
      jest.spyOn(LocalStorageCache, 'saveChaseSessionId');
      jest.spyOn(LocalStorageCache, 'saveSwaOffersIdentity');
      jest.spyOn(LocalStorageCache, 'deleteChasePrequalOffers');
    });

    it('channel if it is passed in', () => {
      const channel = 'channel';

      rememberChannel(channel);

      expect(store2Mock).toHaveBeenCalledWith(WEB_VIEW_CHANNEL, channel);
    });

    it('nothing if no channel is passed in', () => {
      const channel = undefined;

      rememberChannel(channel);

      expect(store2Mock).not.toHaveBeenCalled();
    });

    it('corporate channel if it is passed in', () => {
      const corporateChannel = 'corporateChannel';

      rememberCorporateChannel(corporateChannel);

      expect(store2Mock).toHaveBeenCalledWith(WEB_VIEW_CORPORATE_CHANNEL, corporateChannel);
    });

    it('nothing if no corporate channel is passed in', () => {
      const corporateChannel = undefined;

      rememberCorporateChannel(corporateChannel);

      expect(store2Mock).not.toHaveBeenCalled();
    });

    it('apiKey if it is passed in', () => {
      const apiKey = 'apiKey';

      rememberApiKey(apiKey);

      expect(store2Mock).toHaveBeenCalledWith(WEB_VIEW_API_KEY, apiKey);
    });

    it('nothing if no apiKey is passed in', () => {
      const apiKey = undefined;

      rememberApiKey(apiKey);

      expect(store2Mock).not.toHaveBeenCalled();
    });

    it('experienceId if it is passed in', () => {
      const experienceId = 'experienceId';

      rememberExperienceId(experienceId);

      expect(store2Mock).toHaveBeenCalledWith(WEB_VIEW_EXPERIENCE_ID, experienceId);
    });

    it('nothing if no apiKey is passed in', () => {
      const experienceId = undefined;

      rememberExperienceId(experienceId);

      expect(store2Mock).not.toHaveBeenCalled();
    });

    it('appVersion if it is passed in', () => {
      const appVersion = 'appVersion';

      rememberAppVersion(appVersion);

      expect(store2Mock).toHaveBeenCalledWith(WEB_VIEW_APP_VERSION, appVersion);
    });

    it('nothing if no apiKey is passed in', () => {
      const appVersion = undefined;

      rememberAppVersion(appVersion);

      expect(store2Mock).not.toHaveBeenCalled();
    });

    it('chase info if it is passed in', () => {
      const chaseSessionId = 'test';
      const chaseInfo = encodeMessage({ chaseSessionId });

      rememberChaseInfo(chaseInfo);

      expect(LocalStorageCache.saveChaseSessionId).toHaveBeenCalledWith(chaseSessionId);
      expect(LocalStorageCache.saveSwaOffersIdentity).toHaveBeenCalled();
      expect(LocalStorageCache.deleteChasePrequalOffers).toHaveBeenCalled();
    });

    it('nothing if no chase session id is passed in', () => {
      const chaseSessionId = undefined;
      const chaseInfo = encodeMessage({ chaseSessionId });

      rememberChaseInfo(chaseInfo);

      expect(LocalStorageCache.saveChaseSessionId).not.toHaveBeenCalled();
      expect(LocalStorageCache.saveSwaOffersIdentity).not.toHaveBeenCalled();
      expect(LocalStorageCache.deleteChasePrequalOffers).not.toHaveBeenCalled();
    });
  });

  describe('should decode message and', () => {
    it('return decoded message if valid encoded message', () => {
      const obj = { message: 'message' };
      const message = JSON.stringify(obj);
      const encodedMessage = Buffer.from(message).toString('base64');

      const result = decodeMessage(encodedMessage);

      expect(result).toEqual(obj);
    });

    it('return empty object if null message', () => {
      const message = JSON.stringify(null);
      const encodedMessage = Buffer.from(message).toString('base64');

      const result = decodeMessage(encodedMessage);

      expect(result).toEqual({});
    });

    it('return empty object if empty message', () => {
      const result = decodeMessage('');

      expect(result).toEqual({});
    });

    it('return empty object if invalid encoded json', () => {
      const result = decodeMessage('invalid-encoded-json');

      expect(result).toEqual({});
    });
  });

  describe('should encode message and', () => {
    it('return the same encoded message if valid encoded message is decoded', () => {
      const obj = { message: 'message' };
      const encodedMessage = encodeMessage(obj);

      const decodedMessage = Buffer.from(encodedMessage, 'base64').toString();
      const result = JSON.parse(decodedMessage);

      expect(result).toEqual(obj);
    });

    it('return null if the encoded message was null', () => {
      const obj = null;
      const encodedMessage = encodeMessage(obj);

      const decodedMessage = Buffer.from(encodedMessage, 'base64').toString();
      const result = JSON.parse(decodedMessage);

      expect(result).toEqual(obj);
    });

    it('return string if the encoded message was a valid string', () => {
      const obj = 'a string';
      const encodedMessage = encodeMessage(obj);

      const decodedMessage = Buffer.from(encodedMessage, 'base64').toString();
      const result = JSON.parse(decodedMessage);

      expect(result).toEqual(obj);
    });

    it('return empty object if the encoded message was am empty object', () => {
      const obj = {};
      const encodedMessage = encodeMessage(obj);

      const decodedMessage = Buffer.from(encodedMessage, 'base64').toString();
      const result = JSON.parse(decodedMessage);

      expect(result).toEqual(obj);
    });
  });

  describe('isOnWebViewLandingPage', () => {
    const landingPagePath = '/landing-page';

    let getCurrentRouteStateMock;
    let getPrevRouteStateMock;
    let isBrowserBackOrForwardMock;
    let persistentHistory;

    beforeEach(() => {
      getCurrentRouteStateMock = jest.spyOn(RouteStateHelper, 'getCurrentRouteState').mockReturnValue({
        pathname: landingPagePath
      });
      getPrevRouteStateMock = jest.spyOn(RouteStateHelper, 'getPrevRouteState').mockReturnValue({
        pathname: '/blank'
      });
      isBrowserBackOrForwardMock = jest.spyOn(RouteStateHelper, 'isBrowserBackOrForward').mockReturnValue(false);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('isFromBlankPage true', () => {
      describe('isOnLandingPage true', () => {
        describe('isBrowserBackOrForward false', () => {
          it('should return true', () => {
            expect(isOnWebViewLandingPage(persistentHistory, landingPagePath)).toEqual(true);
          });
        });

        describe('isBrowserBackOrForward true', () => {
          it('should return false', () => {
            isBrowserBackOrForwardMock.mockReturnValue(true);

            expect(isOnWebViewLandingPage(persistentHistory, landingPagePath)).toEqual(false);
          });
        });
      });

      describe('isOnLandingPage false', () => {
        it('should return false', () => {
          getCurrentRouteStateMock.mockReturnValue({ pathname: '/not-landing-page' });

          expect(isOnWebViewLandingPage(persistentHistory, landingPagePath)).toEqual(false);
        });
      });
    });

    describe('isFromBlankPage false', () => {
      it('should return false', () => {
        getPrevRouteStateMock.mockReturnValue({ pathname: '/not-blank-page' });

        expect(isOnWebViewLandingPage(persistentHistory, landingPagePath)).toEqual(false);
      });
    });
  });

  describe('shouldShowContinueAsGuest', () => {
    it(`should return false if login type is ${LOGIN_TYPES.POINTS}`, () => {
      expect(shouldShowContinueAsGuest(LOGIN_TYPES.POINTS)).toEqual(false);
    });

    it(`should return false if login type is ${LOGIN_TYPES.TRANSFER_TRAVEL_FUNDS}`, () => {
      expect(shouldShowContinueAsGuest(LOGIN_TYPES.TRANSFER_TRAVEL_FUNDS)).toEqual(false);
    });

    it(`should return true if login type is ${LOGIN_TYPES.NORMAL}`, () => {
      expect(shouldShowContinueAsGuest(LOGIN_TYPES.NORMAL)).toEqual(true);
    });

    it(`should return true if login type is ${LOGIN_TYPES.PURCHASE}`, () => {
      expect(shouldShowContinueAsGuest(LOGIN_TYPES.PURCHASE)).toEqual(true);
    });
  });

  describe('should get web view api values', () => {
    const webViewApiKeyValue = 'webViewApiKeyValue';
    const webViewChannelValue = 'webViewChannelValue';
    const webViewCorporateChannelValue = 'webViewCorporateChannelValue';

    let getMock;

    beforeEach(() => {
      getMock = jest.spyOn(store2, 'get');
    });

    describe('and return web view value in local storage if it exists', () => {
      it('when there is stored ios token', () => {
        const oauthToken = { scope: 'ios' };

        getMock.mockImplementation((arg) => {
          if (arg === OAUTH_LOGIN_STATUS) {
            return oauthToken;
          } else if (arg === WEB_VIEW_API_KEY) {
            return webViewApiKeyValue;
          } else if (arg === WEB_VIEW_CHANNEL) {
            return webViewChannelValue;
          } else if (arg === WEB_VIEW_CORPORATE_CHANNEL) {
            return webViewCorporateChannelValue;
          }
        });

        expect(getWebViewApiKey()).toEqual(webViewApiKeyValue);
        expect(getWebViewChannel()).toEqual(webViewChannelValue);
        expect(getWebViewCorporateChannel()).toEqual(webViewCorporateChannelValue);
      });

      it('when there is not stored ios token', () => {
        getMock.mockImplementation((arg) => {
          if (arg === OAUTH_LOGIN_STATUS) {
            return undefined;
          } else if (arg === WEB_VIEW_API_KEY) {
            return webViewApiKeyValue;
          } else if (arg === WEB_VIEW_CHANNEL) {
            return webViewChannelValue;
          } else if (arg === WEB_VIEW_CORPORATE_CHANNEL) {
            return webViewCorporateChannelValue;
          }
        });

        expect(getWebViewApiKey()).toEqual(webViewApiKeyValue);
        expect(getWebViewChannel()).toEqual(webViewChannelValue);
        expect(getWebViewCorporateChannel()).toEqual(webViewCorporateChannelValue);
      });
    });

    it('and return ios app config value when there is a stored ios token and no web view value in local storage', () => {
      const oauthToken = { scope: 'ios' };

      getMock.mockImplementation((arg) => {
        if (arg === OAUTH_LOGIN_STATUS) {
          return oauthToken;
        } else if (arg === WEB_VIEW_API_KEY) {
          return undefined;
        } else if (arg === WEB_VIEW_CHANNEL) {
          return undefined;
        } else if (arg === WEB_VIEW_CORPORATE_CHANNEL) {
          return undefined;
        }
      });

      expect(getWebViewApiKey()).toEqual(undefined);
      expect(getWebViewChannel()).toEqual(undefined);
      expect(getWebViewCorporateChannel()).toEqual(undefined);
    });
  });
});

import { sandbox } from 'sinon';
import proxyquire from 'proxyquire';
import * as WebViewHelper from 'src/shared/helpers/webViewHelper';
import * as ReLoginModalActions from 'src/login/actions/reLoginModalActions';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import * as Cookie from 'src/shared/swa-persistence/cookie';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import FlightStatusActionTypes from 'src/flightStatus/actions/flightStatusActionTypes';
import WebViewActionTypes from 'src/shared/actions/webViewActionTypes';
import { appId } from 'src/shared/constants/webViewConstants';

const {
  WEB_VIEW__HANDLE_OAUTH,
  WEB_VIEW__HANDLE_AUTH_EVENT,
  WEB_VIEW__HANDLE_ROUTE_CHANGE,
  WEB_VIEW__SEND_EXIT,
  WEB_VIEW__SEND_DISPLAY_LOGIN,
  WEB_VIEW__SEND_DISPLAY_APP_REVIEW,
  WEB_VIEW__SEND_SHARE_FLIGHT_STATUS_DETAILS,
  WEB_VIEW__SEND_CHASE_SESSION,
  WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS
} = WebViewActionTypes;
const { SHARED__ROUTE_CHANGED } = SharedActionTypes;
const { FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS } = FlightStatusActionTypes;

const sinon = sandbox.create();
const getMcvidStub = sinon.stub();
const sendErrorLogStub = sinon.stub();
const handleRouteChangeStubFn = sinon.stub();

const webViewMiddleware = proxyquire('src/shared/redux/middlewares/webViewMiddleware', {
  'src/shared/actions/webViewActions': WebViewActions,
  'src/shared/helpers/webViewHelper': WebViewHelper,
  'src/shared/swa-persistence/cookie': Cookie,
  'src/airBooking/helpers/amcvCookieHelper': { getMcvid: getMcvidStub },
  'src/shared/api/loggingApi': { sendErrorLog: sendErrorLogStub },
  '@swa-ui/hybrid': { handleRouteChange: handleRouteChangeStubFn }
}).default;

const store = { dispatch: () => {}, getState: () => {} };
const next = () => {};

describe('WebViewMiddleware', () => {
  let getStateStub;
  let dispatchStub;
  let hasWebViewParamStub;
  let hasWebViewInterfaceStub;
  let webViewActionsStub;
  let webViewChannelStub;
  let webViewCorporateChannelStub;
  let webViewApiKeyStub;
  let webViewExperienceIdStub;
  let webViewAppVersionStub;
  let webViewDeviceStub;
  let webViewAdobeIdStub;
  let webViewShareFlightStatusParamStub;
  let webViewGetUpgradeTypeParamStub;
  let isOnHomePageStub;
  let rememberChannelStub;
  let rememberCorporateChannelStub;
  let rememberApiKeyStub;
  let rememberExperienceIdStub;
  let rememberAppVersionStub;
  let setDeviceTypeStub;
  let setWebViewChannelStub;
  let setShareFlightStatusStub;
  let setUpgradeTypeStub;
  let setAdobeIdStub;
  let setCookieStub;
  let getCookieStub;

  beforeEach(() => {
    getStateStub = sinon.stub(store, 'getState');
    dispatchStub = sinon.stub(store, 'dispatch');
    hasWebViewParamStub = sinon.stub(WebViewHelper, 'hasWebViewParam');
    hasWebViewInterfaceStub = sinon.stub(WebViewHelper, 'hasWebViewInterface');
    webViewChannelStub = sinon.stub(WebViewHelper, 'getChannelParam');
    webViewCorporateChannelStub = sinon.stub(WebViewHelper, 'getCorporateChannelParam');
    webViewApiKeyStub = sinon.stub(WebViewHelper, 'getApiKeyParam');
    webViewExperienceIdStub = sinon.stub(WebViewHelper, 'getExperienceId');
    webViewAppVersionStub = sinon.stub(WebViewHelper, 'getAppVersion');
    webViewDeviceStub = sinon.stub(WebViewHelper, 'getDeviceTypeParam');
    webViewAdobeIdStub = sinon.stub(WebViewHelper, 'getAdobeIdParam');
    webViewShareFlightStatusParamStub = sinon.stub(WebViewHelper, 'getShareFlightStatusParam');
    webViewGetUpgradeTypeParamStub = sinon.stub(WebViewHelper, 'getUpgradeTypeParam');
    isOnHomePageStub = sinon.stub(WebViewHelper, 'isOnHomePage');
    rememberChannelStub = sinon.stub(WebViewHelper, 'rememberChannel');
    rememberCorporateChannelStub = sinon.stub(WebViewHelper, 'rememberCorporateChannel');
    rememberApiKeyStub = sinon.stub(WebViewHelper, 'rememberApiKey');
    rememberExperienceIdStub = sinon.stub(WebViewHelper, 'rememberExperienceId');
    rememberAppVersionStub = sinon.stub(WebViewHelper, 'rememberAppVersion');
    setDeviceTypeStub = sinon.stub(WebViewActions, 'setDeviceType');
    setWebViewChannelStub = sinon.stub(WebViewActions, 'setWebViewChannel');
    setShareFlightStatusStub = sinon.stub(WebViewActions, 'setShareFlightStatus');
    setUpgradeTypeStub = sinon.stub(WebViewActions, 'setUpgradeType');
    setAdobeIdStub = sinon.stub(WebViewActions, 'setAdobeId');
    setCookieStub = sinon.stub(Cookie, 'setValue');
    getCookieStub = sinon.stub(Cookie, 'getValue');
  });

  afterEach(() => {
    sinon.restore();
  });

  context(`should handle the ${WEB_VIEW__SEND_EXIT} action`, () => {
    let exitWebViewStub;

    beforeEach(() => {
      exitWebViewStub = sinon.stub(WebViewHelper, 'exitWebView');
    });

    it('when not in web view state', () => {
      getStateStub.returns({ app: { webView: { isWebView: false } } });

      const action = { type: WEB_VIEW__SEND_EXIT };

      webViewMiddleware(store)(next)(action);

      expect(exitWebViewStub).to.not.have.been.called;
    });

    it('when in web view state', () => {
      getStateStub.returns({ app: { webView: { isWebView: true } } });

      const route = 'route';
      const action = { type: WEB_VIEW__SEND_EXIT, route };

      webViewMiddleware(store)(next)(action);

      expect(exitWebViewStub).to.have.been.calledWith(route);
    });
  });

  context(`should handle the ${WEB_VIEW__SEND_DISPLAY_LOGIN} action`, () => {
    let showNativeAppLoginStub;

    beforeEach(() => {
      showNativeAppLoginStub = sinon.stub(WebViewHelper, 'showNativeAppLogin');
    });

    it('when not in web view state', () => {
      getStateStub.returns({ app: { webView: { isWebView: false } } });

      const action = { type: WEB_VIEW__SEND_DISPLAY_LOGIN };

      webViewMiddleware(store)(next)(action);

      expect(showNativeAppLoginStub).to.not.have.been.called;
    });

    it('when in web view state', () => {
      getStateStub.returns({ app: { webView: { isWebView: true } } });

      const options = { options: 'options' };

      const action = { type: WEB_VIEW__SEND_DISPLAY_LOGIN, options };

      webViewMiddleware(store)(next)(action);

      expect(showNativeAppLoginStub).to.have.been.calledWith(options);
    });
  });

  context(`should handle the ${WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS} action`, () => {
    let enableNavigationControlsStub;

    beforeEach(() => {
      enableNavigationControlsStub = sinon.stub(WebViewHelper, 'enableNavigationControls');
    });

    it('when not in web view state', () => {
      getStateStub.returns({ app: { webView: { isWebView: false } } });

      const action = { type: WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS };

      webViewMiddleware(store)(next)(action);

      expect(enableNavigationControlsStub).to.not.have.been.called;
    });

    it('when in web view state', () => {
      getStateStub.returns({ app: { webView: { isWebView: true } } });

      const action = { type: WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS };

      webViewMiddleware(store)(next)(action);

      expect(enableNavigationControlsStub).to.have.been.called;
    });
  });

  context(`should handle the ${WEB_VIEW__SEND_DISPLAY_APP_REVIEW} action`, () => {
    let displayAppReviewStub;

    beforeEach(() => {
      displayAppReviewStub = sinon.stub(WebViewHelper, 'displayAppReview');
    });

    it('when not in web view state', () => {
      getStateStub.returns({ app: { webView: { isWebView: false } } });

      const action = { type: WEB_VIEW__SEND_DISPLAY_APP_REVIEW };

      webViewMiddleware(store)(next)(action);

      expect(displayAppReviewStub).to.not.have.been.called;
    });

    it('when in web view state', () => {
      getStateStub.returns({ app: { webView: { isWebView: true } } });

      const action = { type: WEB_VIEW__SEND_DISPLAY_APP_REVIEW };

      webViewMiddleware(store)(next)(action);

      expect(displayAppReviewStub).to.have.been.called;
    });
  });

  context(`should handle the ${WEB_VIEW__HANDLE_OAUTH} action and`, () => {
    let addOAuthStub;
    let removeOAuthStub;

    beforeEach(() => {
      addOAuthStub = sinon.stub(WebViewActions, 'addOAuth');
      removeOAuthStub = sinon.stub(WebViewActions, 'removeOAuth');
    });

    it('should dispatch addOAuth when action isAdd is true', () => {
      const credentials = 'encodedCredentials';
      const action = { type: WEB_VIEW__HANDLE_OAUTH, isAdd: true, value: credentials };

      const result = 'addOAuth';

      addOAuthStub.returns(result);

      webViewMiddleware(store)(next)(action);

      expect(addOAuthStub).to.have.been.calledWith(credentials);
      expect(dispatchStub).to.have.been.calledWith(result);
      expect(removeOAuthStub).to.not.have.been.called;
    });

    it('should dispatch removeOAuth when action isAdd is false', () => {
      const action = { type: WEB_VIEW__HANDLE_OAUTH, isAdd: false };

      const result = 'removeOAuth';

      removeOAuthStub.returns(result);

      webViewMiddleware(store)(next)(action);

      expect(removeOAuthStub).to.have.been.called;
      expect(dispatchStub).to.have.been.calledWith(result);
      expect(addOAuthStub).to.not.have.been.called;
    });
  });

  context(`should handle the ${WEB_VIEW__HANDLE_AUTH_EVENT} action and`, () => {
    let authEventStub;
    let decodeMessageStub;
    let clearSpinnerAndModalOptionsStub;
    let voidApplePayTransactionStub;

    beforeEach(() => {
      authEventStub = sinon.stub(WebViewActions, 'authEvent');
      decodeMessageStub = sinon.stub(WebViewHelper, 'decodeMessage');
      clearSpinnerAndModalOptionsStub = sinon.stub(ReLoginModalActions, 'clearSpinnerAndModalOptions');
      voidApplePayTransactionStub = sinon.stub(WebViewActions, 'voidApplePayTransaction');
    });

    it('should dispatch authEvent action', () => {
      const action = { type: WEB_VIEW__HANDLE_AUTH_EVENT };
      const result = 'authEvent';

      decodeMessageStub.returns({ type: 'USER_CANCEL' });
      authEventStub.returns(result);
      webViewMiddleware(store)(next)(action);

      expect(clearSpinnerAndModalOptionsStub).to.have.been.called;
      expect(voidApplePayTransactionStub).to.have.been.called;
    });
  });

  context(`should handle the ${WEB_VIEW__HANDLE_ROUTE_CHANGE} action`, () => {
    let isLandingPageStub;
    let webViewActionsStub;

    beforeEach(() => {
      isLandingPageStub = sinon.stub(WebViewHelper, 'isLandingPage');
      webViewActionsStub = sinon.stub(WebViewActions, 'refreshAuth');
    });

    it('and store query params', () => {
      const value = 'value';

      webViewChannelStub.returns(value);
      webViewCorporateChannelStub.returns(value);
      webViewApiKeyStub.returns(value);
      webViewExperienceIdStub.returns(value);
      webViewAppVersionStub.returns(value);
      webViewDeviceStub.returns(value);
      webViewShareFlightStatusParamStub.returns(value);
      webViewGetUpgradeTypeParamStub.returns(value);
      getStateStub.returns({ app: { webView: { isWebView: true } } });

      const history = 'history';
      const route = 'route';
      const state = 'state';

      const action = { type: WEB_VIEW__HANDLE_ROUTE_CHANGE, history, route, state };

      webViewMiddleware(store)(next)(action);
      expect(rememberChannelStub).to.be.calledWith(value);
      expect(rememberCorporateChannelStub).to.be.calledWith(value);
      expect(rememberApiKeyStub).to.be.calledWith(value);
      expect(rememberExperienceIdStub).to.be.calledWith(value);
      expect(rememberAppVersionStub).to.be.calledWith(value);
      expect(setDeviceTypeStub).to.be.calledWith(value);
      expect(setShareFlightStatusStub).to.be.calledWith(value);
      expect(setUpgradeTypeStub).to.be.calledWith(value);
    });

    it('and replace history and not refresh auth if not in web view state', () => {
      getStateStub.returns({ app: { webView: { isWebView: false } } });

      const history = 'history';
      const route = 'route';
      const state = 'state';

      const action = { type: WEB_VIEW__HANDLE_ROUTE_CHANGE, history, route, state };

      webViewMiddleware(store)(next)(action);

      expect(handleRouteChangeStubFn).to.have.been.calledWith(history, appId, route, state);
      expect(isLandingPageStub).to.not.have.been.called;
      expect(webViewActionsStub).to.not.have.been.called;
      expect(dispatchStub).to.not.have.been.called;
    });

    it('and replace history and not refresh auth if not landing page route', () => {
      getStateStub.returns({ app: { webView: { isWebView: true } } });
      isLandingPageStub.returns(false);

      const history = 'history';
      const route = 'route';
      const state = 'state';

      const action = { type: WEB_VIEW__HANDLE_ROUTE_CHANGE, history, route, state };

      webViewMiddleware(store)(next)(action);

      expect(handleRouteChangeStubFn).to.have.been.calledWith(history, appId, route, state);
      expect(isLandingPageStub).to.have.been.called;
      expect(webViewActionsStub).to.not.have.been.called;
    });

    it('and replace history and refresh auth if in webview state and landing page route', () => {
      getStateStub.returns({ app: { webView: { isWebView: true } } });
      isLandingPageStub.returns(true);

      const webViewAction = { type: 'action' };

      webViewActionsStub.returns(webViewAction);

      const history = 'history';
      const route = 'route';
      const state = 'state';

      const action = { type: WEB_VIEW__HANDLE_ROUTE_CHANGE, history, route, state };

      webViewMiddleware(store)(next)(action);

      expect(handleRouteChangeStubFn).to.have.been.calledWith(history, appId, route, state);
      expect(isLandingPageStub).to.have.been.called;
      expect(webViewActionsStub).to.have.been.called;
      expect(dispatchStub).to.have.been.calledWith(webViewAction);
    });
  });

  context(`should handle the ${FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS} action`, () => {
    let updateFlightStatusSearchesStub;

    beforeEach(() => {
      updateFlightStatusSearchesStub = sinon.stub(WebViewHelper, 'updateFlightStatusSearches');
    });

    it('and not send any message to native if not in web view state', () => {
      getStateStub.returns({ app: { webView: { isWebView: false } } });

      const state = 'state';
      const searches = [
        {
          from: 'DAL',
          to: 'ATL',
          date: '2019-12-18',
          flightNumber: '1774'
        },
        {
          from: 'MSY',
          to: 'ATL',
          date: '2019-12-15',
          flightNumber: ''
        }
      ];

      const action = { type: FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS, searches, state };

      webViewMiddleware(store)(next)(action);

      expect(updateFlightStatusSearchesStub).to.have.not.been.called;
      expect(dispatchStub).to.not.have.been.called;
    });

    it('and to send the recent searches message to native if in web view state', () => {
      getStateStub.returns({ app: { webView: { isWebView: true } } });

      const state = 'state';
      const searches = [
        {
          from: 'DAL',
          to: 'ATL',
          date: '2019-12-18',
          flightNumber: '1774'
        },
        {
          from: 'MSY',
          to: 'ATL',
          date: '2019-12-15',
          flightNumber: ''
        }
      ];

      const action = { type: FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS, searches, state };

      webViewMiddleware(store)(next)(action);

      expect(updateFlightStatusSearchesStub).to.have.been.calledWith({ recentSearches: searches });
      expect(dispatchStub).to.not.have.been.called;
    });
  });

  context(`should handle the ${SHARED__ROUTE_CHANGED} action and`, () => {
    context('should handle web view state', () => {
      let isWebViewStub;
      let refreshAuthStub;

      beforeEach(() => {
        isWebViewStub = sinon.stub(WebViewActions, 'isWebView');
        refreshAuthStub = sinon.stub(WebViewActions, 'refreshAuth');

        isOnHomePageStub.returns(false);
      });

      it('when already in web view state', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(hasWebViewParamStub).to.not.have.been.called;
        expect(hasWebViewInterfaceStub).to.not.have.been.called;
        expect(isWebViewStub).to.not.have.been.called;
        expect(refreshAuthStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
        expect(webViewChannelStub).to.have.been.called;
        expect(webViewCorporateChannelStub).to.have.been.called;
        expect(webViewDeviceStub).to.have.been.called;
      });

      it('when not already in web view state and does not have web view param', () => {
        getStateStub.returns({ app: { webView: { isWebView: false } } });
        hasWebViewParamStub.returns(false);
        hasWebViewInterfaceStub.returns(false);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(hasWebViewParamStub).to.have.been.called;
        expect(hasWebViewInterfaceStub).to.have.been.called;
        expect(isWebViewStub).to.not.have.been.called;
        expect(refreshAuthStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
        expect(webViewChannelStub).to.not.have.been.called;
        expect(webViewCorporateChannelStub).to.not.have.been.called;
        expect(webViewDeviceStub).to.not.have.been.called;
      });

      it('when not already in web view state and has web view param', () => {
        const webViewAction = { type: 'action' };
        const authAction = { type: 'action' };

        isWebViewStub.returns(webViewAction);
        refreshAuthStub.returns(authAction);
        getStateStub.returns({ app: { webView: { isWebView: false } } });
        hasWebViewParamStub.returns(true);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(hasWebViewParamStub).to.have.been.called;
        expect(hasWebViewInterfaceStub).to.not.have.been.called;
        expect(isWebViewStub).to.have.been.called;
        expect(refreshAuthStub).to.have.been.called;
        expect(dispatchStub).to.have.been.calledWith(webViewAction);
        expect(webViewChannelStub).to.not.have.been.called;
        expect(webViewCorporateChannelStub).to.not.have.been.called;
        expect(webViewDeviceStub).to.not.have.been.called;
      });

      it('when not already in web view state and has web view interface', () => {
        const webViewAction = { type: 'action' };
        const authAction = { type: 'action' };

        isWebViewStub.returns(webViewAction);
        refreshAuthStub.returns(authAction);
        getStateStub.returns({ app: { webView: { isWebView: false } } });
        hasWebViewParamStub.returns(false);
        hasWebViewInterfaceStub.returns(true);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(hasWebViewParamStub).to.have.been.called;
        expect(hasWebViewInterfaceStub).to.have.been.called;
        expect(isWebViewStub).to.have.been.called;
        expect(refreshAuthStub).to.have.been.called;
        expect(dispatchStub).to.have.been.calledWith(webViewAction);
        expect(webViewChannelStub).to.not.have.been.called;
        expect(webViewCorporateChannelStub).to.not.have.been.called;
        expect(webViewDeviceStub).to.not.have.been.called;
      });
    });

    context('should handle web view channel', () => {
      beforeEach(() => {
        isOnHomePageStub.returns(false);
        hasWebViewParamStub.returns(false);
        hasWebViewInterfaceStub.returns(false);
      });

      it('when in web view state and has channel param', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });

        const value = 'channel';

        webViewChannelStub.returns(value);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setDeviceTypeStub).to.not.have.been.called;
        expect(dispatchStub).to.have.been.called;
        expect(rememberChannelStub).to.be.calledWith(value);
      });

      it('when in web view state and does not have channel param', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });

        const value = undefined;

        webViewChannelStub.returns(value);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setDeviceTypeStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
        expect(rememberChannelStub).to.be.calledWith(value);
      });

      it('when not in web view state', () => {
        getStateStub.returns({ app: { webView: { isWebView: false } } });

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setDeviceTypeStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
        expect(rememberChannelStub).to.not.have.been.called;
      });
    });

    context('should handle web view corporate channel', () => {
      beforeEach(() => {
        isOnHomePageStub.returns(false);
        hasWebViewParamStub.returns(false);
        hasWebViewInterfaceStub.returns(false);
      });

      it('when in web view state and has corporate channel param', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });

        const value = 'corporateChannel';

        webViewCorporateChannelStub.returns(value);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setDeviceTypeStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
        expect(rememberCorporateChannelStub).to.be.calledWith(value);
      });

      it('when in web view state and does not have corporate channel param', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });

        const value = undefined;

        webViewCorporateChannelStub.returns(value);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setDeviceTypeStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
        expect(rememberCorporateChannelStub).to.be.calledWith(value);
      });

      it('when not in web view state', () => {
        getStateStub.returns({ app: { webView: { isWebView: false } } });

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setDeviceTypeStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
        expect(rememberCorporateChannelStub).to.not.have.been.called;
      });
    });

    context('should handle web view api key', () => {
      beforeEach(() => {
        isOnHomePageStub.returns(false);
        hasWebViewParamStub.returns(false);
        hasWebViewInterfaceStub.returns(false);
      });

      it('when in web view state and has apiKey param', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });

        const value = 'apiKey';

        webViewApiKeyStub.returns(value);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setDeviceTypeStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
        expect(rememberApiKeyStub).to.be.calledWith(value);
      });

      it('when in web view state and does not have apiKey param', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });

        const value = undefined;

        setDeviceTypeStub.returns(value);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setDeviceTypeStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
        expect(rememberApiKeyStub).to.be.calledWith(value);
      });

      it('when not in web view state', () => {
        getStateStub.returns({ app: { webView: { isWebView: false } } });

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setDeviceTypeStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
        expect(rememberApiKeyStub).to.not.have.been.called;
      });
    });

    context('should handle web view experience id', () => {
      beforeEach(() => {
        isOnHomePageStub.returns(false);
        hasWebViewParamStub.returns(false);
        hasWebViewInterfaceStub.returns(false);
      });

      it('when in web view state and has experienceId param', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });

        const value = 'experienceId';

        webViewExperienceIdStub.returns(value);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(rememberExperienceIdStub).to.be.calledWith(value);
      });

      it('when in web view state and does not have experienceId param', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });

        const value = undefined;
        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(rememberExperienceIdStub).to.be.calledWith(value);
      });

      it('when not in web view state', () => {
        getStateStub.returns({ app: { webView: { isWebView: false } } });

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(rememberExperienceIdStub).to.not.have.been.called;
      });
    });

    context('should handle web view app version', () => {
      beforeEach(() => {
        isOnHomePageStub.returns(false);
        hasWebViewParamStub.returns(false);
        hasWebViewInterfaceStub.returns(false);
      });

      it('when in web view state and has appVersion param', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });

        const value = 'appVersion';

        webViewAppVersionStub.returns(value);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(rememberAppVersionStub).to.be.calledWith(value);
      });

      it('when in web view state and does not have appVersion param', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });

        const value = undefined;
        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(rememberAppVersionStub).to.be.calledWith(value);
      });

      it('when not in web view state', () => {
        getStateStub.returns({ app: { webView: { isWebView: false } } });

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(rememberAppVersionStub).to.not.have.been.called;
      });
    });

    context('should handle web view device type', () => {
      beforeEach(() => {
        isOnHomePageStub.returns(false);
        hasWebViewParamStub.returns(false);
        hasWebViewInterfaceStub.returns(false);
      });

      it('when in web view state and has device type param', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });

        const value = 'device';

        webViewDeviceStub.returns(value);

        const webViewAction = { type: 'action' };

        setDeviceTypeStub.returns(webViewAction);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setDeviceTypeStub).to.have.been.called;
        expect(dispatchStub).to.have.been.calledWith(webViewAction);
      });

      it('when in web view state and does not have device type param', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });

        setDeviceTypeStub.returns(undefined);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setDeviceTypeStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
      });

      it('when not in web view state', () => {
        getStateStub.returns({ app: { webView: { isWebView: false } } });

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setDeviceTypeStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
      });
    });

    context('should handle web view channel', () => {
      context('when in web view state', () => {
        const channel = 'channel';

        it('has web view channel param', () => {
          getStateStub.returns({ app: { webView: { isWebView: true, webViewChannel: channel } } });

          webViewChannelStub.returns(channel);

          const webViewAction = { type: 'action' };

          setWebViewChannelStub.returns(webViewAction);

          const action = { type: SHARED__ROUTE_CHANGED };

          webViewMiddleware(store)(next)(action);

          expect(rememberChannelStub).to.have.been.calledWith(channel);
          expect(dispatchStub).to.have.been.calledWith(webViewAction);
          expect(setWebViewChannelStub).to.have.been.calledWith(channel);
        });

        it('does not have web view channel param', () => {
          getStateStub.returns({ app: { webView: { isWebView: true } } });

          webViewChannelStub.returns(undefined);

          const action = { type: SHARED__ROUTE_CHANGED };

          webViewMiddleware(store)(next)(action);

          expect(rememberChannelStub).to.have.been.calledWith(undefined);
          expect(dispatchStub).to.not.have.been.called;
          expect(setWebViewChannelStub).to.not.have.been.called;
        });
      });

      it('when not in web view state', () => {
        getStateStub.returns({ app: { webView: { isWebView: false } } });

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(rememberChannelStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
        expect(setWebViewChannelStub).to.not.have.been.called;
      });
    });

    context('should handle web view adobe id', () => {
      beforeEach(() => {
        isOnHomePageStub.returns(false);
        hasWebViewParamStub.returns(false);
        hasWebViewInterfaceStub.returns(false);
      });

      it('when in web view state and has adobe id param but no adobe id cookie', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });

        const value = 'mock adobe id';

        webViewAdobeIdStub.returns(value);

        const webViewAction = { type: 'action' };

        setAdobeIdStub.returns(webViewAction);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setAdobeIdStub).to.have.been.called;
        expect(dispatchStub).to.have.been.calledWith(webViewAction);
        expect(setCookieStub).to.have.been.calledWith('adobe_mc', value);
      });

      it('when in web view state and has adobe id in state but no adobe id cookie', () => {
        const value = 'mock adobe id';

        webViewAdobeIdStub.returns(value);

        getStateStub.returns({ app: { webView: { adobeId: value, isWebView: true } } });

        const webViewAction = { type: 'action' };

        setAdobeIdStub.returns(webViewAction);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setCookieStub).to.have.been.calledWith('adobe_mc', value);
      });

      it('when in web view state and has adobe id param and adobe id cookie', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });

        const value = 'mock adobe id';

        webViewAdobeIdStub.returns(value);
        getCookieStub.returns('mock adobe id cookie');

        const webViewAction = { type: 'action' };

        setAdobeIdStub.returns(webViewAction);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setAdobeIdStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
      });

      it('when in web view state and does not have adobe id param', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });

        setAdobeIdStub.returns(undefined);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setAdobeIdStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
      });

      it('when not in web view state', () => {
        getStateStub.returns({ app: { webView: { isWebView: false } } });

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setAdobeIdStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
      });
    });

    context('should handle share flight status', () => {
      beforeEach(() => {
        isOnHomePageStub.returns(false);
        hasWebViewParamStub.returns(false);
        hasWebViewInterfaceStub.returns(false);
      });

      it('when in web view state and has share flight status true', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });

        const value = 'true';

        webViewShareFlightStatusParamStub.returns(value);

        const webViewAction = { type: 'action' };

        setShareFlightStatusStub.returns(webViewAction);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setShareFlightStatusStub).to.have.been.called;
        expect(dispatchStub).to.have.been.calledWith(webViewAction);
      });

      it('when in web view state and does not have share flight status param', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });

        webViewShareFlightStatusParamStub.returns(false);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setShareFlightStatusStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
      });

      it('when not in web view state', () => {
        getStateStub.returns({ app: { webView: { isWebView: false } } });

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setShareFlightStatusStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
      });
    });

    context('should handle upgrade type value', () => {
      const value = 'PLU';
      const webViewAction = { type: 'action' };
      const action = { type: SHARED__ROUTE_CHANGED };

      beforeEach(() => {
        isOnHomePageStub.returns(false);
        hasWebViewParamStub.returns(false);
        hasWebViewInterfaceStub.returns(false);
      });

      it('when in web view state and has share upgrade type value', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });
        webViewGetUpgradeTypeParamStub.returns(value);
        setUpgradeTypeStub.returns(webViewAction);
        webViewMiddleware(store)(next)(action);

        expect(setUpgradeTypeStub).to.have.been.called;
        expect(dispatchStub).to.have.been.calledWith(webViewAction);
      });

      it('when in web view state and does not have share upgrade type param', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });
        webViewShareFlightStatusParamStub.returns(false);
        webViewMiddleware(store)(next)(action);

        expect(setUpgradeTypeStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
      });

      it('when not in web view state', () => {
        getStateStub.returns({ app: { webView: { isWebView: false } } });

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(setUpgradeTypeStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
      });
    });

    context('should check web view page', () => {
      beforeEach(() => {
        webViewActionsStub = sinon.stub(WebViewActions, 'exitWebView');

        hasWebViewParamStub.returns(false);
        hasWebViewInterfaceStub.returns(false);
      });

      it('when not in web view state', () => {
        getStateStub.returns({ app: { webView: { isWebView: false } } });

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(isOnHomePageStub).to.not.have.been.called;
        expect(webViewActionsStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
        expect(webViewChannelStub).to.not.have.been.called;
        expect(webViewDeviceStub).to.not.have.been.called;
      });

      it('when in web view state and not on the home page', () => {
        getStateStub.returns({ app: { webView: { isWebView: true } } });
        isOnHomePageStub.returns(false);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(isOnHomePageStub).to.have.been.called;
        expect(webViewActionsStub).to.not.have.been.called;
        expect(dispatchStub).to.not.have.been.called;
        expect(webViewChannelStub).to.have.been.called;
        expect(webViewDeviceStub).to.have.been.called;
      });

      it('when in web view state and on the home page', () => {
        const webViewAction = { type: 'action' };

        webViewActionsStub.returns(webViewAction);
        getStateStub.returns({ app: { webView: { isWebView: true } } });
        isOnHomePageStub.returns(true);

        const action = { type: SHARED__ROUTE_CHANGED };

        webViewMiddleware(store)(next)(action);

        expect(isOnHomePageStub).to.have.been.called;
        expect(webViewActionsStub).to.have.been.called;
        expect(dispatchStub).to.have.been.calledWith(webViewAction);
        expect(webViewChannelStub).to.have.been.called;
        expect(webViewDeviceStub).to.have.been.called;
      });
    });

    context('should handle show_login_banner cookie', () => {
      it('should create the cookie when the user in web view state, not logged in, and doesn\'t have an existing cookie', () => {
        const action = { type: SHARED__ROUTE_CHANGED };
        const value = 'true';

        getStateStub.returns({
          app: {
            account: {
              isLoggedIn: false
            },
            webView: {
              isWebView: true
            }
          }
        });

        webViewMiddleware(store)(next)(action);

        expect(setCookieStub).to.have.been.calledWith('show_login_banner', value);
      });

      it('should not create/update the cookie if it already exists', () => {
        const action = { type: SHARED__ROUTE_CHANGED };

        getStateStub.returns({
          app: {
            account: {
              isLoggedIn: false
            },
            webView: {
              isWebView: true
            }
          }
        });
        getCookieStub.returns('mock show_login_banner cookie');

        webViewMiddleware(store)(next)(action);

        expect(setCookieStub).to.not.have.been.called;
      });

      it('should not create/update the cookie if the user is logged in', () => {
        const action = { type: SHARED__ROUTE_CHANGED };

        getStateStub.returns({
          app: {
            account: {
              isLoggedIn: true
            },
            webView: {
              isWebView: true
            }
          }
        });
        getCookieStub.returns('mock show_login_banner cookie');

        webViewMiddleware(store)(next)(action);

        expect(setCookieStub).to.not.have.been.called;
      });
    });
  });

  context(`should handle the ${WEB_VIEW__SEND_SHARE_FLIGHT_STATUS_DETAILS} action`, () => {
    let shareFlightStatusDetailsStub;
    let shareDetails;

    beforeEach(() => {
      shareFlightStatusDetailsStub = sinon.stub(WebViewHelper, 'shareFlightStatusDetails');
      shareDetails = { details: 'details' };
    });

    it('and to send the recent searches message to native when action WEB_VIEW__SEND_SHARE_FLIGHT_STATUS_DETAILS is triggered', () => {
      getStateStub.returns({ app: { webView: { isWebView: true } } });

      const state = 'state';
      const action = { type: WEB_VIEW__SEND_SHARE_FLIGHT_STATUS_DETAILS, shareDetails, state };

      webViewMiddleware(store)(next)(action);

      expect(shareFlightStatusDetailsStub).to.have.been.calledWith({ shareDetails });
      expect(dispatchStub).to.not.have.been.called;
    });
  });

  context(`should handle the ${WEB_VIEW__SEND_CHASE_SESSION} action`, () => {
    let rememberChaseInfoStub;
    let value;

    beforeEach(() => {
      rememberChaseInfoStub = sinon.stub(WebViewHelper, 'rememberChaseInfo');
      value = 'session';
    });

    it('and to send the recent searches message to native when action WEB_VIEW__SEND_SHARE_FLIGHT_STATUS_DETAILS is triggered', () => {
      getStateStub.returns({ app: { webView: { isWebView: true } } });

      const state = 'state';
      const action = { type: WEB_VIEW__SEND_CHASE_SESSION, value, state };

      webViewMiddleware(store)(next)(action);

      expect(rememberChaseInfoStub).to.have.been.calledWith(value);
      expect(dispatchStub).to.not.have.been.called;
    });
  });
});

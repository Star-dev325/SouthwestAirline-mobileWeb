import dayjs from 'dayjs';
import _ from 'lodash';
import proxyquire from 'proxyquire';
import { sandbox } from 'sinon';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import ReLoginActionTypes from 'src/login/actions/reLoginActionTypes';
import * as AccountActions from 'src/shared/actions/accountActions';
import * as AlternativeFormsOfPaymentActions from 'src/shared/actions/alternativeFormsOfPaymentActions';
import WebViewActionTypes from 'src/shared/actions/webViewActionTypes';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import * as LocalStorageCache from 'src/shared/cache/localStorageCache';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { DAYJS_TIMESTAMP_FORMAT } from 'src/shared/constants/dayjsConstants';
import { LOGIN_STATES } from 'src/shared/constants/webViewConstants';
import * as AccountInfoHelper from 'src/shared/helpers/accountInfoHelper';
import * as UiHelper from 'src/shared/helpers/uiHelper';
import * as WebViewHelper from 'src/shared/helpers/webViewHelper';
import {
  getNativeApplePayCard
} from 'test/builders/model/paymentInfoBuilder';
import createMockStore from 'test/unit/helpers/createMockStore';
import waitFor from 'test/unit/helpers/waitFor';

const { NATIVE_LOG_IN, NATIVE_LOG_OUT } = LOGIN_STATES;
const sinon = sandbox.create();
const mockStore = createMockStore();

describe('WebViewActions', () => {
  const corporateInfoAction = { type: 'updateCorporateType' };
  let store;
  let handleNativeLogoutStub;
  let handleReLoginStub;

  beforeEach(() => {
    store = mockStore({ app: {} });
    handleNativeLogoutStub = sinon.stub(WebViewHelper, 'handleNativeLogout');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create action to set is web view', () => {
    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__SET_IS_WEB_VIEW
    };

    expect(WebViewActions.isWebView()).to.deep.equal(expectedAction);
  });

  it('should create action to handle native logout for webView', () => {
    store = mockStore({
      app: {
        webView: {
          isWebView: true
        }
      }
    });

    WebViewActions.handleNativeLogout()(store.dispatch, store.getState);

    expect(handleNativeLogoutStub).to.have.been.called;
  });

  it('should not dispatch action to handle native logout if not in webView', () => {
    WebViewActions.handleNativeLogout()(store.dispatch, store.getState);

    expect(handleNativeLogoutStub).to.not.have.been.called;
  });

  it('should create action to exit web view with passed in parameter', () => {
    const route = 'route';
    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__SEND_EXIT,
      route
    };

    expect(WebViewActions.exitWebView(route)).to.deep.equal(expectedAction);
  });

  it('should create action to exit web view with default parameter if not passed in', () => {
    const route = '';
    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__SEND_EXIT,
      route
    };

    expect(WebViewActions.exitWebView()).to.deep.equal(expectedAction);
  });

  it('should create action to set device type', () => {
    const value = 'deviceType';
    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__SET_DEVICE_TYPE,
      value
    };

    expect(WebViewActions.setDeviceType(value)).to.deep.equal(expectedAction);
  });

  it('should create action to set web view channel', () => {
    const value = 'channel';
    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__SET_WEB_VIEW_CHANNEL,
      value
    };

    expect(WebViewActions.setWebViewChannel(value)).to.deep.equal(expectedAction);
  });

  it('should create action to set upgrade type', () => {
    const value = 'PLU';
    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__SET_UPGRADE_TYPE,
      value
    };

    expect(WebViewActions.setUpgradeType(value)).to.deep.equal(expectedAction);
  });

  it('should create action to set adobe id', () => {
    const value = 'mock abode id';
    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__SET_ADOBE_ID,
      value
    };

    expect(WebViewActions.setAdobeId(value)).to.deep.equal(expectedAction);
  });

  it('should create action to set share flight status', () => {
    const value = 'true';
    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__SET_SHARE_FLIGHT_STATUS,
      value
    };

    expect(WebViewActions.setShareFlightStatus(value)).to.deep.equal(expectedAction);
  });

  it('should create action to handle paypal auth', () => {
    const token = 'token';
    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__HANDLE_PAYPAL_AUTH,
      token
    };

    expect(WebViewActions.setPaypalAuthorized(token)).to.deep.equal(expectedAction);
  });

  it('should create action to handle native apple pay', () => {
    const request = 'request';

    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__HANDLE_APPLE_PAY,
      request
    };

    expect(WebViewActions.handleNativeApplePay(request)).to.deep.equal(expectedAction);
  });

  it('should create action to handle chase session', () => {
    const value = 'session';
    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__SEND_CHASE_SESSION,
      value
    };

    expect(WebViewActions.handleChaseSession(value)).to.deep.equal(expectedAction);
  });

  it('should create action to handle continuing from a deep link', () => {
    const value = 'true';
    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__HANDLE_DEEP_LINK_CONTINUE,
      value
    };

    expect(WebViewActions.handleDeepLinkContinue(value)).to.deep.equal(expectedAction);
  });

  it('should create action to handle OAuth', () => {
    const isAdd = false;
    const value = 'oauth';

    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__HANDLE_OAUTH,
      isAdd,
      value
    };

    expect(WebViewActions.handleOAuth(isAdd, value)).to.deep.equal(expectedAction);
  });

  it('should create action to handle auth event', () => {
    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__HANDLE_AUTH_EVENT,
      value: 'USER_CANCEL'
    };

    expect(WebViewActions.handleAuthEvent('USER_CANCEL')).to.deep.equal(expectedAction);
  });

  it('should create action to change route', () => {
    const history = 'history';
    const route = 'route';
    const state = 'state';

    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__HANDLE_ROUTE_CHANGE,
      history,
      route,
      state
    };

    expect(WebViewActions.handleRouteChange(history, route, state)).to.deep.equal(expectedAction);
  });

  it('should create action to show native app login with empty options', () => {
    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__SEND_DISPLAY_LOGIN,
      options: {}
    };

    expect(WebViewActions.showNativeAppLogin()).to.deep.equal(expectedAction);
  });

  it('should create action to show native app login with provided options', () => {
    const options = {
      loginType: 'normal',
      continueAsGuest: false
    };

    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__SEND_DISPLAY_LOGIN,
      options
    };

    expect(WebViewActions.showNativeAppLogin(options)).to.deep.equal(expectedAction);
  });

  it('should create action to set navigation controls', () => {
    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__SEND_ENABLE_NAVIGATION_CONTROLS,
      isEnabled: false
    };

    expect(WebViewActions.enableNavigationControls(false)).to.deep.equal(expectedAction);
  });

  it('should create action to display app review', () => {
    const expectedAction = {
      type: WebViewActionTypes.WEB_VIEW__SEND_DISPLAY_APP_REVIEW
    };

    expect(WebViewActions.displayAppReview()).to.deep.equal(expectedAction);
  });

  describe('should handle addOAuth and', () => {
    let decodeMessageStub;
    let getOAuthStub;
    let getValueStub;
    let rememberOauthStub;
    let getAccountInfoStub;
    let getAccountInfoActionStub;
    let cleanUpCorporateInfoStub;
    let updateCorporateInfoStub;
    let saveUserAccountInfoStub;
    let webViewActionsProxy;
    let forceDomUpdatesAndThenExecuteStub;

    const decodedAuth = {
      access_token: 'access_token',
      id_token: 'id_token',
      token_type: 'token_type'
    };
    const decodedValue = { access_token: 'access_token', id_token: 'id_token', token_type: 'token_type' };
    const existingAuth = { access_token: 'existing_access_token', id_token: 'id_token', token_type: 'token_type' };
    const existingAccountInfo = { customerInfo: { accountNumber: 'old-account-number' } };
    const newAccountInfo = { customerInfo: { accountNumber: 'new-account-number' } };
    const saveAction = { type: 'save' };
    const reLoginCallbackFunctionsAction = {
      reLoginCallbackFunctions: {},
      reLoginLocation: '',
      type: ReLoginActionTypes.SET_RE_LOGIN_CALLBACK_FUNCTIONS
    };
    const updateAccountAction = { type: WebViewActionTypes.WEB_VIEW__UPDATE_ACCOUNT, isFetching: true };
    const updateAccountSuccessAction = {
      type: WebViewActionTypes.WEB_VIEW__UPDATE_ACCOUNT_SUCCESS,
      isFetching: false,
      response: NATIVE_LOG_IN
    };
    const encodedAuth = '';

    beforeEach(() => {
      store = mockStore({
        app: {
          toggles: { LOGIN_V4: true },
          wcmContent: {
            applicationProperties: { CORPORATE_INFO_TIMEOUT_MIN: '30' }
          }
        }
      });
      decodeMessageStub = sinon.stub(WebViewHelper, 'decodeMessage');
      getValueStub = sinon.stub().returns('id_token');
      getOAuthStub = sinon.stub(AccountInfoHelper, 'getOauthLoginSession');
      rememberOauthStub = sinon.stub(AccountInfoHelper, 'rememberOauthLoginSession');
      getAccountInfoStub = sinon.stub(AccountInfoHelper, 'getAccountInfo');
      getAccountInfoActionStub = sinon.stub(AccountActions, 'getAccountInfo');
      updateCorporateInfoStub = sinon.stub(AccountActions, 'updateCorporateInfo').returns(corporateInfoAction);
      saveUserAccountInfoStub = sinon.stub(CarBookingActions, 'saveUserAccountInfo');
      handleReLoginStub = sinon.stub(WebViewActions, 'handleReLogin');
      forceDomUpdatesAndThenExecuteStub = sinon.stub(UiHelper, 'forceDomUpdatesAndThenExecute');
      cleanUpCorporateInfoStub = sinon.stub(AccountActions, 'cleanUpCorporateInfo').returns({ type: 'cleanUpType' });

      decodeMessageStub.returns(decodedAuth);
      getOAuthStub.returns(existingAuth);
      getAccountInfoStub.returns(existingAccountInfo);
      getAccountInfoActionStub.returns(() => Promise.resolve(newAccountInfo));
      saveUserAccountInfoStub.returns(saveAction);
      forceDomUpdatesAndThenExecuteStub.callsArg(0);

      webViewActionsProxy = proxyquire('src/shared/actions/webViewActions', {
        'src/shared/helpers/accountInfoHelper': {
          getOauthLoginSession: getOAuthStub,
          getAccountInfo: getAccountInfoStub,
          rememberOauthLoginSession: rememberOauthStub
        },
        'src/shared/actions/accountActions': {
          getAccountInfo: getAccountInfoActionStub,
          updateCorporateInfo: updateCorporateInfoStub
        },
        'src/shared/swa-persistence/cookie': {
          getValue: getValueStub
        },
        'src/shared/helpers/uiHelper': {
          forceDomUpdatesAndThenExecute: forceDomUpdatesAndThenExecuteStub
        },
        'src/shared/helpers/loginSessionHelper': {
          decodeJwt: sinon.stub().returns(decodedValue)
        },
        'src/carBooking/actions/carBookingActions': {
          saveUserAccountInfo: saveUserAccountInfoStub
        }
      });
    });

    it('should dispatch correct actions', (done) => {
      webViewActionsProxy.addOAuth(encodedAuth, store.getState)(store.dispatch);

      waitFor.untilAssertPass(() => {
        expect(getOAuthStub).to.have.been.called;
        expect(updateCorporateInfoStub).to.have.been.calledWith(null);
        expect(forceDomUpdatesAndThenExecuteStub).to.have.been.called;
        expect(rememberOauthStub).to.have.been.calledWith(decodedAuth);
        expect(getAccountInfoActionStub).to.have.been.called;
        expect(saveUserAccountInfoStub).to.have.been.calledWith(newAccountInfo);

        expect(store.getActions()).to.deep.equal([
          updateAccountAction,
          corporateInfoAction,
          saveAction,
          updateAccountSuccessAction,
          reLoginCallbackFunctionsAction
        ]);
      }, done);
    });

    it('should not dispatch actions without id_token', (done) => {
      webViewActionsProxy = proxyquire('src/shared/actions/webViewActions', {
        'src/shared/helpers/accountInfoHelper': {
          getOauthLoginSession: getOAuthStub,
          getAccountInfo: getAccountInfoStub,
          rememberOauthLoginSession: rememberOauthStub
        },
        'src/shared/actions/accountActions': {
          getAccountInfo: getAccountInfoActionStub,
          updateCorporateInfo: updateCorporateInfoStub
        },
        'src/shared/swa-persistence/cookie': {
          getValue: sinon.stub().returns('')
        },
        'src/shared/helpers/uiHelper': {
          forceDomUpdatesAndThenExecute: forceDomUpdatesAndThenExecuteStub
        },
        'src/shared/helpers/loginSessionHelper': {
          decodeJwt: sinon.stub().returns(decodedValue)
        },
        'src/carBooking/actions/carBookingActions': {
          saveUserAccountInfo: saveUserAccountInfoStub
        }
      });

      webViewActionsProxy.addOAuth(encodedAuth, store.getState)(store.dispatch);

      waitFor.untilAssertPass(() => {
        expect(getOAuthStub).to.not.have.been.called;
        expect(updateCorporateInfoStub).to.not.have.been.calledWith(null);
        expect(forceDomUpdatesAndThenExecuteStub).to.not.have.been.called;
        expect(rememberOauthStub).to.not.have.been.calledWith(decodedAuth);
        expect(getAccountInfoActionStub).to.not.have.been.called;
        expect(saveUserAccountInfoStub).to.not.have.been.calledWith(newAccountInfo);
      }, done);
    });

    it('should not dispatch actions if it does not contain corporate info', (done) => {
      webViewActionsProxy.addOAuth(encodedAuth, store.getState)(store.dispatch);

      waitFor.untilAssertPass(() => {
        expect(updateCorporateInfoStub).to.have.been.calledWith(null);
        expect(store.getActions()).to.deep.equal([
          updateAccountAction,
          corporateInfoAction,
          saveAction,
          updateAccountSuccessAction,
          reLoginCallbackFunctionsAction
        ]);
      }, done);
    });

    it('should dispatch actions if OAuth contains corporate info', (done) => {
      const mockCompany = { companyId: '99587574', companyName: 'Dunder Mifflin Paper Company' };
      const updateCorporateInfoAction = { type: 'updateCorporateInfo' };
      const decodedAuth = {
        access_token: 'new_access_token',
        id_token: 'id_token',
        token_type: 'token_type',
        'corporate.customerUserInformation.activeCompanyIdAssociations': [mockCompany],
        'corporate.companyUserInformation.companyId': mockCompany.companyId,
        'corporate.companyUserInformation.name': mockCompany.name
      };

      updateCorporateInfoStub.returns({ type: 'updateCorporateInfo' });
      webViewActionsProxy = proxyquire('src/shared/actions/webViewActions', {
        'src/shared/helpers/accountInfoHelper': {
          getOauthLoginSession: getOAuthStub,
          getAccountInfo: getAccountInfoStub,
          rememberOauthLoginSession: rememberOauthStub
        },
        'src/shared/actions/accountActions': {
          getAccountInfo: getAccountInfoActionStub,
          updateCorporateInfo: updateCorporateInfoStub
        },
        'src/shared/swa-persistence/cookie': {
          getValue: getValueStub
        },
        'src/shared/helpers/uiHelper': {
          forceDomUpdatesAndThenExecute: forceDomUpdatesAndThenExecuteStub
        },
        'src/shared/helpers/loginSessionHelper': {
          decodeJwt: sinon.stub().returns(decodedAuth)
        },
        'src/carBooking/actions/carBookingActions': {
          saveUserAccountInfo: saveUserAccountInfoStub
        }
      });

      webViewActionsProxy.addOAuth(encodedAuth, store.getState)(store.dispatch);

      waitFor.untilAssertPass(() => {
        expect(getOAuthStub).to.have.been.called;
        expect(updateCorporateInfoStub).to.have.been.called;
        expect(forceDomUpdatesAndThenExecuteStub).to.have.been.called;
        expect(rememberOauthStub).to.have.been.calledWith(decodedAuth);
        expect(getAccountInfoActionStub).to.have.been.called;
        expect(saveUserAccountInfoStub).to.have.been.calledWith(newAccountInfo);

        expect(store.getActions()).to.deep.equal([
          updateAccountAction,
          updateCorporateInfoAction,
          saveAction,
          updateAccountSuccessAction,
          reLoginCallbackFunctionsAction
        ]);
      }, done);
    });

    it('should dispatch actions if save account actions throw exception', (done) => {
      const updateAccountAction = { type: WebViewActionTypes.WEB_VIEW__UPDATE_ACCOUNT, isFetching: true };
      const updateAccountFailedAction = {
        type: WebViewActionTypes.WEB_VIEW__UPDATE_ACCOUNT_FAILED,
        isFetching: false
      };

      getAccountInfoActionStub.returns(() => Promise.reject(new Error()));

      webViewActionsProxy.addOAuth(encodedAuth, store.getState)(store.dispatch);

      waitFor.untilAssertPass(() => {
        expect(updateCorporateInfoStub).to.have.been.calledWith(null);
        expect(forceDomUpdatesAndThenExecuteStub).to.have.been.called;
        expect(rememberOauthStub).to.have.been.calledWith(decodedAuth);
        expect(getAccountInfoActionStub).to.have.been.called;
        expect(saveUserAccountInfoStub).to.not.have.been.called;
        expect(handleReLoginStub).to.not.have.been.called;

        expect(store.getActions()).to.deep.equal([updateAccountAction, corporateInfoAction, updateAccountFailedAction]);
      }, done);
    });

    it('should fetch account info', (done) => {
      const mockState = { app: { reLoginModal: { reLoginCallbackFunctions: { postLoginCallbackFn: _.noop } } } };
      const decodedAuth = { id_token: 'id_token', access_token: 'access_token' };
      const existingAuth = { id_token: 'id_token', access_token: 'access_token' };
      const existingAccountInfo = { customerInfo: { accountNumber: 'old-account-number' } };
      const newAccountInfo = { customerInfo: { accountNumber: 'new-account-number' } };
      const saveAction = { type: 'save' };
      const updateAccountAction = { type: WebViewActionTypes.WEB_VIEW__UPDATE_ACCOUNT, isFetching: true };
      const updateAccountSuccessAction = {
        type: WebViewActionTypes.WEB_VIEW__UPDATE_ACCOUNT_SUCCESS,
        isFetching: false,
        response: NATIVE_LOG_IN
      };
      const retryFunctionsAction = { retryFunctions: [], type: 'RETRY_FUNCTIONS' };
      const updateAccountFailedAction = {
        type: WebViewActionTypes.WEB_VIEW__UPDATE_ACCOUNT_FAILED,
        isFetching: false
      };
      const startAsyncAction = { spinnerMessage: undefined, type: 'SHARED__ASYNC_ACTION_START' };
      const endAsyncAction = { type: 'SHARED__ASYNC_ACTION_FINISH' };
      const expectedActions = [
        updateAccountAction,
        corporateInfoAction,
        saveAction,
        updateAccountSuccessAction,
        reLoginCallbackFunctionsAction,
        startAsyncAction,
        updateAccountFailedAction,
        retryFunctionsAction,
        endAsyncAction
      ];

      decodeMessageStub.returns(decodedAuth);
      getOAuthStub.returns(existingAuth);
      getAccountInfoStub.returns(existingAccountInfo);
      getAccountInfoActionStub.returns(() => Promise.resolve(newAccountInfo));
      saveUserAccountInfoStub.returns(saveAction);

      const webViewActionsProxy = proxyquire('src/shared/actions/webViewActions', {
        store: {
          getState: sinon.stub().returns(mockState),
          dispatch: sinon.stub()
        },
        'src/shared/helpers/webViewHelper': {
          decodeMessage: decodeMessageStub
        },
        'src/shared/helpers/loginSessionHelper': {
          shouldUseGatewayCookies: sinon.stub().returns(true),
          decodeJwt: sinon.stub().returns(decodedAuth)
        },
        'src/shared/swa-persistence/cookie': {
          getValue: sinon.stub().returns('id_token')
        },
        'src/shared/helpers/accountInfoHelper': {
          getOauthLoginSession: getOAuthStub,
          getAccountInfo: getAccountInfoStub,
          rememberOauthLoginSession: rememberOauthStub,
          rememberLoginFlow: sinon.stub().returns(false)
        },
        'src/shared/actions/accountActions': {
          getAccountInfo: getAccountInfoActionStub,
          updateCorporateInfo: updateCorporateInfoStub,
          cleanUpCorporateInfo: cleanUpCorporateInfoStub
        },
        'src/carBooking/actions/carBookingActions': {
          saveUserAccountInfo: saveUserAccountInfoStub
        },
        'src/shared/helpers/uiHelper': {
          forceDomUpdatesAndThenExecute: forceDomUpdatesAndThenExecuteStub
        }
      });

      store = mockStore({
        app: {
          reLoginModal: { reLoginCallbackFunctions: { postLoginCallbackFn: _.noop }, retryFunctions: [_.noop, _.noop] }
        }
      });
      forceDomUpdatesAndThenExecuteStub.callsArg(0);
      webViewActionsProxy.addOAuth('', store.getState)(store.dispatch);

      waitFor.untilAssertPass(() => {
        expect(decodeMessageStub).to.not.have.been.called;
        expect(updateCorporateInfoStub).to.have.been.calledWith(null);
        expect(forceDomUpdatesAndThenExecuteStub).to.have.been.called;
        expect(rememberOauthStub).to.have.been.calledWith(decodedAuth);
        expect(getAccountInfoActionStub).to.have.been.called;
        expect(saveUserAccountInfoStub).to.have.been.calledWith(newAccountInfo);
        expect(store.getActions()).to.deep.equal(expectedActions);
      }, done);
    });
  });

  describe('should handle refreshAuth and', () => {
    let getOAuthStub;
    let getAccountInfoStub;
    let getAccountInfoActionStub;
    let saveUserAccountInfoStub;
    let updateAccountInfoStub;

    beforeEach(() => {
      getOAuthStub = sinon.stub(AccountInfoHelper, 'getOauthLoginSession');
      getAccountInfoStub = sinon.stub(AccountInfoHelper, 'getAccountInfo');
      getAccountInfoActionStub = sinon.stub(AccountActions, 'getAccountInfo');
      saveUserAccountInfoStub = sinon.stub(CarBookingActions, 'saveUserAccountInfo');
      updateAccountInfoStub = sinon.stub(AccountActions, 'updateAccountInfo');
    });

    it('should fetch account info if has OAuth token and no account info', (done) => {
      const auth = { access_token: 'access_token', id_token: 'id_token', token_type: 'token_type' };
      const accountInfo = undefined;

      const basicAccountInfo = 'basicAccountInfo';

      const saveAction = { type: 'save' };

      getOAuthStub.returns(auth);
      getAccountInfoStub.returns(accountInfo);
      getAccountInfoActionStub.returns(() => Promise.resolve(basicAccountInfo));
      saveUserAccountInfoStub.returns(saveAction);

      WebViewActions.refreshAuth()(store.dispatch);

      waitFor.untilAssertPass(() => {
        expect(getOAuthStub).to.have.been.called;
        expect(getAccountInfoStub).to.have.been.called;
        expect(getAccountInfoActionStub).to.have.been.called;
        expect(saveUserAccountInfoStub).to.have.been.calledWith(basicAccountInfo);
        expect(updateAccountInfoStub).to.not.have.been.called;
        expect(store.getActions()).to.deep.equal([saveAction]);
      }, done);
    });

    it('should fetch account info if account info is expired', (done) => {
      const auth = { access_token: 'access_token', id_token: 'id_token', token_type: 'token_type' };
      const accountInfo = {
        accountInfo: 'accountInfo',
        expirationDate: dayjs().subtract(5, 'minutes').format(DAYJS_TIMESTAMP_FORMAT)
      };
      const basicAccountInfo = 'basicAccountInfo';
      const saveAction = { type: 'save' };

      getOAuthStub.returns(auth);
      getAccountInfoStub.returns(accountInfo);
      getAccountInfoActionStub.returns(() => Promise.resolve(basicAccountInfo));
      saveUserAccountInfoStub.returns(saveAction);

      WebViewActions.refreshAuth()(store.dispatch);

      waitFor.untilAssertPass(() => {
        expect(getOAuthStub).to.have.been.called;
        expect(getAccountInfoStub).to.have.been.called;
        expect(getAccountInfoActionStub).to.have.been.called;
        expect(saveUserAccountInfoStub).to.have.been.calledWith(basicAccountInfo);
        expect(updateAccountInfoStub).to.not.have.been.called;
        expect(store.getActions()).to.deep.equal([saveAction]);
      }, done);
    });

    it('should not fetch account info if has OAuth token and has account info', (done) => {
      const auth = { access_token: 'access_token', id_token: 'id_token', token_type: 'token_type' };
      const accountInfo = { accountInfo: 'accountInfo' };

      const updateAction = { type: 'update' };

      getOAuthStub.returns(auth);
      getAccountInfoStub.returns(accountInfo);
      updateAccountInfoStub.returns(updateAction);

      WebViewActions.refreshAuth()(store.dispatch);

      waitFor.untilAssertPass(() => {
        expect(getOAuthStub).to.have.been.called;
        expect(getAccountInfoStub).to.have.been.called;
        expect(getAccountInfoActionStub).to.not.have.been.called;
        expect(saveUserAccountInfoStub).to.not.have.been.called;
        expect(updateAccountInfoStub).to.have.been.calledWith(accountInfo);
        expect(store.getActions()).to.deep.equal([updateAction]);
      }, done);
    });

    it('should not dispatch actions if has no OAuth token', (done) => {
      const auth = undefined;
      const accountInfo = undefined;

      getOAuthStub.returns(auth);
      getAccountInfoStub.returns(accountInfo);

      WebViewActions.refreshAuth()(store.dispatch);

      waitFor.untilAssertPass(() => {
        expect(getOAuthStub).to.have.been.called;
        expect(getAccountInfoStub).to.have.been.called;
        expect(getAccountInfoActionStub).to.not.have.been.called;
        expect(saveUserAccountInfoStub).to.not.have.been.called;
        expect(updateAccountInfoStub).to.not.have.been.called;
        expect(store.getActions()).to.deep.equal([]);
      }, done);
    });
  });

  describe('should handle removeOAuth and', () => {
    let getOAuthStub;
    let forceDomUpdatesAndThenExecuteStub;
    let resetAirBookingPurchaseDataStub;
    let cleanUpAccountInfoStub;
    let cleanUpAssociatedInfoStub;

    beforeEach(() => {
      getOAuthStub = sinon.stub(AccountInfoHelper, 'getOauthLoginSession');
      forceDomUpdatesAndThenExecuteStub = sinon.stub(UiHelper, 'forceDomUpdatesAndThenExecute');
      resetAirBookingPurchaseDataStub = sinon.stub(AirBookingActions, 'resetAirBookingPurchaseData');
      cleanUpAccountInfoStub = sinon.stub(AccountActions, 'cleanUpAccountInfo');
      cleanUpAssociatedInfoStub = sinon.stub(AccountActions, 'cleanUpAssociatedInfo');
    });

    it('should not dispatch actions if no existing access token', () => {
      getOAuthStub.returns(undefined);

      WebViewActions.removeOAuth()(store.dispatch, store.getState);

      expect(getOAuthStub).to.have.been.called;
      expect(forceDomUpdatesAndThenExecuteStub).to.not.have.been.called;
      expect(resetAirBookingPurchaseDataStub).to.not.have.been.called;
      expect(cleanUpAccountInfoStub).to.not.have.been.called;
      expect(cleanUpAssociatedInfoStub).to.not.have.been.called;
      expect(store.getActions()).to.deep.equal([]);
    });

    it('should dispatch actions if has existing id token', () => {
      getOAuthStub.returns({ id_token: 'id_token' });
      forceDomUpdatesAndThenExecuteStub.callsArg(0);

      const resetAction = { type: 'resetAction' };
      const cleanUpAccountInfoAction = { type: 'cleanUpAccountInfoAction' };
      const cleanUpAssociatedInfoAction = { type: 'cleanUpAssociatedInfoAction' };
      const updateAccountAction = { type: WebViewActionTypes.WEB_VIEW__UPDATE_ACCOUNT, isFetching: true };
      const updateAccountSuccessAction = {
        type: WebViewActionTypes.WEB_VIEW__UPDATE_ACCOUNT_SUCCESS,
        isFetching: false,
        response: NATIVE_LOG_OUT
      };

      resetAirBookingPurchaseDataStub.returns(resetAction);
      cleanUpAccountInfoStub.returns(cleanUpAccountInfoAction);
      cleanUpAssociatedInfoStub.returns(cleanUpAssociatedInfoAction);

      WebViewActions.removeOAuth()(store.dispatch, store.getState);

      expect(getOAuthStub).to.have.been.called;
      expect(forceDomUpdatesAndThenExecuteStub).to.have.been.called;
      expect(resetAirBookingPurchaseDataStub).to.have.been.called;
      expect(cleanUpAccountInfoStub).to.have.been.called;
      expect(cleanUpAssociatedInfoStub).to.have.been.called;

      expect(store.getActions()).to.deep.equal([
        updateAccountAction,
        resetAction,
        cleanUpAccountInfoAction,
        cleanUpAssociatedInfoAction,
        { type: 'SHARED__FORCE_HIDE_SPINNER', pendingCallsCount: undefined },
        { type: 'SET_RE_LOGIN_CALLBACK_FUNCTIONS', reLoginCallbackFunctions: {}, reLoginLocation: '' },
        { type: 'RETRY_FUNCTIONS', retryFunctions: [] },
        updateAccountSuccessAction
      ]);
    });

    describe('when in API GW cookies flow', () => {
      let clearSpinnerAndModalOptionsStub;
      let removeLoginFlowStub;
      let continueAsGuestFnStub;
      let webViewActionsProxy;
      const expectedActions = [
        { type: WebViewActionTypes.WEB_VIEW__UPDATE_ACCOUNT, isFetching: true },
        { type: 'AIR_BOOKING__RESET_PASSENGER' },
        { type: 'AIR_BOOKING__RESET_PAYMENT_INFO' },
        { type: 'CREDIT_CARD__RESET_SAVED_CREDIT_CARDS' },
        { type: 'AIR_BOOKING__RESET_CONTACT_METHOD' },
        { type: 'AIR_BOOKING__SET_ELIGIBLE_EXPRESS_CHECKOUT', isEligibleForExpressCheckout: true },
        { type: 'RESET_FORM_DATA' },
        { type: 'AIR_BOOKING__CLEAR_SELECTED_FREQUENT_TRAVELERS' },
        { type: 'AIR_BOOKING__CLEAR_ACCOUNT_INFO' },
        { type: 'ACCOUNT__SAVE_ACCOUNT_INFO', accountInfo: null },
        { type: 'ACCOUNT__SET_IS_LOGGED_IN', isLoggedIn: false },
        { type: 'ACCOUNT__UPDATE_ACCOUNT_INFO_FETCHED', isFetched: false },
        { type: 'CREDIT_CARD__RESET_SAVED_CREDIT_CARDS' },
        { type: 'CHASE__RESET_CHASE_TEMPORARY_CARD' },
        { type: 'CHASE__RESET_CHASE_APPLICATION_INFO' },
        { type: 'SHARED__FORCE_HIDE_SPINNER', pendingCallsCount: undefined },
        { type: 'SET_RE_LOGIN_CALLBACK_FUNCTIONS', reLoginCallbackFunctions: {}, reLoginLocation: '' },
        { type: 'RETRY_FUNCTIONS', retryFunctions: [] },
        { type: WebViewActionTypes.WEB_VIEW__UPDATE_ACCOUNT_SUCCESS, isFetching: false, response: 'NATIVE_LOG_OUT' }
      ];

      beforeEach(() => {
        clearSpinnerAndModalOptionsStub = sinon.stub();
        continueAsGuestFnStub = sinon.stub();
        removeLoginFlowStub = sinon.stub().returns(true);
        webViewActionsProxy = proxyquire('src/shared/actions/webViewActions', {
          'src/shared/helpers/accountInfoHelper': {
            getOauthLoginSession: getOAuthStub,
            rememberLoginFlow: removeLoginFlowStub
          },
          'src/shared/helpers/loginSessionHelper': {
            isLoggedInWithCookies: sinon.stub().returns(true)
          },
          'src/shared/helpers/uiHelper': {
            forceDomUpdatesAndThenExecute: forceDomUpdatesAndThenExecuteStub
          },
          reLoginModalActions: {
            clearSpinnerAndModalOptions: clearSpinnerAndModalOptionsStub
          }
        });
      });

      it('should do the cleanup', () => {
        getOAuthStub.returns({ id_token: 'id_token' });
        forceDomUpdatesAndThenExecuteStub.callsArg(0);
        webViewActionsProxy.removeOAuth()(store.dispatch, store.getState);

        expect(store.getActions()).to.deep.equal(expectedActions);
      });

      it('should call the continue as guest callback function', () => {
        store = mockStore({
          app: {
            reLoginModal: {
              reLoginLocation: '',
              reLoginCallbackFunctions: { continueAsGuestFn: continueAsGuestFnStub }
            }
          }
        });
        getOAuthStub.returns({ id_token: 'id_token' });
        forceDomUpdatesAndThenExecuteStub.callsArg(0);
        webViewActionsProxy.removeOAuth()(store.dispatch, store.getState);

        expect(store.getActions()).to.deep.equal(expectedActions);
        expect(continueAsGuestFnStub).to.have.been.called;
      });

      it('should not call the continue as guest callback function if it is empty', () => {
        store = mockStore({ app: { reLoginModal: { reLoginLocation: '', reLoginCallbackFunctions: {} } } });

        getOAuthStub.returns({ id_token: 'id_token' });
        forceDomUpdatesAndThenExecuteStub.callsArg(0);
        webViewActionsProxy.removeOAuth()(store.dispatch, store.getState);

        expect(store.getActions()).to.deep.equal(expectedActions);
        expect(continueAsGuestFnStub).to.not.have.been.called;
      });
    });
  });

  describe('shareFlightStatusDetails', () => {
    it('should create action with specified shareDetails value', () => {
      const shareDetails = {
        details: 'someDetails'
      };

      expect(WebViewActions.shareFlightStatusDetails(shareDetails)).to.deep.equal({
        type: WebViewActionTypes.WEB_VIEW__SEND_SHARE_FLIGHT_STATUS_DETAILS,
        shareDetails
      });
    });
  });

  describe('should handle chase save offers and', () => {
    let decodeMessageStub;
    let saveChasePrequalOffersStub;

    it('should decode and save chase prequal offers to local storage', () => {
      const encodedResponse = 'abcdefghijklmnop';
      const expectedResponse = {
        key: 'value',
        expirationTimestamp: 1234567891234
      };

      decodeMessageStub = sinon.stub(WebViewHelper, 'decodeMessage').returns(expectedResponse);
      saveChasePrequalOffersStub = sinon.stub(LocalStorageCache, 'saveChasePrequalOffers');

      WebViewActions.handleSaveChaseOffers(encodedResponse)();

      expect(decodeMessageStub).to.have.been.calledWith(encodedResponse);
      expect(saveChasePrequalOffersStub).to.have.been.calledWith(
        expectedResponse,
        null,
        expectedResponse.expirationTimestamp
      );
    });
  });

  describe('should handle ExternalPaymentAuthorized action and', () => {
    it('should create action to handle external payment authorized', () => {
      const value = 'queryParams';
      const expectedAction = {
        type: WebViewActionTypes.WEB_VIEW__HANDLE_EXTERNAL_PAYMENT_AUTHORIZED,
        value
      };

      expect(WebViewActions.handleExternalPaymentAuthorized(value)).to.deep.equal(expectedAction);
    });
  });

  describe('should handle voidApplePayTransaction', () => {
    let initiateVoidTransactionStub;

    beforeEach(() => {
      store = mockStore({
        app: {
          applePay: {
            applePayCard: getNativeApplePayCard()
          },
          reLoginModal: {
            reLoginCallbackFunctions: {
              continueAsGuestFn: sinon.stub()
            },
            reLoginLocation: ''
          },
          toggles: {
            CEPTOR_VOID_API: true
          }
        }
      });
      handleReLoginStub = sinon.stub(WebViewActions, 'handleReLogin');
      initiateVoidTransactionStub = sinon.stub(AlternativeFormsOfPaymentActions, 'initiateVoidTransaction');
      initiateVoidTransactionStub.returns({ type: 'ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED' });
    });

    it('should dispatch an action to initiate a void transaction for Apple Pay when shouldVoidTransaction is true', (done) => {
      WebViewActions.voidApplePayTransaction()(store.dispatch, store.getState);

      waitFor.untilAssertPass(() => {
        expect(initiateVoidTransactionStub).to.have.been.calledWith(
          PAYMENT_METHODS.APPLE_PAY,
          null,
          true
        );
      }, done);
    });

    it('should not dispatch initiateVoidTransaction when hasSelectedApplePay is false', (done) => {
      store = mockStore({
        app: {
          applePay: {
            applePayCard: null
          },
          reLoginModal: {
            reLoginCallbackFunctions: {
              continueAsGuestFn: sinon.stub()
            },
            reLoginLocation: ''
          },
          toggles: {
            CEPTOR_VOID_API: true
          }
        }
      });

      WebViewActions.voidApplePayTransaction()(store.dispatch, store.getState);

      waitFor.untilAssertPass(() => {
        expect(initiateVoidTransactionStub).to.not.have.been.called;
      }, done);
    });

    it('should not dispatch initiateVoidTransaction when CEPTOR_VOID_API is false and reLoginLocation is undefined', (done) => {
      store = mockStore({
        app: {
          applePay: {
            applePayCard: getNativeApplePayCard()
          },
          reLoginModal: null,
          toggles: {
            CEPTOR_VOID_API: false
          }
        }
      });

      WebViewActions.voidApplePayTransaction()(store.dispatch, store.getState);

      waitFor.untilAssertPass(() => {
        expect(initiateVoidTransactionStub).to.not.have.been.called;
      }, done);
    });
  });
});

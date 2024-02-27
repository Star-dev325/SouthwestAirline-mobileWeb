import i18n from '@swa-ui/locale';
import proxyquire from 'proxyquire';
import Q from 'q';
import { sandbox } from 'sinon';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions.js';
import * as ChaseActions from 'src/chase/actions/chaseActions';
import AccountActionTypes from 'src/shared/actions/accountActionTypes';
import * as CreditCardActions from 'src/shared/actions/creditCardActions';
import * as FormDataActions from 'src/shared/actions/formDataActions.js';
import * as AccountsApi from 'src/shared/api/accountsApi';
import * as OAuthApi from 'src/shared/api/oAuthApi';
import * as SalesforceApi from 'src/shared/api/salesforceApi';
import * as localStorageCache from 'src/shared/cache/localStorageCache';
import CheckInLocalStorageHelper from 'src/checkIn/helpers/checkInLocalStorageHelper';
import * as AccountInfoHelper from 'src/shared/helpers/accountInfoHelper';
import * as LoginSessionHelper from 'src/shared/helpers/loginSessionHelper';
import BrowserObject from 'src/shared/helpers/browserObject';
import { get, noop } from 'src/shared/helpers/jsUtils';
import StorageKeys from 'src/shared/helpers/storageKeys';
import { LOGIN_RR_MISMATCH_ERROR_CODE } from 'src/shared/helpers/validateLoginHelper';
import * as corporateInfoTransformer from 'src/shared/transformers/corporateInfoTransformer';
import * as OAuthErrorMessageTransformer from 'src/shared/transformers/oauthErrorMessageTransformer';
import * as userInfoTransformer from 'src/shared/transformers/userInfoTransformer';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import localStorage from 'store2';
import createMockStore from 'test/unit/helpers/createMockStore';

const { window } = BrowserObject;

const sinon = sandbox.create();
const mockStore = createMockStore();

window.navigator.vibrate = noop;

const {
  ACCOUNT__GRANT_LEISURE_TOKEN,
  ACCOUNT__GRANT_LEISURE_TOKEN_FAILED,
  ACCOUNT__FETCH_USER_INFO,
  ACCOUNT__SAVE_CORPORATE_INFO,
  ACCOUNT__SAVE_ACCOUNT_INFO,
  ACCOUNT__SAVE_ACCOUNT_NUMBER,
  ACCOUNT__SAVE_RECENT_FLIGHT_DESTINATION,
  ACCOUNT__SET_IS_LOGGED_IN,
  ACCOUNT__UPDATE_ACCOUNT_INFO_FETCHED
} = AccountActionTypes;

const removeResponsiveCookiesStub = sinon.stub();
const removeResponsiveStoresStub = sinon.stub();

const AccountActions = proxyquire('src/shared/actions/accountActions', {
  '@swa-ui/authentication/logoutHandler': {
    removeCookies: removeResponsiveCookiesStub,
    removeResponsiveStores: removeResponsiveStoresStub
  }
});

describe('AccountActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should dispatch setIsLoggedIn', () => {
    store.dispatch(AccountActions.setIsLoggedIn(true));

    const actions = store.getActions();

    expect(actions).to.deep.equal([
      {
        type: ACCOUNT__SET_IS_LOGGED_IN,
        isLoggedIn: true
      }
    ]);
  });

  describe('login', () => {
    const expireHomeNavMenuAction = { type: 'expireHomeNavMenuAction' };
    const mockCorporateInfo = {
      activeCompanyIdAssociations: [{ companyId: '99587574', companyName: 'Dunder Mifflin Paper Company' }],
      expiration: 9999999999
    };
    const request = {
      userNameOrAccountNumber: '601554133',
      password: 'password',
      shouldRememberUser: false
    };
    const mockApplicationProperties = { CORPORATE_INFO_TIMEOUT_MIN: '30' };
    let response;

    beforeEach(() => {
      response = {
        isFetching: false,
        type: 'ACCOUNT__FETCH_ACCOUNT_INFO_FAILED',
        error: 'UserNotLoginError: Your session has expired'
      };

      sinon.stub(OAuthApi, 'login').returns(Promise.resolve(response));
      sinon.stub(AccountInfoHelper, 'rememberUser');
      sinon.stub(AccountInfoHelper, 'forgetUser');
      sinon.stub(AccountInfoHelper, 'rememberOauthLoginSession');
      sinon.stub(corporateInfoTransformer, 'transformToCorporateInfo');
      sinon.stub(WcmActions, 'expireHomeNavMenu').returns(expireHomeNavMenuAction);
      sinon.stub(AccountsApi, 'fetchAccountInfo');
      AccountsApi.fetchAccountInfo.returns(Q.resolve({}));

      store = mockStore({
        app: {
          toggles: { LOGIN_V4: true },
          wcmContent: {
            applicationProperties: mockApplicationProperties
          }
        }
      });
    });

    it('should dispatch actions, remember user & session when CHAPI login succeeds and shouldRememberUser is true', () => {
      const shouldRememberUserRequest = {
        ...request,
        shouldRememberUser: true
      };

      return store.dispatch(AccountActions.login(shouldRememberUserRequest)).then(() => {
        expect(store.getActions()[0]).to.deep.equal({
          isFetching: true,
          type: 'ACCOUNT__LOGIN_USER'
        });
        expect(store.getActions()[1]).to.deep.equal({
          isFetching: true,
          type: 'ACCOUNT__FETCH_ACCOUNT_INFO'
        });
        expect(AccountInfoHelper.rememberUser).to.be.calledWith(shouldRememberUserRequest.userNameOrAccountNumber);
        expect(AccountInfoHelper.rememberOauthLoginSession).to.be.calledWith(response);
      });
    });

    it('should remember session but not user when login succeeds and shouldRememberUser is false', () =>
      store.dispatch(AccountActions.login(request)).then(() => {
        expect(AccountInfoHelper.forgetUser).to.be.called;
        expect(AccountInfoHelper.rememberOauthLoginSession).to.be.calledWith(response);
      }));

    it('should clear checkin hazmat acknowledgements when user logs in', () => {
      sinon.spy(CheckInLocalStorageHelper, 'clearAcceptedHazmatDeclarations');

      return store.dispatch(AccountActions.login(request)).then(() => {
        expect(CheckInLocalStorageHelper.clearAcceptedHazmatDeclarations).to.be.called;
      });
    });

    it('should dispatch updateCorporateInfo action', () => {
      corporateInfoTransformer.transformToCorporateInfo.returns(mockCorporateInfo);

      return store.dispatch(AccountActions.login(request)).then(() => {
        expect(corporateInfoTransformer.transformToCorporateInfo).to.be.called;
        expect(store.getActions()[1]).to.deep.equal({
          type: ACCOUNT__SAVE_CORPORATE_INFO,
          corporateInfo: mockCorporateInfo
        });
      });
    });

    it('should dispatch expireHomeNavMenu action', () =>
      store.dispatch(AccountActions.login(request)).then(() => {
        expect(store.getActions()[8]).to.deep.equal(expireHomeNavMenuAction);
      }));

    it('should dispatch actions when CHAPI login fails', () => {
      const transformToOAuthErrorMessage = { ...response, responseJSON: 100 };
      const loginError = new Error();
      const transformToOAuthErrorMessageStub = sinon
        .stub(OAuthErrorMessageTransformer, 'transformToOAuthErrorMessage')
        .returns(transformToOAuthErrorMessage);

      sinon.spy(CheckInLocalStorageHelper, 'clearAcceptedHazmatDeclarations');
      OAuthApi.login.returns(Promise.reject(loginError));

      return store.dispatch(AccountActions.login(request)).catch((error) => {
        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: 'ACCOUNT__LOGIN_USER'
          },
          {
            isFetching: false,
            error: transformToOAuthErrorMessage,
            type: 'ACCOUNT__LOGIN_USER_FAILED'
          }
        ]);
        expect(transformToOAuthErrorMessageStub).to.have.been.calledWith(error);
        expect(AccountInfoHelper.rememberUser).to.not.be.called;
        expect(AccountInfoHelper.forgetUser).to.not.be.called;
        expect(AccountInfoHelper.rememberOauthLoginSession).to.not.be.called;
        expect(CheckInLocalStorageHelper.clearAcceptedHazmatDeclarations).to.not.be.called;
        expect(error).to.deep.equal(loginError);
      });
    });

    it('should dispatch logout when login fails with LOGIN_RR_MISMATCH_ERROR_CODE ', () => {
      const loginError = {
        responseJSON: {
          code: LOGIN_RR_MISMATCH_ERROR_CODE
        }
      };

      OAuthApi.login.returns(Promise.reject(loginError));

      return store.dispatch(AccountActions.login(request)).catch(() => {
        expect(store.getActions()).to.deep.equal([
          { type: 'ACCOUNT__LOGIN_USER', isFetching: true },
          {
            type: 'ACCOUNT__LOGIN_USER_FAILED',
            error: loginError,
            isFetching: false
          },
          { type: 'ACCOUNT__LOGOUT_USER', isFetching: true }
        ]);
      });
    });
  });

  describe('logout', () => {
    const resetSavedCreditCardsMockAction = {
      type: 'RESET_CHASE_DATA_MOCK_ACTION'
    };
    const resetChaseDataMockAction = {
      type: 'RESET_CHASE_DATA_MOCK_ACTION'
    };
    const expireHomeNavMenuAction = {
      type: 'WCM__EXPIRE_HOME_NAV_MENU'
    };
    const resetFormDataAction = {
      type: 'RESET_FORM_DATA'
    };
    const clearSelectedFrequentTravelersAction = {
      type: 'AIR_BOOKING__CLEAR_SELECTED_FREQUENT_TRAVELERS'
    };

    beforeEach(() => {
      sinon.stub(CreditCardActions, 'resetSavedCreditCards').returns(resetSavedCreditCardsMockAction);
      sinon.stub(ChaseActions, 'resetChaseData').returns(resetChaseDataMockAction);
      sinon.stub(WcmActions, 'retrieveHomeNavMenu').returns(expireHomeNavMenuAction);
      sinon.stub(FormDataActions, 'resetFormData').returns(resetFormDataAction);
      sinon.stub(AirBookingActions, 'cleanUpFrequentTravelerSelected').returns(clearSelectedFrequentTravelersAction);
    });

    it('should clean up session if API call succeeds', () => {
      sinon.spy(CheckInLocalStorageHelper, 'clearAcceptedHazmatDeclarations');
      sinon.stub(OAuthApi, 'logout').resolves();

      return store.dispatch(AccountActions.logout()).then(() => {
        expect(CheckInLocalStorageHelper.clearAcceptedHazmatDeclarations).to.be.called;
        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: 'ACCOUNT__LOGOUT_USER'
          },
          {
            accountInfo: null,
            type: 'ACCOUNT__SAVE_ACCOUNT_INFO'
          },
          {
            isLoggedIn: false,
            type: 'ACCOUNT__SET_IS_LOGGED_IN'
          },
          {
            isFetched: false,
            type: 'ACCOUNT__UPDATE_ACCOUNT_INFO_FETCHED'
          },
          {
            corporateInfo: null,
            type: 'ACCOUNT__SAVE_CORPORATE_INFO'
          },
          resetSavedCreditCardsMockAction,
          resetChaseDataMockAction,
          expireHomeNavMenuAction,
          resetFormDataAction,
          clearSelectedFrequentTravelersAction,
          {
            isFetching: false,
            type: 'ACCOUNT__LOGOUT_USER_SUCCESS'
          }
        ]);
      });
    });

    it('should clean up session if API call fails', () => {
      sinon.spy(CheckInLocalStorageHelper, 'clearAcceptedHazmatDeclarations');
      sinon.stub(OAuthApi, 'logout').rejects({ fake: 'error' });

      return store.dispatch(AccountActions.logout()).then(() => {
        expect(CheckInLocalStorageHelper.clearAcceptedHazmatDeclarations).to.be.called;
        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: 'ACCOUNT__LOGOUT_USER'
          },
          {
            accountInfo: null,
            type: 'ACCOUNT__SAVE_ACCOUNT_INFO'
          },
          {
            isLoggedIn: false,
            type: 'ACCOUNT__SET_IS_LOGGED_IN'
          },
          {
            isFetched: false,
            type: 'ACCOUNT__UPDATE_ACCOUNT_INFO_FETCHED'
          },
          {
            corporateInfo: null,
            type: 'ACCOUNT__SAVE_CORPORATE_INFO'
          },
          resetSavedCreditCardsMockAction,
          resetChaseDataMockAction,
          expireHomeNavMenuAction,
          resetFormDataAction,
          clearSelectedFrequentTravelersAction,
          {
            isFetching: false,
            type: 'ACCOUNT__LOGOUT_USER_FAILED'
          }
        ]);
      });
    });
  });

  describe('getAccountInfo', () => {
    beforeEach(() => {
      sinon.stub(AccountsApi, 'fetchAccountInfo');
      sinon.stub(AccountInfoHelper, 'rememberBasicAccountInfo');
    });

    it('should dispatch actions and remember account info when CHAPI fetchAccountInfo call succeeds', () => {
      const response = {
        accountInfo: {
          contactInfo: '817-555-1212',
          customerInfo: {
            accountNumber: '601554133',
            birthDate: '03-23-1999',
            countryCode: '1',
            emailAddress: 'fred@yahoo.com',
            name: {
              firstName: 'Fred',
              lastName: 'Flint',
              userName: 'freddy'
            }
          },
          isTierStatusPending: false,
          rapidRewardsDetails: {
            companionPassInfo: null,
            isEnrolledInRapidRewards: true,
            redeemablePoints: 100,
            tierInfo: {
              tier: 1
            },
            userAlreadyHasChaseRRVisa: false
          }
        }
      };

      AccountsApi.fetchAccountInfo.returns(Promise.resolve(response));

      return store.dispatch(AccountActions.getAccountInfo()).then(() => {
        expect(store.getActions()[0]).to.deep.equal({
          isFetching: true,
          type: 'ACCOUNT__FETCH_ACCOUNT_INFO'
        });
        expect(store.getActions()[1]).to.deep.equal({
          response,
          isFetching: false,
          type: 'ACCOUNT__FETCH_ACCOUNT_INFO_SUCCESS'
        });
        expect(store.getActions()[2].type).equals(ACCOUNT__SAVE_ACCOUNT_INFO);
        expect(store.getActions()[3]).to.deep.equal({
          isLoggedIn: true,
          type: ACCOUNT__SET_IS_LOGGED_IN
        });
        expect(store.getActions()[4]).to.deep.equal({
          accountNumber: undefined,
          type: ACCOUNT__SAVE_ACCOUNT_NUMBER
        });
        expect(store.getActions()[5]).to.deep.equal({
          isFetched: true,
          type: ACCOUNT__UPDATE_ACCOUNT_INFO_FETCHED
        });
      });
    });

    it('should dispatch failed actions when CHAPI fetchAccountInfo call fails', () => {
      const error = 'error';

      AccountsApi.fetchAccountInfo.returns(Promise.reject(error));

      return store.dispatch(AccountActions.getAccountInfo()).then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: 'ACCOUNT__FETCH_ACCOUNT_INFO'
          },
          {
            error,
            isFetching: false,
            type: 'ACCOUNT__FETCH_ACCOUNT_INFO_FAILED'
          }
        ]);
      });
    });
  });

  describe('refreshCorporateInfo', () => {
    let fetchUserInfoStub;
    let grantLeisureTokenStub;
    let localStorageGetStub;

    beforeEach(() => {
      fetchUserInfoStub = sinon.stub(OAuthApi, 'fetchUserInfo').returns(Promise.resolve());
      grantLeisureTokenStub = sinon.stub(OAuthApi, 'grantLeisureToken').returns(Promise.resolve());
      localStorageGetStub = sinon.stub(localStorage, 'get');
      store = mockStore({
        app: {
          account: {
            corporateInfo: {
              activeCompanyIdAssociations: null
            },
            isLoggedIn: true
          }
        }
      });
    });

    it('should be refreshed with grant call when corporate', async () => {
      localStorageGetStub.returns({
        scope: 'openid swabiz:mobile:web:ct',
        access_token: 'corporate.access.token',
        'corporate.customerUserInformation.activeCompanyIdAssociations': [
          {
            companyId: '99999999',
            companyName: 'Company One'
          }
        ]
      });

      await store.dispatch(AccountActions.refreshCorporateInfo());

      expect(grantLeisureTokenStub).to.have.been.called;
    });

    it('should not refreshed with grant call when state is empty', async () => {
      store = mockStore({
        app: {}
      });
      localStorageGetStub.returns({
        scope: 'openid swabiz:mobile:web:ct',
        access_token: 'corporate.access.token',
        'corporate.customerUserInformation.activeCompanyIdAssociations': [
          {
            companyId: '99999999',
            companyName: 'Company One'
          }
        ]
      });

      await store.dispatch(AccountActions.refreshCorporateInfo());

      expect(fetchUserInfoStub).to.have.not.been.called;
    });

    it('should not be refreshed when localStorage is empty', async () => {
      store = mockStore({
        app: {}
      });
      localStorageGetStub.returns(null);

      await store.dispatch(AccountActions.refreshCorporateInfo());

      expect(fetchUserInfoStub).to.have.not.been.called;
    });

    it('should be refreshed with user info call when leisure', async () => {
      sinon.stub(LoginSessionHelper, 'hasActiveSessionCookies').returns(true);
      localStorageGetStub.returns({
        scope: 'openid dotcom:mobile:web:ct',
        access_token: 'corporate.access.token',
        'corporate.customerUserInformation.activeCompanyIdAssociations': [
          {
            companyId: '99999999',
            companyName: 'Company One'
          }
        ]
      });

      await store.dispatch(AccountActions.refreshCorporateInfo());

      expect(fetchUserInfoStub).to.have.been.called;
    });

    it('should be hard refreshed with user info call when true is passed to refreshCorporateInfo', async () => {
      const deleteUserInfoStub = sinon.stub(localStorageCache, 'loadUserInfo');

      sinon.stub(LoginSessionHelper, 'hasActiveSessionCookies').returns(true);
      localStorageGetStub.returns({
        scope: 'openid dotcom:mobile:web:ct',
        access_token: 'corporate.access.token',
        'corporate.customerUserInformation.activeCompanyIdAssociations': [
          {
            companyId: '99999999',
            companyName: 'Company One'
          }
        ]
      });

      await store.dispatch(AccountActions.refreshCorporateInfo(true));

      expect(deleteUserInfoStub).to.have.been.called;
      expect(fetchUserInfoStub).to.have.been.called;
    });

    it('should not be refreshed if corporate info already in state', async () => {
      await store.dispatch(AccountActions.refreshCorporateInfo());

      expect(fetchUserInfoStub).to.have.not.been.called;
      expect(grantLeisureTokenStub).to.have.not.been.called;
    });
  });

  describe('getUserInfo', () => {
    const mockCompanies = [
      { companyId: '99999999', companyName: 'Hamlin, Hamlin & McGill' },
      { companyId: '99999999', companyName: 'Los Pollos Hermanos' }
    ];
    const mockResponse = {
      'corporate.customerUserInformation.activeCompanyIdAssociations': mockCompanies
    };
    const expectedResponse = {
      corporate: {
        customerUserInformation: {
          activeCompanyIdAssociations: mockCompanies
        }
      }
    };
    let transformUserInfoStub;

    beforeEach(() => {
      store = mockStore({
        app: {
          account: {
            isLoggedIn: true
          }
        }
      });
      sinon.stub(OAuthApi, 'fetchUserInfo');
      sinon.stub(localStorage, 'get').returns({ access_token: 'corporate.access.token' });
      transformUserInfoStub = sinon.stub(userInfoTransformer, 'transformUserInfo').returns(expectedResponse);
    });

    it('should return cached date', () => {
      sinon.stub(localStorageCache, 'loadUserInfo').returns(expectedResponse);
      sinon.stub(LoginSessionHelper, 'shouldUseGatewayCookies').returns(false);
      sinon.stub(LoginSessionHelper, 'hasActiveSessionCookies').returns(true);
      store = mockStore({
        app: {
          account: {
            isLoggedIn: true
          }
        }
      });

      const data = store.dispatch(AccountActions.getUserInfo());

      expect(data).to.equal(expectedResponse);
    });

    it('should not return cached date if shouldUseFreshData is true', () => {
      sinon.stub(localStorageCache, 'loadUserInfo').returns(expectedResponse);
      sinon.stub(LoginSessionHelper, 'shouldUseGatewayCookies').returns(false);
      sinon.stub(LoginSessionHelper, 'hasActiveSessionCookies').returns(true);
      store = mockStore({
        app: {
          account: {
            isLoggedIn: true
          }
        }
      });
      OAuthApi.fetchUserInfo.returns(Promise.resolve(mockResponse));
      store.dispatch(AccountActions.getUserInfo(true));

      expect(OAuthApi.fetchUserInfo).to.have.been.called;
    });

    it('should call saveUserInfo if user data is fetched from server', async () => {
      sinon.stub(localStorageCache, 'loadUserInfo').returns(null);
      const saveUserInfoStub = sinon.stub(localStorageCache, 'saveUserInfo');

      sinon.stub(LoginSessionHelper, 'shouldUseGatewayCookies').returns(false);
      sinon.stub(LoginSessionHelper, 'hasActiveSessionCookies').returns(true);

      OAuthApi.fetchUserInfo.returns(Promise.resolve(mockResponse));
      store = mockStore({
        app: {
          account: {
            isLoggedIn: true
          }
        }
      });

      await store.dispatch(AccountActions.getUserInfo());

      expect(saveUserInfoStub).to.have.been.calledWith(expectedResponse);
    });

    it('should not dispatch actions when user is not logged in', () => {
      store = mockStore({
        app: {
          account: {
            isLoggedIn: false
          }
        }
      });

      OAuthApi.fetchUserInfo.returns(Promise.resolve(mockResponse));

      return store.dispatch(AccountActions.getUserInfo()).then(() => {
        expect(transformUserInfoStub).to.not.have.been.called;
        expect(store.getActions()).to.deep.equal([]);
      });
    });

    it('should dispatch actions when CHAPI fetchUserInfo call succeeds', () => {
      OAuthApi.fetchUserInfo.returns(Promise.resolve(mockResponse));
      sinon.stub(LoginSessionHelper, 'hasActiveSessionCookies').returns(true);

      return store.dispatch(AccountActions.getUserInfo()).then((response) => {
        expect(transformUserInfoStub).to.have.been.calledWith(mockResponse);
        expect(response).to.deep.equal(expectedResponse);
        expect(store.getActions()[0]).to.deep.equal({
          type: ACCOUNT__FETCH_USER_INFO
        });
        expect(store.getActions()[1]).to.deep.equal({
          response,
          type: 'ACCOUNT__FETCH_USER_INFO_SUCCESS'
        });
        expect(store.getActions()[2].type).equals(ACCOUNT__SAVE_CORPORATE_INFO);
      });
    });

    it('should not dispatch save corporate info if corporateInfo is undefined', () => {
      sinon.stub(LoginSessionHelper, 'hasActiveSessionCookies').returns(true);
      transformUserInfoStub.returns({});
      OAuthApi.fetchUserInfo.returns(Promise.resolve({}));

      return store.dispatch(AccountActions.getUserInfo()).then((response) => {
        expect(transformUserInfoStub).to.have.been.calledWith({});
        expect(response).to.deep.equal({});
        expect(store.getActions()[0]).to.deep.equal({
          type: ACCOUNT__FETCH_USER_INFO
        });
        expect(store.getActions()[1]).to.deep.equal({
          response,
          type: 'ACCOUNT__FETCH_USER_INFO_SUCCESS'
        });
        expect(get(store.getActions(), '[2].type')).undefined;
      });
    });

    it('should dispatch failed actions when CHAPI fetchUserInfo call fails', () => {
      const error = 'error';

      sinon.stub(LoginSessionHelper, 'hasActiveSessionCookies').returns(true);
      OAuthApi.fetchUserInfo.returns(Promise.reject(error));

      return store.dispatch(AccountActions.getUserInfo()).then(() => {
        expect(transformUserInfoStub).to.not.have.been.called;
        expect(store.getActions()).to.deep.equal([
          {
            type: ACCOUNT__FETCH_USER_INFO
          },
          {
            error,
            shouldHideError: true,
            type: 'ACCOUNT__FETCH_USER_INFO_FAILED'
          }
        ]);
      });
    });
  });

  it('should saveAccountInfo when user cleanUpEndOfSession', () => {
    sinon.stub(localStorage, 'remove');
    store.dispatch(AccountActions.cleanUpEndOfSession());

    const actions = store.getActions();

    expect(actions[0]).to.deep.equal({
      type: ACCOUNT__SAVE_ACCOUNT_INFO,
      accountInfo: null
    });
    expect(actions[1]).to.deep.equal({
      type: ACCOUNT__SET_IS_LOGGED_IN,
      isLoggedIn: false
    });
    expect(localStorage.remove).have.been.calledWith(StorageKeys.ACCOUNT_INFO);
  });

  it('should call cleanUpEndOfSession with isReLogin true', () => {
    store.dispatch(AccountActions.cleanUpEndOfSession(true));
    const actions = store.getActions();

    expect(actions[0]).to.deep.equal({
      type: ACCOUNT__SAVE_ACCOUNT_INFO,
      accountInfo: null
    });
    expect(actions[1]).to.deep.equal({
      type: ACCOUNT__SET_IS_LOGGED_IN,
      isLoggedIn: false
    });
  });

  it('should call cleanUpEndOfSession with isReLogin false', () => {
    store.dispatch(AccountActions.cleanUpEndOfSession(false));
    const actions = store.getActions();

    expect(actions[8]).to.deep.equal({
      type: 'RESET_FORM_DATA'
    });
  });

  describe('cleanUpAssociatedInfo', () => {
    const resetSavedCreditCardsMockAction = { type: 'RESET_SAVED_CREDIT_CARDS_ACTION' };
    const resetChaseDataMockAction = { type: 'RESET_CHASE_DATA_ACTION' };
    let resetSavedCreditCardsStub;
    let resetChaseDataStub;

    beforeEach(() => {
      resetSavedCreditCardsStub = sinon
        .stub(CreditCardActions, 'resetSavedCreditCards')
        .returns(resetSavedCreditCardsMockAction);
      resetChaseDataStub = sinon.stub(ChaseActions, 'resetChaseData').returns(resetChaseDataMockAction);
      store.dispatch(AccountActions.cleanUpEndOfSession());
    });

    it('should reset saved credit cards', () => {
      expect(resetSavedCreditCardsStub).to.have.been.called;
      expect(store.getActions()[4]).to.deep.equal(resetSavedCreditCardsMockAction);
    });

    it('should reset chase data', () => {
      expect(resetChaseDataStub).to.have.been.called;
      expect(store.getActions()[5]).to.deep.equal(resetChaseDataMockAction);
    });
  });

  it('should get account number from localstorage and save it', () => {
    store.dispatch(AccountActions.saveAccountNumber('accountNumber'));

    expect(store.getActions()).to.deep.equal([
      {
        type: ACCOUNT__SAVE_ACCOUNT_NUMBER,
        accountNumber: 'accountNumber'
      }
    ]);
  });

  it('should update account info fetched', () => {
    store.dispatch(AccountActions.updateAccountInfoFetched(true));

    expect(store.getActions()).to.deep.equal([
      {
        type: ACCOUNT__UPDATE_ACCOUNT_INFO_FETCHED,
        isFetched: true
      }
    ]);
  });

  describe('saveSelectedCompany', () => {
    const mockCompanies = [
      { companyId: '99999999', companyName: 'Hamlin, Hamlin & McGill' },
      { companyId: '99999999', companyName: 'Los Pollos Hermanos' }
    ];
    const response = {
      'corporate.customerUserInformation.activeCompanyIdAssociations': mockCompanies
    };

    beforeEach(() => {
      store = mockStore({
        app: {
          account: {
            corporateInfo: {
              activeCompanyIdAssociations: mockCompanies
            }
          }
        }
      });
      sinon.stub(OAuthApi, 'grantCorporateToken');
      sinon.stub(AccountInfoHelper, 'rememberOauthLoginSession');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should save selected company', () => {
      OAuthApi.grantCorporateToken.returns(Promise.resolve(response));

      return store.dispatch(AccountActions.saveSelectedCompany(mockCompanies[1])).then(() => {
        expect(AccountInfoHelper.rememberOauthLoginSession).to.have.been.calledWith(response);
        expect(store.getActions()[0]).to.deep.equal({ type: 'ACCOUNT__GRANT_CORPORATE_TOKEN', isFetching: true });
        expect(store.getActions()[1]).to.deep.equal({
          type: 'ACCOUNT__GRANT_CORPORATE_TOKEN_SUCCESS',
          response,
          isFetching: false
        });
        expect(store.getActions()[2].corporateInfo.selectedCompany).to.deep.equal(mockCompanies[1]);
      });
    });

    it('should not save selected company if corporateInfo is undefined', () => {
      store = mockStore({});
      const response = {};

      OAuthApi.grantCorporateToken.returns(Promise.resolve(response));

      return store.dispatch(AccountActions.saveSelectedCompany(mockCompanies[1])).then(() => {
        expect(store.getActions()[2]).to.be.undefined;
      });
    });

    it('should not save selected company if grant call fails', () => {
      OAuthApi.grantCorporateToken.returns(Promise.reject('error'));

      return store.dispatch(AccountActions.saveSelectedCompany(mockCompanies[1])).catch(() => {
        expect(store.getActions()[1]).to.deep.equal({
          type: 'ACCOUNT__GRANT_CORPORATE_TOKEN_FAILED',
          error: 'error',
          isFetching: false
        });
        expect(store.getActions()[2]).to.not.exist;
      });
    });

    it('should prevent next action (goBack to booking page) if retry function is disabled', () => {
      OAuthApi.grantCorporateToken.returns(Promise.reject({ disableRetry: true }));

      return store.dispatch(AccountActions.saveSelectedCompany(mockCompanies[1])).catch(() => {
        expect(store.getActions()[1]).to.deep.equal({
          type: 'ACCOUNT__GRANT_CORPORATE_TOKEN_FAILED',
          isFetching: false
        });
        expect(store.getActions()[2]).to.not.exist;
      });
    });

    it('should customize error message when company deactivated error received from gateway', () => {
      store = mockStore({});
      const originalError = {
        responseJSON: {
          code: 410517137,
          message: 'Authentication Error'
        }
      };
      const expectedError = {
        responseJSON: {
          code: 410517137,
          message: i18n('ERROR__COMPANY_DEACTIVATED')
        }
      };

      OAuthApi.grantCorporateToken.returns(Promise.reject(originalError));

      return store.dispatch(AccountActions.saveSelectedCompany(mockCompanies[1])).catch(() => {
        expect(store.getActions()[1]).to.deep.equal({
          type: 'ACCOUNT__GRANT_CORPORATE_TOKEN_FAILED',
          error: expectedError,
          isFetching: false
        });
      });
    });
  });

  describe('removeSelectedCompany', () => {
    const mockCompany = { companyId: '99587574', companyName: 'Dunder Mifflin Paper Company' };
    const response = {
      'corporate.customerUserInformation.activeCompanyIdAssociations': [mockCompany]
    };

    beforeEach(() => {
      store = mockStore({
        app: {
          account: {
            corporateInfo: {
              activeCompanyIdAssociations: [mockCompany],
              selectedCompany: mockCompany
            }
          }
        }
      });
      sinon.stub(OAuthApi, 'grantLeisureToken');
      sinon.stub(AccountInfoHelper, 'rememberOauthLoginSession');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should remove selected company', () => {
      OAuthApi.grantLeisureToken.returns(Promise.resolve(response));

      return store.dispatch(AccountActions.removeSelectedCompany()).then(() => {
        expect(AccountInfoHelper.rememberOauthLoginSession).to.have.been.calledWith(response);
        expect(store.getActions()[3].corporateInfo.selectedCompany).to.be.undefined;
      });
    });

    it('should dispatch cleanUpCorporateInfo action', () => {
      OAuthApi.grantLeisureToken.returns(Promise.resolve(response));

      return store.dispatch(AccountActions.removeSelectedCompany()).then(() => {
        expect(AccountInfoHelper.rememberOauthLoginSession).to.have.been.calledWith(response);
        expect(store.getActions()[2]).to.deep.equal({
          corporateInfo: null,
          type: ACCOUNT__SAVE_CORPORATE_INFO
        });
      });
    });

    it('should remove selected company if corporateInfo is null', () => {
      store = mockStore({});
      const response = {};

      OAuthApi.grantLeisureToken.returns(Promise.resolve(response));

      return store.dispatch(AccountActions.removeSelectedCompany()).then(() => {
        expect(store.getActions()[2].corporateInfo).to.be.null;
      });
    });

    it('should remove selected company if grant call fails', () => {
      const resetSavedCreditCardsMockAction = {
        type: 'RESET_CHASE_DATA_MOCK_ACTION'
      };
      const resetChaseDataMockAction = {
        type: 'RESET_CHASE_DATA_MOCK_ACTION'
      };
      const expireHomeNavMenuAction = {
        type: 'WCM__EXPIRE_HOME_NAV_MENU'
      };
      const resetFormDataAction = {
        type: 'RESET_FORM_DATA'
      };
      const clearSelectedFrequentTravelersAction = {
        type: 'AIR_BOOKING__CLEAR_SELECTED_FREQUENT_TRAVELERS'
      };

      sinon.stub(CreditCardActions, 'resetSavedCreditCards').returns(resetSavedCreditCardsMockAction);
      sinon.stub(ChaseActions, 'resetChaseData').returns(resetChaseDataMockAction);
      sinon.stub(WcmActions, 'expireHomeNavMenu').returns(expireHomeNavMenuAction);
      sinon.stub(FormDataActions, 'resetFormData').returns(resetFormDataAction);
      sinon.stub(AirBookingActions, 'cleanUpFrequentTravelerSelected').returns(clearSelectedFrequentTravelersAction);
      OAuthApi.grantLeisureToken.returns(Promise.reject('error'));

      return store.dispatch(AccountActions.removeSelectedCompany()).then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: ACCOUNT__GRANT_LEISURE_TOKEN
          },
          {
            accountInfo: null,
            type: ACCOUNT__SAVE_ACCOUNT_INFO
          },
          {
            isLoggedIn: false,
            type: ACCOUNT__SET_IS_LOGGED_IN
          },
          {
            isFetched: false,
            type: ACCOUNT__UPDATE_ACCOUNT_INFO_FETCHED
          },
          {
            corporateInfo: null,
            type: ACCOUNT__SAVE_CORPORATE_INFO
          },
          resetSavedCreditCardsMockAction,
          resetChaseDataMockAction,
          expireHomeNavMenuAction,
          resetFormDataAction,
          clearSelectedFrequentTravelersAction,
          {
            error: 'error',
            isFetching: false,
            type: ACCOUNT__GRANT_LEISURE_TOKEN_FAILED
          }
        ]);
      });
    });

    it('should clear session if remove company fails', () => {
      sinon.spy(CheckInLocalStorageHelper, 'clearAcceptedHazmatDeclarations');
      OAuthApi.grantLeisureToken.returns(Promise.reject('error'));

      return store.dispatch(AccountActions.removeSelectedCompany()).then(() => {
        expect(CheckInLocalStorageHelper.clearAcceptedHazmatDeclarations).to.be.called;
      });
    });

    it('should not clear session if remove company fails and clearSessionOnFail is false', () => {
      sinon.spy(CheckInLocalStorageHelper, 'clearAcceptedHazmatDeclarations');
      OAuthApi.grantLeisureToken.returns(Promise.reject('error'));

      return store.dispatch(AccountActions.removeSelectedCompany(false)).then(() => {
        expect(CheckInLocalStorageHelper.clearAcceptedHazmatDeclarations).to.not.be.called;
      });
    });

    it('should not remove selected company if in webview', () => {
      store = mockStore({
        app: {
          webView: { isWebView: true }
        }
      });

      return store.dispatch(AccountActions.removeSelectedCompany()).then(() => {
        expect(store.getActions()).to.be.empty;
      });
    });
  });

  describe('saveRecentFlightAirport', () => {
    it('should save recent flight airport', () => {
      store.dispatch(AccountActions.saveRecentFlightAirport('AAA'));

      expect(store.getActions()).to.deep.equal([
        {
          type: ACCOUNT__SAVE_RECENT_FLIGHT_DESTINATION,
          airportName: 'AAA'
        }
      ]);
    });
  });

  describe('when using api gateway cookies', () => {
    let response;
    const rememberOauthLoginSessionStub = sinon.stub();
    const rememberLoginFlowStub = sinon.stub();
    const request = {
      userNameOrAccountNumber: '601554133',
      password: 'password',
      shouldRememberUser: false
    };
    const id_token =
      'eyJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiM0VkRGVQNldzb3N0SmVjLXlXOXgwdyIsInN1YiI6IjYwMTY1NTkwMiIsImFwaUtleSI6Imw3eHhiZmMyZTY0NmNjNzI0ZDNhYjBmZTMwODU3MTU3Y2VjMCIsImlzcyI6Imh0dHBzOi8vYXBpLXNlY3VyaXR5Lml0ZXN0LnNvdXRod2VzdC5jb20iLCJub25jZSI6IjYwMTY1NTkwMjoxNjI2MTgwNjcyIiwidmVyc2lvbiI6ImFwaS1zZWN1cml0eS92NCIsImF1ZCI6WyJmY2M3Y2UyNy1kMTg1LTQ0MWQtYmZmNy1mMDdhMWNhNmY2YjkiLCJodHRwczovL2FwaS1zZWN1cml0eS5pdGVzdC5zb3V0aHdlc3QuY29tIl0sImF6cCI6ImZjYzdjZTI3LWQxODUtNDQxZC1iZmY3LWYwN2ExY2E2ZjZiOSIsImF1dGhfdGltZSI6MTYyNjE4MDY3MiwiZWF0IjoiMjcyNjA0MkNBODk2OTkzQUQyOEJCNEVFODM1Q0YyMDcyRjUxNEIzOUFDRkY3RjI4NDY3ODU3RTg0QzIwOTRFRDQxRTU5NjE1IiwiYXBpQ29udGV4dCI6eyJjdXN0b21lckluZm9ybWF0aW9uLmFjY291bnROdW1iZXIiOiI2MDE2NTU5MDIifSwiZXhwIjoxNjI2MTgyNDcyLCJpYXQiOjE2MjYxODA2NzJ9.EaoqewdCFegRaQ-k_JTaQy9yYoiou9owV67C_UYjpKIB1OZqkoIgkYIJH5suedAG1mQ6fETSaDJYXuTIupFyEuwSqunqfoK_t9-zqure1k6BXrs5E_Z-0w651mOHDIhh52jq-LAcen3ILNOKKbHjA5O7DR9Zr_Z0BPCTvF8sEOXUrax4COAJdCq65uu7JsNyvOddlE1ex5PFaup9Gu9tS0OpUARx9YXhkUpjWBcdlnmMpG6UMEPxsC3IAaf1pLkeBECwuPIW4OOJVDZza5NA3CS6hlkmdghCWyx1-jcnxrRA8xx9z8pxpELYs8QO0Z8_aGrefH79Gt47v3cutoEuyg';
    const expectedParams = {
      isFetching: false,
      type: 'ACCOUNT__FETCH_ACCOUNT_INFO_FAILED',
      error: 'UserNotLoginError: Your session has expired',
      at_hash: '3EdDeP6WsostJec-yW9x0w',
      sub: '601655902',
      apiKey: 'l7xxbfc2e646cc724d3ab0fe30857157cec0',
      iss: 'https://api-security.itest.southwest.com',
      nonce: '601655902:1626180672',
      version: 'api-security/v4',
      aud: ['fcc7ce27-d185-441d-bff7-f07a1ca6f6b9', 'https://api-security.itest.southwest.com'],
      azp: 'fcc7ce27-d185-441d-bff7-f07a1ca6f6b9',
      auth_time: 1626180672,
      eat: '2726042CA896993AD28BB4EE835CF2072F514B39ACFF7F28467857E84C2094ED41E59615',
      apiContext: {
        'customerInformation.accountNumber': '601655902'
      },
      exp: 1626182472,
      iat: 1626180672,
      id_token
    };
    const mockCompanies = [{ companyId: '99999999', companyName: 'Los Pollos Hermanos' }];

    beforeEach(() => {
      store = mockStore({
        app: {
          toggles: {
            USE_API_GATEWAY_COOKIES: true
          }
        }
      });
    });

    it('should store decoded props for login', () => {
      response = {
        isFetching: false,
        type: 'ACCOUNT__FETCH_ACCOUNT_INFO_FAILED',
        error: 'UserNotLoginError: Your session has expired'
      };
      const accountActions = proxyquire('src/shared/actions/accountActions', {
        'src/shared/api/oAuthApi': {
          login: sinon.stub().returns(Promise.resolve(response))
        },
        'src/shared/api/accountsApi': {
          fetchAccountInfo: sinon.stub().returns(Promise.resolve({}))
        },
        'src/shared/swa-persistence/cookie': {
          getValue: sinon.stub().returns(id_token)
        },
        'src/shared/helpers/accountInfoHelper': {
          rememberOauthLoginSession: rememberOauthLoginSessionStub,
          rememberLoginFlow: rememberLoginFlowStub
        }
      });

      return store.dispatch(accountActions.login(request)).then(() => {
        expect(rememberOauthLoginSessionStub).to.be.calledWith(expectedParams);
      });
    });

    it('should store decoded props for saveSelectedCompany', () => {
      const response = {
        'corporate.customerUserInformation.activeCompanyIdAssociations': mockCompanies
      };
      const accountActions = proxyquire('src/shared/actions/accountActions', {
        'src/shared/api/oAuthApi': {
          grantCorporateToken: sinon.stub().returns(Promise.resolve(response))
        },
        'src/shared/swa-persistence/cookie': {
          getValue: sinon.stub().returns(id_token)
        },
        'src/shared/helpers/accountInfoHelper': {
          rememberOauthLoginSession: rememberOauthLoginSessionStub,
          rememberLoginFlow: rememberLoginFlowStub
        }
      });

      return store.dispatch(accountActions.saveSelectedCompany(mockCompanies[0])).then(() => {
        expect(rememberOauthLoginSessionStub).to.be.calledWith(expectedParams);
      });
    });

    it('should store decoded props for removeSelectedCompany', () => {
      const grantLeisureTokenStub = sinon.stub().returns(Promise.resolve(response));

      response = {
        'corporate.customerUserInformation.activeCompanyIdAssociations': [mockCompanies[0]]
      };
      const accountActions = proxyquire('src/shared/actions/accountActions', {
        'src/shared/api/oAuthApi': {
          grantLeisureToken: grantLeisureTokenStub
        },
        'src/shared/helpers/accountInfoHelper': {
          rememberOauthLoginSession: rememberOauthLoginSessionStub
        },
        'src/shared/helpers/loginSessionHelper': {
          shouldUseGatewayCookies: sinon.stub().returns(true)
        }
      });

      return store.dispatch(accountActions.removeSelectedCompany(mockCompanies[0])).then(() => {
        expect(rememberOauthLoginSessionStub).to.have.been.calledWith(expectedParams);
        expect(grantLeisureTokenStub).to.have.been.called;
      });
    });

    it('should not dispatch actions when id token is missing', () => {
      const transformUserInfoStub = sinon.stub(userInfoTransformer, 'transformUserInfo').returns({});

      store = mockStore({
        app: {
          toggles: {
            USE_API_GATEWAY_COOKIES: true
          },
          account: {
            isLoggedIn: true
          }
        }
      });
      sinon.stub(OAuthApi, 'fetchUserInfo');
      sinon.stub(LoginSessionHelper, 'shouldUseGatewayCookies').returns(true);
      OAuthApi.fetchUserInfo.returns(Promise.resolve({}));

      return store.dispatch(AccountActions.getUserInfo()).then(() => {
        expect(transformUserInfoStub).to.not.have.been.called;
        expect(store.getActions()).to.deep.equal([]);
      });
    });
  });

  describe('cleanUpEndOfSession', () => {
    beforeEach(() => {
      store.dispatch(AccountActions.cleanUpEndOfSession());
    });

    it('should trigger proper actions', () => {
      expect(store.getActions()).to.deep.equal([
        { accountInfo: null, type: ACCOUNT__SAVE_ACCOUNT_INFO },
        { isLoggedIn: false, type: ACCOUNT__SET_IS_LOGGED_IN },
        { isFetched: false, type: ACCOUNT__UPDATE_ACCOUNT_INFO_FETCHED },
        { corporateInfo: null, type: ACCOUNT__SAVE_CORPORATE_INFO },
        { type: 'CREDIT_CARD__RESET_SAVED_CREDIT_CARDS' },
        { type: 'CHASE__RESET_CHASE_TEMPORARY_CARD' },
        { type: 'CHASE__RESET_CHASE_APPLICATION_INFO' },
        { type: 'WCM__EXPIRE_HOME_NAV_MENU' },
        { type: 'RESET_FORM_DATA' },
        { type: 'AIR_BOOKING__CLEAR_SELECTED_FREQUENT_TRAVELERS' }
      ]);
    });

    it('should remove responsive stores', () => {
      expect(removeResponsiveStoresStub).to.have.been.called;
    });

    it('should remove responsive cookies', () => {
      expect(removeResponsiveCookiesStub).to.have.been.called;
    });
  });

  describe('getSalesforceGuid', () => {
    it('should trigger proper actions', () => {
      sinon.stub(SalesforceApi, 'getSalesforceGuid').returns(Promise.resolve({
        guidNumber: 'TEST_GUID'
      }));

      return store.dispatch(AccountActions.getSalesforceGuid()).then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: 'ACCOUNT__FETCH_SALESFORCE_GUID'
          },
          {
            salesforceGuid: 'TEST_GUID',
            type: 'ACCOUNT__GET_SALESFORCE_GUID'
          },
          {
            isFetching: false,
            type: 'ACCOUNT__FETCH_SALESFORCE_GUID_SUCCESS'
          }
        ]);
      });
    });
  });
});
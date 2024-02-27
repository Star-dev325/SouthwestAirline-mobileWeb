jest.mock('src/shared/actions/webViewActions', () => ({
  handleNativeLogout: jest.fn(),
  showNativeAppLogin: jest.fn().mockReturnValue({ type: 'WEB_VIEW__SEND_DISPLAY_LOGIN' })
}));
jest.mock('src/shared/selectors/priceSelectors', () => ({
  isPointsBooking: jest.fn().mockReturnValueOnce(false).mockReturnValue(true)
}));

import _ from 'lodash';
import * as ReLoginModalActions from 'src/login/actions/reLoginModalActions';
import createMockStore from 'test/unit/helpers/createMockStore';
import * as AccountActions from 'src/shared/actions/accountActions';
import * as LoginSessionHelper from 'src/shared/helpers/loginSessionHelper';
import ReLoginActionTypes from 'src/login/actions/reLoginActionTypes';
import * as HistoryHelper from 'src/shared/helpers/historyHelper';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import * as dialogActions from 'src/shared/actions/dialogActions';
import waitFor from 'test/unit/helpers/waitFor';

const { SHOW_RE_LOGIN_MODAL, HIDE_RE_LOGIN_MODAL, SET_RE_LOGIN_CALLBACK_FUNCTIONS, RETRY_FUNCTIONS } =
  ReLoginActionTypes;
const { SHARED__FORCE_HIDE_SPINNER } = SharedActionTypes;
const mockStore = createMockStore();

describe('ReLoginModalActions', () => {
  const expectedCleanupReLoginModalActions = [
    {
      type: HIDE_RE_LOGIN_MODAL
    },
    {
      type: 'fakeType'
    },
    {
      type: SHARED__FORCE_HIDE_SPINNER,
      pendingCallsCount: undefined
    },
    {
      reLoginCallbackFunctions: {},
      reLoginLocation: '/',
      type: SET_RE_LOGIN_CALLBACK_FUNCTIONS
    },
    {
      retryFunctions: [],
      type: RETRY_FUNCTIONS
    }
  ];
  const expectedClearSpinnerAndModalOptionsActions = [
    {
      type: SHARED__FORCE_HIDE_SPINNER,
      pendingCallsCount: 2
    },
    {
      reLoginCallbackFunctions: {},
      reLoginLocation: '/',
      type: SET_RE_LOGIN_CALLBACK_FUNCTIONS
    },
    {
      retryFunctions: [],
      type: RETRY_FUNCTIONS
    }
  ];
  let store;
  let addForbidUserClickBrowserBackMock;
  let cleanUpEndOfSessionMock;

  beforeAll(() => {
    addForbidUserClickBrowserBackMock = jest.spyOn(HistoryHelper, 'addForbidUserClickBrowserBack');
    cleanUpEndOfSessionMock = jest.spyOn(AccountActions, 'cleanUpEndOfSession').mockResolvedValue({});
  });

  beforeEach(() => {
    store = mockStore({ app: { account: { accountNumber: '123456789' } } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('showReLoginModal', () => {
    it('should not dispatch IS_RE_LOGIN_POINTS_BOOKING action when dollars selected', () => {
      const retryFunction = [_.noop, _.noop];
      const reLoginModalOptions = { hasCancelButton: true };
      const expectedActions = [
        {
          loginType: 'purchase',
          reLoginModalOptions,
          retryFunction,
          type: SHOW_RE_LOGIN_MODAL
        }
      ];

      store.dispatch(ReLoginModalActions.showReLoginModal(retryFunction, reLoginModalOptions));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch IS_RE_LOGIN_POINTS_BOOKING action when points selected', () => {
      const retryFunction = [_.noop, _.noop];
      const reLoginModalOptions = { hasCancelButton: true };
      const expectedActions = [
        {
          loginType: 'points',
          reLoginModalOptions,
          retryFunction,
          type: SHOW_RE_LOGIN_MODAL
        },
        {
          type: ReLoginActionTypes.IS_RE_LOGIN_POINTS_BOOKING
        }
      ];

      store.dispatch(ReLoginModalActions.showReLoginModal(retryFunction, reLoginModalOptions));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch showReLoginModal action', () => {
      const retryFunction = [_.noop, _.noop];
      const reLoginModalOptions = { hasCancelButton: true };
      const expectedActions = [
        {
          loginType: 'points',
          reLoginModalOptions,
          retryFunction,
          type: SHOW_RE_LOGIN_MODAL
        },
        {
          type: ReLoginActionTypes.IS_RE_LOGIN_POINTS_BOOKING
        }
      ];

      store.dispatch(ReLoginModalActions.showReLoginModal(retryFunction, reLoginModalOptions));

      expect(store.getActions()).toEqual(expectedActions);
      expect(addForbidUserClickBrowserBackMock).toHaveBeenCalled();
      expect(WebViewActions.showNativeAppLogin).not.toHaveBeenCalled();
    });

    describe('when no account number', () => {
      describe('when isAccountNumberEditable is true', () => {
        it('should dispatch showReLoginModal action', () => {
          store = mockStore({ app: { account: { accountNumber: '' } } });
          const retryFunction = [_.noop, _.noop];
          const reLoginModalOptions = { hasCancelButton: true, isAccountNumberEditable: true };
          const expectedActions = [
            {
              loginType: 'points',
              reLoginModalOptions,
              retryFunction,
              type: SHOW_RE_LOGIN_MODAL
            },
            {
              type: ReLoginActionTypes.IS_RE_LOGIN_POINTS_BOOKING
            }
          ];

          store.dispatch(ReLoginModalActions.showReLoginModal(retryFunction, reLoginModalOptions));

          expect(store.getActions()).toEqual(expectedActions);
          expect(addForbidUserClickBrowserBackMock).toHaveBeenCalled();
          expect(WebViewActions.showNativeAppLogin).not.toHaveBeenCalled();
        });
      });

      describe('when isAccountNumberEditable is false', () => {
        it('should dispatch showReLoginModal action', () => {
          const cleanUpEndOfSessionMock = jest
            .spyOn(AccountActions, 'cleanUpEndOfSession')
            .mockReturnValue({ type: 'fakeType' });

          const retryFunction = [_.noop, _.noop];
          const reLoginModalOptions = { isAccountNumberEditable: false };

          store = mockStore({ app: { account: { accountNumber: '' } } });
          store.dispatch(ReLoginModalActions.showReLoginModal(retryFunction, reLoginModalOptions));

          expect(store.getActions()).toEqual(expectedCleanupReLoginModalActions);
          expect(cleanUpEndOfSessionMock).toHaveBeenCalled();
        });
      });
    });

    it('should not add event listener if modal is active', () => {
      jest.spyOn(AccountActions, 'cleanUpEndOfSession').mockReturnValue({ type: 'fakeType' });

      store = mockStore({ app: { reLoginModal: { isActive: true } } });

      store.dispatch(ReLoginModalActions.showReLoginModal());

      expect(addForbidUserClickBrowserBackMock).not.toHaveBeenCalled();
    });

    it('should not show reLoginModal if account number is missing', () => {
      const cleanUpEndOfSessionMock = jest
        .spyOn(AccountActions, 'cleanUpEndOfSession')
        .mockReturnValue({ type: 'fakeType' });

      store = mockStore({});
      store.dispatch(ReLoginModalActions.showReLoginModal());

      expect(store.getActions()).toEqual([
        {
          type: HIDE_RE_LOGIN_MODAL
        },
        {
          type: 'fakeType'
        },
        {
          type: SHARED__FORCE_HIDE_SPINNER,
          pendingCallsCount: undefined
        },
        {
          reLoginCallbackFunctions: {},
          reLoginLocation: '/',
          type: SET_RE_LOGIN_CALLBACK_FUNCTIONS
        },
        {
          retryFunctions: [],
          type: RETRY_FUNCTIONS
        }
      ]);
      expect(cleanUpEndOfSessionMock).toHaveBeenCalled();
    });

    describe('when isWebView', () => {
      beforeEach(() => {
        store = mockStore({ app: { webView: { isWebView: true }, account: { accountNumber: '123456789' } } });
      });

      it('should showNativeAppLogin', () => {
        const retryFunction = [_.noop, _.noop];
        const reLoginModalOptions = { hasCancelButton: true };
        const expectedActions = [
          {
            type: 'WEB_VIEW__SEND_DISPLAY_LOGIN'
          },
          {
            loginType: 'points',
            reLoginModalOptions,
            retryFunction,
            type: RETRY_FUNCTIONS
          }
        ];

        store.dispatch(ReLoginModalActions.showReLoginModal(retryFunction, reLoginModalOptions));

        expect(WebViewActions.showNativeAppLogin).toHaveBeenCalled();
        expect(store.getActions()).toEqual(expectedActions);
      });

      it('should send logout message to native apps', (done) => {
        const cleanUpEndOfSessionMock = jest
          .spyOn(AccountActions, 'cleanUpEndOfSession')
          .mockReturnValue({ type: 'fakeType' });

        store.dispatch(ReLoginModalActions.hideSessionExpiredPopUpForCorporate());

        waitFor.untilAssertPass(() => {
          expect(cleanUpEndOfSessionMock).toHaveBeenCalled();
        }, done);
      });
    });

    describe('when corporate', () => {
      beforeEach(() => {
        jest.spyOn(dialogActions, 'showDialog').mockReturnValue({ type: 'fakeType' });
        jest.spyOn(LoginSessionHelper, 'hasCorporateToken').mockReturnValue(true);
      });

      it('should show session expired popup and not show reLoginModal', () => {
        store.dispatch(ReLoginModalActions.showReLoginModal());

        expect(store.getActions()).toEqual([{ type: 'fakeType' }]);
      });

      it('should hide session expired popup', () => {
        store.dispatch(ReLoginModalActions.hideSessionExpiredPopUpForCorporate());

        expect(store.getActions()).toEqual([
          {
            isShowDialog: false,
            options: undefined,
            type: 'TOGGLE_DIALOG'
          }
        ]);
      });
    });
  });

  it('should return true for handleBackButtonOnReLoginModal if modal is active', () => {
    store = mockStore({ app: { reLoginModal: { isActive: true } } });

    expect(store.dispatch(ReLoginModalActions.handleBackButtonOnReLoginModal())()).toBe(true);
  });

  it('should dispatch hideReLoginModal action', () => {
    store.dispatch(ReLoginModalActions.hideReLoginModal());

    expect(store.getActions()).toEqual([{ type: HIDE_RE_LOGIN_MODAL }]);
  });

  it('should dispatch setReLoginCallbackFunctions action', () => {
    const reLoginCallbackFunctions = { postLoginCallbackFn: _.noop };

    store.dispatch(ReLoginModalActions.setReLoginCallbackFunctions(reLoginCallbackFunctions));

    expect(store.getActions()).toEqual([
      { type: SET_RE_LOGIN_CALLBACK_FUNCTIONS, reLoginCallbackFunctions, reLoginLocation: '/' }
    ]);
  });

  it('should dispatch setRetryFunctions action', () => {
    const mockRetryFunctions = [_.noop, _.noop];

    store.dispatch(ReLoginModalActions.setRetryFunctions(mockRetryFunctions));

    expect(store.getActions()).toEqual([{ type: RETRY_FUNCTIONS, retryFunctions: mockRetryFunctions }]);
  });

  describe('when cleanupReLoginModal', () => {
    beforeAll(() => {
      cleanUpEndOfSessionMock = jest
        .spyOn(AccountActions, 'cleanUpEndOfSession')
        .mockClear()
        .mockReturnValue({ type: 'fakeType' });
    });

    it('should dispatch cleanupReLoginModal actions', () => {
      store.dispatch(ReLoginModalActions.cleanupReLoginModal());

      expect(store.getActions()).toEqual(expectedCleanupReLoginModalActions);
      expect(cleanUpEndOfSessionMock).toHaveBeenCalled();
    });

    it('should push to home page if shouldRedirectToHomePage is true', () => {
      store = mockStore({ app: { reLoginModal: { reLoginModalOptions: { shouldRedirectToHomePage: true } } } });
      store.dispatch(ReLoginModalActions.cleanupReLoginModal());

      expect(store.getActions()).toEqual([
        {
          type: HIDE_RE_LOGIN_MODAL
        },
        {
          type: 'fakeType'
        },
        {
          payload: {
            args: ['/'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        },
        {
          type: SHARED__FORCE_HIDE_SPINNER,
          pendingCallsCount: undefined
        },
        {
          reLoginCallbackFunctions: {},
          reLoginLocation: '/',
          type: SET_RE_LOGIN_CALLBACK_FUNCTIONS
        },
        {
          retryFunctions: [],
          type: RETRY_FUNCTIONS
        }
      ]);
      expect(cleanUpEndOfSessionMock).toHaveBeenCalled();
    });
  });

  describe('when clearSpinnerAndModalOptions', () => {
    it('should dispatch proper actions', () => {
      store = mockStore({ app: { reLoginModal: { retryFunctions: [_.noop, _.noop] } } });
      store.dispatch(ReLoginModalActions.clearSpinnerAndModalOptions());

      expect(store.getActions()).toEqual(expectedClearSpinnerAndModalOptionsActions);
    });
  });
});

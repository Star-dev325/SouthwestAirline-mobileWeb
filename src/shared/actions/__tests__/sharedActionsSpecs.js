import { sandbox } from 'sinon';
import AccessTokenExpiredError from 'src/shared/errors/accessTokenExpiredError';
import createMockStore from 'test/unit/helpers/createMockStore';
import FakeClock from 'test/unit/helpers/fakeClock';
import proxyquire from 'proxyquire';
import Q from 'q';
import SharedActionsTypes from 'src/shared/actions/sharedActionTypes';
import storeModule from 'store2';
import waitFor from 'test/unit/helpers/waitFor';
import * as AccountsApi from 'src/shared/api/accountsApi';
import * as AirportsActions from 'src/airports/actions/airportsActions';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import * as ContentDeliveryApi from 'src/shared/api/contentDeliveryApi';
import * as FeatureToggleActions from 'src/shared/featureToggle/featureToggleActions';
import * as SharedActions from 'src/shared/actions/sharedActions';
import * as BootstrapHelper from 'src/app/helpers/bootstrapHelper';
import * as ToggleTransformerHelper from 'src/shared/featureToggle/helpers/toggleTransformerHelper';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import WebViewActionTypes from 'src/shared/actions/webViewActionTypes';

const sinon = sandbox.create();
const mockStore = createMockStore();
const {
  SHARED__TRIGGER_ERROR_POP_UP,
  SHARED__SET_APP_READY,
  SHARED__UPDATE_LAST_BOOKABLE_DATE,
  SHARED__UPDATE_PRODUCT_DEFINITIONS,
  SHARED__ASYNC_ACTION_START,
  SHARED__ASYNC_ACTION_FINISH,
  SHARED__ASYNC_CHAIN_CONTINUE,
  SHARED__ASYNC_CHAIN_FINISH,
  SHARED__ASYNC_CHAIN_INIT_TIMER,
  SHARED__ASYNC_CHAIN_START,
  SHARED__HIDE_SPINNER_TEMPORARILY,
  SHARED__FORCE_HIDE_SPINNER,
  SHARED__ROUTE_CHANGED,
  SHARED__HIDE_ERROR_HEADER_MSG,
  SHARED__SHOW_ERROR_HEADER_MSG,
  SHARED__SAVE_RECENT_TRIP_SEARCH,
  SHARED__FETCH_RECENT_TRIP_SEARCHES_SUCCESS,
  SHARED__FETCH_RECENT_TRIP_SEARCHES,
  SHARED__FETCH_FEATURE_TOGGLES,
  SHARED__FETCH_FEATURE_TOGGLES_SUCCESS,
  SHARED__FETCH_FEATURE_TOGGLES_FAILED,
  SHARED__SAVE_APP_STATE,
  SHARED__SET_JOURNEY_BANNER_TOGGLE,
  SHARED__UPDATE_CALENDAR_SCHEDULE_MESSAGE,
  SHARED__SET_IS_REDIRECTING_PATH
} = SharedActionsTypes;
const { WEB_VIEW__SEND_EXIT } = WebViewActionTypes;

describe('SharedActions', () => {
  let store;
  let transformToTogglesStub;
  let getMwebTogglesStub;
  let mWebTogglesApiResponse;
  let toggleTransformerResponse;
  let fetchBootstrapDataResponse;
  let fetchBootstrapDataStub;
  let mWebTogglesApiResponseFailed;
  let SharedActionsStub;
  let updateTogglesStub;
  let mockedReduxStore;
  let dispatchStub;

  beforeEach(() => {
    mWebTogglesApiResponse = {
      success: true,
      errors: [],
      results: {
        sourceId: 'ty06eXQBJdp255RrGxkz',
        modDate: 1599761685273,
        applicationToggles: {
          enable: ['IsExclusivePromotionsHidden']
        },
        dataVersion: '1.0.0'
      }
    };

    mWebTogglesApiResponseFailed = {
      success: false,
      errors: []
    };

    fetchBootstrapDataResponse = {
      enable: ['IsExclusivePromotionsHidden']
    };

    toggleTransformerResponse = {
      AIRCRAFT_TYPE_FLIGHTSTATUS: false,
      AIRCRAFT_TYPE_VIEWRES: false,
      AIRCRAFT_TYPE_TRIPCARD: false,
      IsExclusivePromotionsHidden: true
    };

    store = mockStore({});
    dispatchStub = sinon.stub();
    mockedReduxStore = {
      store: {
        dispatch: dispatchStub
      }
    };

    transformToTogglesStub = sinon
      .stub(ToggleTransformerHelper, 'transformToToggles')
      .returns(toggleTransformerResponse);
    getMwebTogglesStub = sinon.stub(ContentDeliveryApi, 'getMwebToggles').returns(Q(mWebTogglesApiResponse));
    fetchBootstrapDataStub = sinon.stub(BootstrapHelper, 'fetchBootstrapData').returns(fetchBootstrapDataResponse);
    updateTogglesStub = sinon.stub(FeatureToggleActions, 'updateToggles');
    SharedActionsStub = proxyquire('src/shared/actions/sharedActions', {
      'src/shared/redux/createStore': mockedReduxStore,
      'src/app/helpers/bootstrapHelper': {
        fetchBootstrapData: fetchBootstrapDataStub
      },
      'src/shared/featureToggle/featureToggleActions': {
        updateToggles: updateTogglesStub
      },
      'src/shared/api/contentDeliveryApi': {
        getMwebToggles: getMwebTogglesStub
      },
      'src/shared/featureToggle/helpers/toggleTransformerHelper': {
        transformToToggles: transformToTogglesStub
      }
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should dispatch updateLastBookableDate', () => {
    store.dispatch(SharedActions.updateLastBookableDate('2020-08-12'));

    const actions = store.getActions();

    expect(actions).to.deep.equal([
      {
        type: SHARED__UPDATE_LAST_BOOKABLE_DATE,
        lastBookableDate: '2020-08-12'
      }
    ]);
  });

  it('should dispatch updateCalendarScheduleMessage', () => {
    store.dispatch(SharedActions.updateCalendarScheduleMessage('Calendar schedule message'));

    const actions = store.getActions();

    expect(actions).to.deep.equal([
      {
        type: SHARED__UPDATE_CALENDAR_SCHEDULE_MESSAGE,
        calendarScheduleMessage: 'Calendar schedule message'
      }
    ]);
  });

  it('should dispatch updateProductDefinitions', () => {
    store.dispatch(SharedActions.updateProductDefinitions({ product: 'definitions' }));

    const actions = store.getActions();

    expect(actions).to.deep.equal([
      {
        type: SHARED__UPDATE_PRODUCT_DEFINITIONS,
        productDefinitions: { product: 'definitions' }
      }
    ]);
  });

  it('should dispatch setIsRedirectingPath action', () => {
    store.dispatch(SharedActions.setIsRedirectingPath(true));

    const actions = store.getActions();

    expect(actions).to.deep.equal([
      {
        type: SHARED__SET_IS_REDIRECTING_PATH,
        isRedirectingPath: true
      }
    ]);
  });

  context('retrieve feature toggles', () => {
    it('should make api call to get feature toggles and return transformed toggles', () => 
      store.dispatch(SharedActionsStub.retrieveFeatureToggles()).then(() => {
        expect(getMwebTogglesStub).to.have.been.called;
        expect(fetchBootstrapDataStub).not.to.have.been.called;
        expect(transformToTogglesStub).to.have.been.calledWith(mWebTogglesApiResponse, 'results.applicationToggles.enable');
        expect(transformToTogglesStub).to.returned(toggleTransformerResponse);
        expect(updateTogglesStub).to.have.been.called;

        expect(store.getActions()).to.deep.equal([
          {
            type: SHARED__FETCH_FEATURE_TOGGLES
          },
          {
            type: SHARED__FETCH_FEATURE_TOGGLES_SUCCESS
          }
        ]);
      }));

    it('should send feature toggle failed action if getMwebTogglesStub fails', () => {
      getMwebTogglesStub.rejects();
      
      return store.dispatch(SharedActionsStub.retrieveFeatureToggles()).then(() => {
        expect(fetchBootstrapDataStub).to.have.been.called;
        expect(transformToTogglesStub).to.have.been.calledWith(fetchBootstrapDataResponse, 'enable');
        expect(updateTogglesStub).to.have.been.called;
        expect(store.getActions()).to.deep.equal([
          {
            type: SHARED__FETCH_FEATURE_TOGGLES
          },
          {
            type: SHARED__FETCH_FEATURE_TOGGLES_FAILED
          }
        ]);
      });
    });

    it('should send feature toggle failed action if getMwebTogglesStub failed with api error', () => {
      getMwebTogglesStub.resolves(mWebTogglesApiResponseFailed);

      return store.dispatch(SharedActionsStub.retrieveFeatureToggles()).then(() => {
        expect(fetchBootstrapDataStub).to.have.been.called;
        expect(transformToTogglesStub).to.have.been.calledWith(fetchBootstrapDataResponse, 'enable');
        expect(updateTogglesStub).to.have.been.called;
        expect(store.getActions()).to.deep.equal([
          {
            type: SHARED__FETCH_FEATURE_TOGGLES
          },
          {
            type: SHARED__FETCH_FEATURE_TOGGLES_FAILED
          }
        ]);
      });
    });
  });

  context('spinner', () => {
    it('should have asyncActionStart action in store after dispatch', () => {
      store.dispatch(SharedActions.asyncActionStart());

      expect(store.getActions()[0]).to.deep.equal({
        type: SHARED__ASYNC_ACTION_START,
        spinnerMessage: undefined
      });
    });

    it('should have asyncActionStart action and spinnerMessage in store after dispatch when spinnerMessage is specified', () => {
      store.dispatch(SharedActions.asyncActionStart('spinner message'));

      expect(store.getActions()[0]).to.deep.equal({
        type: SHARED__ASYNC_ACTION_START,
        spinnerMessage: 'spinner message'
      });
    });

    it('should have finish action in store after dispatch', () => {
      store.dispatch(SharedActions.asyncActionFinish());

      expect(store.getActions()[0]).to.deep.equal({ type: SHARED__ASYNC_ACTION_FINISH });
    });

    it('should create an async chain start action', () => {
      const mockChainMessageDuration = 5000;      
      const mockChainMessages = ['a', 'b'];

      expect(SharedActions.asyncChainStart(mockChainMessages, mockChainMessageDuration)).to.deep.equal({
        chainMessageDuration: mockChainMessageDuration,
        chainMessages: mockChainMessages,
        type: SHARED__ASYNC_CHAIN_START
      });
    });

    it('should create an async chain init timer action', () => {
      const mockAsyncChainTimerID = 1;

      expect(SharedActions.asyncChainInitTimer(mockAsyncChainTimerID)).to.deep.equal({
        asyncChainTimerID: mockAsyncChainTimerID,
        type: SHARED__ASYNC_CHAIN_INIT_TIMER
      });
    });

    it('should create an async chain continue action', () => {
      const mockAsyncChainTimerID = 1;

      expect(SharedActions.asyncChainContinue(mockAsyncChainTimerID)).to.deep.equal({
        asyncChainTimerID: mockAsyncChainTimerID,
        type: SHARED__ASYNC_CHAIN_CONTINUE
      });
    });

    it('should create an async chain finish action', () => {
      expect(SharedActions.asyncChainFinish()).to.deep.equal({ type: SHARED__ASYNC_CHAIN_FINISH });
    });

    it('should trigger temp hide action', () => {
      store.dispatch(SharedActions.hideSpinnerTemporarily());

      expect(store.getActions()).to.deep.equal([{ type: SHARED__HIDE_SPINNER_TEMPORARILY }]);
    });

    it('should trigger force hide action', () => {
      store.dispatch(SharedActions.forceHideSpinner(1));

      expect(store.getActions()).to.deep.equal([{ type: SHARED__FORCE_HIDE_SPINNER, pendingCallsCount: 1 }]);
    });
  });

  context('loadInitialData', () => {
    const error = new Error();
    const loadAirportsAction = { type: 'load-airports-action' };
    const retrieveApplicationPropertiesAction = { type: 'retrieve-applications-action' };
    const retrieveFooterContentAction = { type: 'retrieve-footer-content-action' };
    const setLocaleAction = { type: 'set-locale-action' };

    let retrieveFooterContentStub;

    beforeEach(() => {
      sinon.stub(AirportsActions, 'loadAirports').returns(loadAirportsAction);
      sinon.stub(WcmActions, 'retrieveApplicationProperties').returns(retrieveApplicationPropertiesAction);
      sinon.stub(AnalyticsActions, 'setLocale').returns(setLocaleAction);
      retrieveFooterContentStub = sinon.stub(WcmActions, 'retrieveFooterContent');
    });

    it('should call application properties and load initial actions', () => {
      retrieveFooterContentStub.returns(retrieveFooterContentAction);

      return store.dispatch(SharedActions.loadInitialData()).then(() => {
        expect(store.getActions()).to.deep.equal([
          loadAirportsAction,
          retrieveApplicationPropertiesAction,
          retrieveFooterContentAction,
          setLocaleAction,
          { type: SHARED__SET_APP_READY }
        ]);
      });
    });

    it('should set app ready if a dispatch returns an error', () => {
      retrieveFooterContentStub.returns(() => Promise.reject(error));

      return store.dispatch(SharedActions.loadInitialData()).then(() => {
        expect(store.getActions()).to.deep.equal([
          loadAirportsAction,
          retrieveApplicationPropertiesAction,
          setLocaleAction,
          { type: SHARED__SET_APP_READY }
        ]);
      });
    });
  });

  context('route changed', () => {
    it('should have route changed action in store after dispatch', () => {
      const location = {
        action: 'push',
        path: '/air/booking/shopping',
        pathname: '/air/booking/shopping'
      };
      const method = 'PUSH';

      store.dispatch(SharedActions.routeChanged(location, method));

      expect(store.getActions()[0]).to.deep.equal({ type: SHARED__ROUTE_CHANGED, location, method });
    });
  });

  context('error header msg', () => {
    it('should trigger errorHeaderAction hide when dispatch hideErrorHeaderMsg action', () => {
      store.dispatch(SharedActions.hideErrorHeaderMsg());

      expect(store.getActions()).to.deep.equal([{ type: SHARED__HIDE_ERROR_HEADER_MSG }]);
    });

    it('should trigger errorHeaderAction show when dispatch showErrorHeaderMsg action', () => {
      store.dispatch(SharedActions.showErrorHeaderMsg('errorMessage'));

      expect(store.getActions()).to.deep.equal([
        {
          type: SHARED__SHOW_ERROR_HEADER_MSG,
          errorHeader: { errorMessage: 'errorMessage', hasError: true }
        }
      ]);
    });
  });

  context('recent trip searches', () => {
    beforeEach(() => {
      FakeClock.setTimeTo('2018-08-08T10:00:00+00:00');
      sinon.stub(storeModule, 'get');
      sinon.stub(storeModule, 'set');
    });

    afterEach(() => {
      FakeClock.restore();
    });

    context('save recent trip search', () => {
      it('should save the recent trip search when nothing in local storage', () => {
        storeModule.get.returns(null);

        store.dispatch(
          SharedActions.saveRecentTripSearch('checkIn', {
            firstName: 'Tom',
            lastName: 'Jones',
            recordLocator: 'UNGJ23'
          })
        );
        expect(store.getActions()).to.deep.equal([{ type: SHARED__SAVE_RECENT_TRIP_SEARCH }]);
        expect(storeModule.set).to.be.calledWith('RecentTripSearchesStore::checkIn', {
          UNGJ23_TOM_JONES: {
            firstName: 'Tom',
            lastName: 'Jones',
            recordLocator: 'UNGJ23',
            timestamp: 1533722400
          }
        });
      });

      it('should save the recent trip search when there are already some data in local storage', () => {
        storeModule.get.returns({
          UH2GHW_ANDY_THOMAS: {
            firstName: 'Andy',
            lastName: 'Thomas',
            recordLocator: 'UH2GHW',
            timestamp: 1533722400
          }
        });

        store.dispatch(
          SharedActions.saveRecentTripSearch('checkIn', {
            firstName: 'Tom',
            lastName: 'Jones',
            recordLocator: 'UNGJ23'
          })
        );
        expect(store.getActions()).to.deep.equal([{ type: SHARED__SAVE_RECENT_TRIP_SEARCH }]);
        expect(storeModule.set).to.be.calledWith('RecentTripSearchesStore::checkIn', {
          UH2GHW_ANDY_THOMAS: {
            firstName: 'Andy',
            lastName: 'Thomas',
            recordLocator: 'UH2GHW',
            timestamp: 1533722400
          },
          UNGJ23_TOM_JONES: {
            firstName: 'Tom',
            lastName: 'Jones',
            recordLocator: 'UNGJ23',
            timestamp: 1533722400
          }
        });
      });

      it('should update the recent trip search when local storage have same PNR', () => {
        storeModule.get.returns({
          UNGJ23_TOM_JONES: {
            firstName: 'Tom',
            lastName: 'Jones',
            recordLocator: 'UNGJ23',
            timestamp: 1533636000
          }
        });

        store.dispatch(
          SharedActions.saveRecentTripSearch('checkIn', {
            firstName: 'Tom',
            lastName: 'Jones',
            recordLocator: 'UNGJ23'
          })
        );
        expect(store.getActions()).to.deep.equal([{ type: SHARED__SAVE_RECENT_TRIP_SEARCH }]);
        expect(storeModule.set).to.be.calledWith('RecentTripSearchesStore::checkIn', {
          UNGJ23_TOM_JONES: {
            firstName: 'Tom',
            lastName: 'Jones',
            recordLocator: 'UNGJ23',
            timestamp: 1533722400
          }
        });
      });

      it('should transform the record locator to upper case and name to capitalize', () => {
        storeModule.get.returns(null);

        store.dispatch(
          SharedActions.saveRecentTripSearch('checkIn', {
            firstName: 'tom',
            lastName: 'jones',
            recordLocator: 'UngJ23'
          })
        );
        expect(store.getActions()).to.deep.equal([{ type: SHARED__SAVE_RECENT_TRIP_SEARCH }]);
        expect(storeModule.set).to.be.calledWith('RecentTripSearchesStore::checkIn', {
          UNGJ23_TOM_JONES: {
            firstName: 'Tom',
            lastName: 'Jones',
            recordLocator: 'UNGJ23',
            timestamp: 1533722400
          }
        });
      });
    });

    context('fetch recent trip searches', () => {
      it('should get recent trip searches and sort by timestamp', async () => {
        storeModule.get.returns({
          UH2GHW_ANDY_THOMAS: {
            firstName: 'Andy',
            lastName: 'Thomas',
            recordLocator: 'UH2GHW',
            timestamp: 1533636000
          },
          UNGJ23_TOM_JONES: {
            firstName: 'Tom',
            lastName: 'Jones',
            recordLocator: 'UNGJ23',
            timestamp: 1533722400
          }
        });

        await store.dispatch(SharedActions.fetchRecentTripSearches('checkIn'));

        expect(store.getActions()).to.deep.equal([
          { type: SHARED__FETCH_RECENT_TRIP_SEARCHES },
          {
            type: SHARED__FETCH_RECENT_TRIP_SEARCHES_SUCCESS,
            payload: {
              featureName: 'checkIn',
              recentTripSearches: [
                {
                  firstName: 'Tom',
                  lastName: 'Jones',
                  recordLocator: 'UNGJ23'
                },
                {
                  firstName: 'Andy',
                  lastName: 'Thomas',
                  recordLocator: 'UH2GHW'
                }
              ]
            }
          }
        ]);
      });

      it('should filter expired search record', async () => {
        storeModule.get.returns({
          UH2GHW_ANDY_THOMAS: {
            firstName: 'Andy',
            lastName: 'Thomas',
            recordLocator: 'UH2GHW',
            timestamp: 1533340800
          },
          UNGJ23_TOM_JONES: {
            firstName: 'Tom',
            lastName: 'Jones',
            recordLocator: 'UNGJ23',
            timestamp: 1533722400
          }
        });

        await store.dispatch(SharedActions.fetchRecentTripSearches('checkIn'));

        expect(store.getActions()).to.deep.equal([
          { type: SHARED__FETCH_RECENT_TRIP_SEARCHES },
          {
            type: SHARED__FETCH_RECENT_TRIP_SEARCHES_SUCCESS,
            payload: {
              featureName: 'checkIn',
              recentTripSearches: [
                {
                  firstName: 'Tom',
                  lastName: 'Jones',
                  recordLocator: 'UNGJ23'
                }
              ]
            }
          }
        ]);
      });

      it('should save filtered search record back', async () => {
        storeModule.get.returns({
          UH2GHW_ANDY_THOMAS: {
            firstName: 'Andy',
            lastName: 'Thomas',
            recordLocator: 'UH2GHW',
            timestamp: 1533340800
          },
          UNGJ23_TOM_JONES: {
            firstName: 'Tom',
            lastName: 'Jones',
            recordLocator: 'UNGJ23',
            timestamp: 1533722400
          }
        });

        await store.dispatch(SharedActions.fetchRecentTripSearches('checkIn'));

        expect(storeModule.set).to.be.calledWith('RecentTripSearchesStore::checkIn', {
          UNGJ23_TOM_JONES: {
            firstName: 'Tom',
            lastName: 'Jones',
            recordLocator: 'UNGJ23',
            timestamp: 1533722400
          }
        });
      });
    });
  });

  context('show error pop up', () => {
    it('should trigger pop up  and dialog action when dispatch show error pop up action', async () => {
      const error = new AccessTokenExpiredError();

      await store.dispatch(SharedActions.showErrorPopUp(error));

      expect(store.getActions()[0]).to.deep.equal({
        popUpError: error,
        type: SHARED__TRIGGER_ERROR_POP_UP
      });
      expect(store.getActions()[1]).to.contain({
        isShowDialog: true,
        type: 'TOGGLE_DIALOG'
      });
      expect(store.getActions()[1].options).to.contain({
        active: true,
        name: 'global-error-popup',
        title: 'Your session has expired'
      });
    });

    it('should call hideDialog on close', (done) => {
      const error = new AccessTokenExpiredError();

      store.dispatch(SharedActions.showErrorPopUp(error));
      store.getActions()[1].options.buttons[0].onClick();

      waitFor.untilAssertPass(() => {
        expect(store.getActions()[2]).to.contain({
          isShowDialog: false,
          type: 'TOGGLE_DIALOG'
        });
      }, done);
    });

    it('should redirect the user to the home page', async () => {
      await store.dispatch(SharedActions.onClosePopUp(true));

      expect(store.getActions()).to.deep.equal([
        { isShowDialog: false, options: undefined, type: 'TOGGLE_DIALOG' },
        { payload: { args: ['/'], method: 'push' }, type: '@@router/CALL_HISTORY_METHOD' }
      ]);
    });

    it('should not redirect the user to the home page', async () => {
      await store.dispatch(SharedActions.onClosePopUp(false));

      expect(store.getActions()).to.deep.equal([
        { isShowDialog: false, options: undefined, type: 'TOGGLE_DIALOG' }
      ]);
    });

    it('should dispatch exitWebView if it is in webView', async () => {
      const localStore = mockStore({ app: { webView: { isWebView: true } } });

      await localStore.dispatch(SharedActions.onClosePopUp(true));

      expect(localStore.getActions()).to.deep.equal([
        { isShowDialog: false, options: undefined, type: 'TOGGLE_DIALOG' },
        { route: '', type: WEB_VIEW__SEND_EXIT }
      ]);
    });
  });

  context('fetchUpcomingTripsNonBlocking', () => {
    let getUpcomingTripsStub;

    beforeEach(() => {
      getUpcomingTripsStub = sinon.stub(AccountsApi, 'getUpcomingTrips');
    });

    it('should not trigger spinner action when AccountsApi.getUpcomingTrips API is success', async () => {
      getUpcomingTripsStub.resolves('response');
      await store.dispatch(SharedActions.fetchUpcomingTripsNonBlocking());
      expect(store.getActions()).to.deep.equal([
        {
          type: 'SHARED__FETCH_UPCOMING_TRIPS'
        },
        {
          type: 'SHARED__FETCH_UPCOMING_TRIPS_SUCCESS',
          response: 'response'
        }
      ]);
    });

    it('should not trigger spinner action when AccountsApi.getUpcomingTrips API fails', async () => {
      getUpcomingTripsStub.rejects({ error: 'error' });
      await store.dispatch(SharedActions.fetchUpcomingTripsNonBlocking());
      expect(store.getActions()).to.deep.equal([
        {
          type: 'SHARED__FETCH_UPCOMING_TRIPS'
        },
        {
          type: 'SHARED__FETCH_UPCOMING_TRIPS_FAILED'
        }
      ]);
    });

    it('should not play error popup when AccountsApi.getUpcomingTrips API fails', async () => {
      getUpcomingTripsStub.rejects({ error: 'error' });
      await store.dispatch(SharedActions.fetchUpcomingTripsNonBlocking());
      expect(store.getActions()).to.not.contain({
        isShowDialog: true,
        type: 'TOGGLE_DIALOG'
      });
    });
  });

  it('should dispatch saveAppState', () => {
    const state = { app: { key: 'value' } };

    store.dispatch(SharedActions.saveAppState(state));

    expect(store.getActions()).to.deep.equal([
      {
        type: SHARED__SAVE_APP_STATE,
        state
      }
    ]);
  });

  it('should dispatch setJourneyBannerToggle', () => {
    store.dispatch(SharedActions.setJourneyBannerToggle(true));

    expect(store.getActions()).to.deep.equal([
      {
        type: SHARED__SET_JOURNEY_BANNER_TOGGLE,
        payload: true
      }
    ]);
  });
});

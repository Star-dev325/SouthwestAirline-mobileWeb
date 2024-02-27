import store2 from 'store2';
import sinonModule from 'sinon';
import * as HistoryActions from 'src/shared/actions/historyActions';
import createMockStore from 'test/unit/helpers/createMockStore';
import historyActionTypes from 'src/shared/actions/historyActionTypes';
import * as HistoryHelper from 'src/shared/helpers/historyHelper';
import StorageKeys from 'src/shared/helpers/storageKeys';

const { PERSISTENT_HISTORY_KEY } = StorageKeys;
const sinon = sinonModule.sandbox.create();
const mockStore = createMockStore();

describe('HistoryActions', () => {
  let store;
  let getUpdatedRouteStateStub;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create HISTORY__SAVE_CHANGE when route change', () => {
    const mockRouteState = {
      pathname: '/url',
      action: 'push'
    };

    sinon.stub(store2, 'session');
    store = mockStore(() => ({
      persistentHistory: [mockRouteState]
    }));
    getUpdatedRouteStateStub = sinon.stub(HistoryHelper, 'getUpdatedRouteState').returns(mockRouteState);
    store.dispatch(HistoryActions.saveHistoryChange(mockRouteState));

    expect(store.getActions()).to.be.deep.equal([
      {
        type: historyActionTypes.HISTORY__SAVE_CHANGE,
        payload: {
          routeState: mockRouteState
        }
      }
    ]);
    expect(getUpdatedRouteStateStub).to.have.been.calledWith([mockRouteState], mockRouteState);
    expect(store2.session.withArgs(PERSISTENT_HISTORY_KEY, [mockRouteState])).to.have.been.called;
  });

  it('should create HISTORY__ADD_FORCE_REDIRECT when route change is back or forward and is out of white list', () => {
    const mockRouteState = {
      pathname: '/url',
      action: 'pop'
    };
    const mockPersistentHistory = [{ action: null, pathname: '/url1' }];

    sinon.stub(store2, 'session');
    store = mockStore(() => ({
      persistentHistory: mockPersistentHistory
    }));
    store.dispatch(HistoryActions.saveHistoryChange(mockRouteState));

    expect(store.getActions()).to.be.deep.equal([
      {
        type: historyActionTypes.HISTORY__SAVE_CHANGE,
        payload: {
          routeState: mockRouteState
        }
      },
      {
        type: historyActionTypes.HISTORY__ADD_FORCE_REDIRECT,
        payload: {
          pathname: '/url1'
        }
      }
    ]);
    expect(store2.session.withArgs(PERSISTENT_HISTORY_KEY, mockPersistentHistory)).to.have.been.called;
  });

  it('should set backFrom when route change is back', () => {
    const mockRouteState = {
      pathname: '/',
      search: '',
      hash: '',
      key: 'vc4iij',
      state: undefined,
      action: 'pop'
    };
    const mockPersistentHistory = [
      {
        pathname: '/',
        search: '',
        hash: '',
        key: 'vc4iij',
        action: null
      },
      {
        pathname: '/air/booking/shopping',
        search: '',
        hash: '',
        key: 'r8j8ab',
        action: 'push'
      }
    ];

    sinon.stub(store2, 'session');
    store = mockStore(() => ({
      persistentHistory: mockPersistentHistory
    }));
    store.dispatch(HistoryActions.saveHistoryChange(mockRouteState));

    expect(store.getActions()).to.be.deep.equal([
      {
        type: historyActionTypes.HISTORY__SAVE_CHANGE,
        payload: {
          routeState: {
            ...mockRouteState,
            backFrom: {
              pathname: '/air/booking/shopping'
            }
          }
        }
      }
    ]);
    expect(store2.session.withArgs(PERSISTENT_HISTORY_KEY, mockPersistentHistory)).to.have.been.called;
  });

  it('should create HISTORY__ADD_FORCE_REDIRECT when force redirect', () => {
    const mockRedirectPath = '/redirect';

    sinon.stub(store2, 'session');
    store = mockStore(() => ({
      persistentHistory: []
    }));
    store.dispatch(HistoryActions.addHistoryForceRedirect(mockRedirectPath));

    expect(store.getActions()).to.be.deep.equal([
      {
        type: historyActionTypes.HISTORY__ADD_FORCE_REDIRECT,
        payload: {
          pathname: mockRedirectPath
        }
      }
    ]);
    expect(store2.session.withArgs(PERSISTENT_HISTORY_KEY, [])).to.have.been.called;
  });

  it('should create HISTORY__ADD_BACK_HOME when force back to home', () => {
    sinon.stub(store2, 'session');
    store = mockStore(() => ({
      persistentHistory: []
    }));
    store.dispatch(HistoryActions.addHistoryBackToHome(true));

    expect(store.getActions()).to.be.deep.equal([
      {
        type: historyActionTypes.HISTORY__ADD_BACK_HOME,
        payload: {
          forceBackToHome: true
        }
      }
    ]);
    expect(store2.session.withArgs(PERSISTENT_HISTORY_KEY, [])).to.have.been.called;
  });

  it('should create action and update all history', () => {
    sinon.stub(store2, 'session');
    const mockLocation = {
      pathname: '/url',
      action: 'push'
    };

    expect(HistoryActions.updateAllHistory([mockLocation])).to.be.deep.equal({
      type: historyActionTypes.HISTORY__UPDATE_ALL,
      payload: {
        persistentHistory: [mockLocation]
      }
    });
    expect(store2.session.withArgs(PERSISTENT_HISTORY_KEY, [mockLocation])).to.have.been.called;
  });

  it('should create action and clean history in session storage when clean all history', () => {
    sinon.stub(store2, 'session');

    expect(HistoryActions.cleanAllHistory()).to.be.deep.equal({
      type: historyActionTypes.HISTORY__CLEAR_ALL
    });
    expect(store2.session.withArgs(PERSISTENT_HISTORY_KEY, [])).to.have.been.called;
  });
});

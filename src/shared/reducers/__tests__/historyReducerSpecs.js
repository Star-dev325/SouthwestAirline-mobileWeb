import store2 from 'store2';
import sinonModule from 'sinon';
import { persistentHistory } from 'src/shared/reducers/historyReducer';
import historyActionTypes from 'src/shared/actions/historyActionTypes';
import StorageKeys from 'src/shared/helpers/storageKeys';
import { LOCATION_CHANGE } from 'connected-react-router';
import * as HistoryHelper from 'src/shared/helpers/historyHelper';

const sinon = sinonModule.sandbox.create();

const {
  HISTORY__SAVE_CHANGE,
  HISTORY__CLEAR_ALL,
  HISTORY__UPDATE_ALL,
  HISTORY__ADD_FORCE_REDIRECT,
  HISTORY__ADD_BACK_HOME
} = historyActionTypes;

describe('persistentHistory', () => {
  let sessionStub;
  let updateHistoryStub;
  let getUpdatedRouteStateStub;

  beforeEach(() => {
    sessionStub = sinon.stub(store2, 'session');
    getUpdatedRouteStateStub = sinon.stub(HistoryHelper, 'getUpdatedRouteState');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return payload history when location change', () => {
    const mockRouteState = {
      pathname: '/url',
      action: 'push'
    };
    const mockAction = {
      type: LOCATION_CHANGE,
      payload: {
        location: {
          pathname: '/url'
        },
        action: 'PUSH'
      }
    };

    getUpdatedRouteStateStub.returns(mockRouteState);
    updateHistoryStub = sinon.stub(HistoryHelper, 'updateHistory').returns([mockRouteState]);

    expect(persistentHistory([], mockAction)).to.be.deep.equal([mockRouteState]);
    expect(getUpdatedRouteStateStub).to.have.been.calledWith([], { pathname: '/url', action: 'push' });
    expect(updateHistoryStub).to.have.been.calledWith([], mockRouteState);
    expect(sessionStub).to.have.been.calledWith(StorageKeys.PERSISTENT_HISTORY_KEY, [mockRouteState]);
  });

  it('should return payload history when route change', () => {
    const mockRouteState = {
      pathname: '/url',
      aciton: 'push'
    };
    const mockAction = {
      type: HISTORY__SAVE_CHANGE,
      payload: {
        routeState: mockRouteState
      }
    };

    expect(persistentHistory([], mockAction)).to.be.deep.equal([mockRouteState]);
  });

  it('should return empty array when clean all history', () => {
    const mockAction = {
      type: HISTORY__CLEAR_ALL
    };

    expect(persistentHistory([], mockAction)).to.be.deep.equal([]);
  });

  it('should return udpated persistentHistory when update all history', () => {
    const mockHistory = [{ pathname: '/url1', action: 'push' }];
    const mockAction = {
      type: HISTORY__UPDATE_ALL,
      payload: {
        persistentHistory: mockHistory
      }
    };

    expect(persistentHistory([{ pathname: '/url', action: null }], mockAction)).to.be.deep.equal(mockHistory);
  });

  it('should return updated persistentHistory when add force redirect', () => {
    const mockHistory = [{ pathname: '/url', action: 'push' }];
    const mockAction = {
      type: HISTORY__ADD_FORCE_REDIRECT,
      payload: {
        pathname: '/redirectUrl'
      }
    };

    expect(persistentHistory(mockHistory, mockAction)).to.be.deep.equal([
      { pathname: '/url', action: 'push', forceRedirect: '/redirectUrl' }
    ]);
  });

  it('should return updated persistentHistory when add force back to home', () => {
    const mockHistory = [{ pathname: '/url', action: 'push' }];
    const mockAction = {
      type: HISTORY__ADD_BACK_HOME,
      payload: {
        forceBackToHome: true
      }
    };

    expect(persistentHistory(mockHistory, mockAction)).to.be.deep.equal([
      { pathname: '/url', action: 'push', forceBackToHome: true }
    ]);
  });

  it('should return default state when action is undefined', () => {
    expect(persistentHistory()).to.deep.equal([]);
  });
});

import proxyquire from 'proxyquire';
import sinonModule from 'sinon';

const sinon = sinonModule.sandbox.create();

describe('historyHelper', () => {
  let historyHelper;
  let addEventListenerStub;
  let removeEventListenerStub;
  let backStub;
  let forwardStub;
  let setIsBrowserBackStub;
  let setLastPopedStateStub;

  beforeEach(() => {
    addEventListenerStub = sinon.stub();
    removeEventListenerStub = sinon.stub();
    backStub = sinon.stub();
    forwardStub = sinon.stub();
    setIsBrowserBackStub = sinon.stub();
    setLastPopedStateStub = sinon.stub();
    historyHelper = proxyquire('src/shared/helpers/historyHelper', {
      'src/shared/helpers/browserObject': {
        default: {
          window: {
            addEventListener: addEventListenerStub,
            removeEventListener: removeEventListenerStub
          }
        }
      },
      'src/appHistory': {
        history: {
          goBack: backStub,
          goForward: forwardStub
        }
      },
      'src/shared/stores/routerStore': {
        default: {
          setIsBrowserBack: setIsBrowserBackStub,
          setLastPopedState: setLastPopedStateStub
        }
      }
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('forbid browser back', () => {
    it('should trigger history back when condition is return true', () => {
      const forceBackListener = historyHelper.addForbidUserClickBrowserForward(() => true);

      expect(addEventListenerStub).to.have.been.calledWith('popstate');
      forceBackListener();
      expect(backStub).to.have.been.called;
    });

    it('should not trigger history back when condition is return false', () => {
      const forceBackListener = historyHelper.addForbidUserClickBrowserForward(() => false);

      expect(addEventListenerStub).to.have.been.calledWith('popstate');
      forceBackListener();
      expect(backStub).to.have.not.been.called;
    });

    it('should remove forceBackListener when remove back listener', () => {
      const forceBackListener = historyHelper.addForbidUserClickBrowserForward(() => true);

      historyHelper.removeForbidUserClickBrowserBack();
      expect(addEventListenerStub).to.have.been.calledWith('popstate', forceBackListener);
    });
  });

  context('forbid browser forward', () => {
    it('should trigger history forward when condition is return true', () => {
      const forceForwardListener = historyHelper.addForbidUserClickBrowserBack(() => true);

      expect(addEventListenerStub).to.have.been.calledWith('popstate');
      forceForwardListener();
      expect(forwardStub).to.have.been.called;
    });

    it('should not trigger history forward when condition is return false', () => {
      const forceForwardListener = historyHelper.addForbidUserClickBrowserBack(() => false);

      expect(addEventListenerStub).to.have.been.calledWith('popstate');
      forceForwardListener();
      expect(forwardStub).to.have.not.been.called;
    });

    it('should remove forceForwardListener when remove forward listener', () => {
      const forceForwardListener = historyHelper.addForbidUserClickBrowserBack(() => true);

      historyHelper.removeForbidUserClickBrowserForward(forceForwardListener);
      expect(addEventListenerStub).to.have.been.calledWith('popstate', forceForwardListener);
    });
  });

  context('updateHistory', () => {
    it('should return maxium 50 histories when it exceeded 50', () => {
      const persistentHistory = new Array(50).fill({ pathname: '/url' });

      expect(historyHelper.updateHistory(persistentHistory, { pathname: '/url2', action: 'push' })).to.have.lengthOf(
        50
      );
    });

    it('should return updated history when refresh', () => {
      const persistentHistory = [
        {
          pathname: '/air/booking',
          action: 'push'
        }
      ];
      const nextRouteState = {
        pathname: '/air/booking',
        action: null
      };

      expect(historyHelper.updateHistory(persistentHistory, nextRouteState)).to.be.deep.equal([nextRouteState]);
    });

    it('should return updated history when browser back', () => {
      const persistentHistory = [
        {
          pathname: '/air/booking',
          action: 'push',
          key: 'testkey'
        },
        {
          pathname: '/air/booking/recent',
          action: 'push'
        }
      ];
      const nextRouteState = {
        pathname: '/air/booking',
        action: 'pop',
        key: 'testkey',
        forceRedirect: 'redirectUrl',
        forceBackToHome: true
      };

      expect(historyHelper.updateHistory(persistentHistory, nextRouteState)).to.be.deep.equal([nextRouteState]);
    });

    it('should return updated history when normal transition', () => {
      const persistentHistory = [
        {
          pathname: '/air/booking',
          action: null
        }
      ];
      const nextRouteState = {
        pathname: '/air/booking/recent',
        action: 'push'
      };

      expect(historyHelper.updateHistory(persistentHistory, nextRouteState)).to.be.deep.equal(
        persistentHistory.concat(nextRouteState)
      );
    });

    it('should same history when back or forward to current page', () => {
      const persistentHistory = [
        {
          pathname: '/air/booking',
          action: null
        }
      ];
      const nextRouteState = {
        pathname: '/air/booking',
        action: 'pop'
      };

      expect(historyHelper.updateHistory(persistentHistory, nextRouteState)).to.be.deep.equal(persistentHistory);
    });
  });

  context('getUpdatedRouteState', () => {
    it('should return correct updated route state', () => {
      const mockPersistentHistoryState = [];
      const mockNextRouteState = {
        location: {
          pathname: '/path'
        },
        action: 'push'
      };
      const result = historyHelper.getUpdatedRouteState(mockPersistentHistoryState, mockNextRouteState);

      expect(result).to.deep.equal(mockNextRouteState);
      expect(setIsBrowserBackStub).to.have.been.calledWith(false);
      expect(setLastPopedStateStub).to.have.been.calledWith(undefined);
    });

    it('should return correct updated route state when browser back', () => {
      const mockPersistentHistoryState = [
        {
          pathname: '/air/booking',
          action: 'push',
          key: 'testkey'
        },
        {
          pathname: '/air/booking/recent',
          action: 'push'
        }
      ];
      const mockNextRouteState = {
        pathname: '/air/booking',
        action: 'pop',
        key: 'testkey'
      };
      const expectedResult = {
        action: 'pop',
        backFrom: {
          pathname: '/air/booking/recent'
        },
        key: 'testkey',
        pathname: '/air/booking'
      };
      const result = historyHelper.getUpdatedRouteState(mockPersistentHistoryState, mockNextRouteState);

      expect(result).to.deep.equal(expectedResult);
      expect(setIsBrowserBackStub).to.have.been.calledWith(true);
      expect(setLastPopedStateStub).to.have.been.calledWith(mockPersistentHistoryState[1]);
    });
  });
});

import { sandbox } from 'sinon';

import { LOCATION_CHANGE } from 'connected-react-router';
import * as HistoryActions from 'src/shared/actions/historyActions';
import historyActionTypes from 'src/shared/actions/historyActionTypes';
import {
  didLeaveCorporateFlow,
  forceRedirectHelper,
  isAddingForceRedirect,
  isBrowserRefreshAndOutOfWhiteList,
  isFlowPath,
  isFlowPathByLocationChange,
  isFlowPathWithToggleOn,
  isMatchPath,
  isMatchPathAndPathChanged,
  isMatchPathAndSearch,
  isMatchPathAndSearchByHistory,
  isMatchPathBeforeLocationChange,
  isMatchPathBeforeRouteSaved,
  isMatchPathByHistory,
  isMatchSearch,
  isMatchSearchByHistory,
  isPagePathByLocationChange,
  isPagePathByLocationOrHistoryChange,
  isRouteChange,
  isTransitionWithForceRedirect
} from 'src/shared/helpers/interceptorHelpers';
import * as routeStateHelper from 'src/shared/routeUtils/routeStateHelper';
import store2 from 'store2';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';

const sinon = sandbox.create();

describe('interceptorHelpers', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('isBrowserRefreshAndOutOfWhiteList', () => {
    it('should return true when it is browser refresh and out of refresh white list', () => {
      const mockAction = {
        type: historyActionTypes.HISTORY__SAVE_CHANGE,
        payload: {
          routeState: {
            action: null
          }
        }
      };

      expect(isBrowserRefreshAndOutOfWhiteList({ action: mockAction })).to.be.true;
    });

    it('should return false when it is browser refresh but in refresh white list', () => {
      const mockAction = {
        type: historyActionTypes.HISTORY__SAVE_CHANGE,
        payload: {
          routeState: {
            action: 'pop',
            pathname: '/air/change'
          }
        }
      };

      expect(isBrowserRefreshAndOutOfWhiteList({ action: mockAction })).to.be.false;
    });

    it('should return false when it is not browser refresh', () => {
      const mockAction = {
        type: historyActionTypes.HISTORY__SAVE_CHANGE,
        payload: {
          routeState: {
            action: 'pop'
          }
        }
      };

      expect(isBrowserRefreshAndOutOfWhiteList({ action: mockAction })).to.be.false;
    });
  });

  context('isTransitionWithForceRedirect', () => {
    it('should return true when it is transition with forceRedirect', () => {
      const mockPersistentHistory = [
        {
          forceRedirect: '/redirect-pathname'
        }
      ];
      const mockStore = {
        getState() {
          return { persistentHistory: mockPersistentHistory };
        }
      };
      const mockAction = {
        type: LOCATION_CHANGE,
        payload: {
          action: 'POP'
        }
      };

      expect(isTransitionWithForceRedirect({ action: mockAction, store: mockStore })).to.be.true;
    });

    it('should return false when it is transition without forceRedirect', () => {
      const mockPersistentHistory = [
        {
          pathname: '/url1'
        },
        {
          pathname: '/url'
        }
      ];
      const mockStore = {
        getState() {
          return { persistentHistory: mockPersistentHistory };
        }
      };
      const mockAction = {
        type: LOCATION_CHANGE,
        payload: {
          action: 'POP'
        }
      };

      expect(isTransitionWithForceRedirect({ action: mockAction, store: mockStore })).to.be.false;
    });
  });

  context('isAddingForceRedirect', () => {
    it('should return true when it is HISTORY__ADD_FORCE_REDIRECT action', () => {
      const mockAction = {
        type: historyActionTypes.HISTORY__ADD_FORCE_REDIRECT
      };

      expect(isAddingForceRedirect({ action: mockAction })).to.be.true;
    });

    it('should return false when it is not HISTORY__ADD_FORCE_REDIRECT action', () => {
      const mockAction = {
        type: LOCATION_CHANGE
      };

      expect(isAddingForceRedirect({ action: mockAction })).to.be.false;
    });
  });

  context('isFlowPath', () => {
    it('should return true when it is flow path when action is SHARED__ROUTE_CHANGED', () => {
      const action = {
        type: 'SHARED__ROUTE_CHANGED',
        location: { pathname: '/car/cancel/some-path' },
        method: 'push'
      };

      const result = isFlowPath('/car/cancel')({ action });

      expect(result).to.be.true;
    });

    it('should return false when it is not flow path', () => {
      const action = {
        type: 'SHARED__ROUTE_CHANGED',
        location: { pathname: '/air/booking/some-path' },
        method: 'push'
      };

      const result = isFlowPath('/car/cancel')({ action });

      expect(result).to.be.false;
    });
  });

  context('isRouteChange', () => {
    it('should return true when action is SHARED__ROUTE_CHANGED', () => {
      const action = { type: 'SHARED__ROUTE_CHANGED' };

      expect(isRouteChange({ action })).to.be.true;
    });

    it('should return false when action is not SHARED__ROUTE_CHANGED', () => {
      const action = { type: 'invalid-action' };

      expect(isRouteChange({ action })).to.be.false;
    });
  });

  describe('didLeaveCorporateFlow', () => {
    it('should return false when an action is not a route change', () => {
      const action = { type: 'NOT_A_ROUTE_CHANGE' };

      expect(didLeaveCorporateFlow({ action })).to.be.false;
    });

    it('should return false if the previous flow was not a corporate flow', () => {
      const action = {
        type: 'SHARED__ROUTE_CHANGED',
        location: {
          pathname: '/also/not/corporate'
        }
      };
      const store = { getState: sinon.stub().returns({}) };

      sinon.stub(routeStateHelper, 'getPrevRouteState').returns({
        pathname: '/not/corporate'
      });

      expect(didLeaveCorporateFlow({ action, store })).to.be.false;
    });

    it('should return false if the previous flow was corporate and the new flow is as well', () => {
      const action = {
        type: 'SHARED__ROUTE_CHANGED',
        location: {
          pathname: '/air/booking'
        }
      };
      const store = { getState: sinon.stub().returns({}) };

      sinon.stub(routeStateHelper, 'getPrevRouteState').returns({
        pathname: '/air/booking'
      });

      expect(didLeaveCorporateFlow({ action, store })).to.be.false;
    });

    it("should return false if leaving a flow that can be corporate but scope isn't swabiz", () => {
      const action = {
        type: 'SHARED__ROUTE_CHANGED',
        location: {
          pathname: '/'
        }
      };
      const store = { getState: sinon.stub().returns({}) };

      sinon.stub(routeStateHelper, 'getPrevRouteState').returns({
        pathname: '/air/booking'
      });
      sinon.stub(store2, 'get').returns({ scope: 'ecom' });

      expect(didLeaveCorporateFlow({ action, store })).to.be.false;
    });

    it('should return true if leaving a corporate flow', () => {
      const action = {
        type: 'SHARED__ROUTE_CHANGED',
        location: {
          pathname: '/'
        }
      };
      const store = { getState: sinon.stub().returns({}) };

      sinon.stub(routeStateHelper, 'getPrevRouteState').returns({
        pathname: '/air/booking'
      });
      sinon.stub(store2, 'get').returns({ scope: 'swabiz' });

      expect(didLeaveCorporateFlow({ action, store })).to.be.true;
    });
  });

  context('isFlowPathWithToggleOn', () => {
    it('should return true when given action type is SHARED__ROUTE_CHANGED and pathname matches flow path and toggle is on', () => {
      const action = {
        type: 'SHARED__ROUTE_CHANGED',
        location: { pathname: '/flow-path/fake-page-path' },
        method: 'push'
      };
      const store = {
        getState: () => ({
          app: {
            toggles: {
              fakeToggle: true
            }
          }
        })
      };

      const result = isFlowPathWithToggleOn('/flow-path', 'fakeToggle')({ action, store });

      expect(result).to.be.true;
    });

    it('should return true when given action type is SHARED__ROUTE_CHANGED and pathname matches flow path and toggle is off', () => {
      const action = {
        type: 'SHARED__ROUTE_CHANGED',
        location: { pathname: '/flow-path/fake-page-path' },
        method: 'push'
      };
      const store = {
        getState: () => ({
          app: {
            toggles: {
              fakeToggle: false
            }
          }
        })
      };

      const result = isFlowPathWithToggleOn('/flow-path', 'fakeToggle')({ action, store });

      expect(result).to.be.false;
    });

    it('should return true when given action type is SHARED__ROUTE_CHANGED and pathname does not match flow path and toggle is on', () => {
      const action = {
        type: 'SHARED__ROUTE_CHANGED',
        location: { pathname: '/flow-path/fake-page-path' },
        method: 'push'
      };
      const store = {
        getState: () => ({
          app: {
            toggles: {
              fakeToggle: true
            }
          }
        })
      };

      const result = isFlowPathWithToggleOn('/unmatched-flow-path', 'fakeToggle')({ action, store });

      expect(result).to.be.false;
    });

    it('should return default true when there has not toggles', () => {
      const action = {
        type: 'SHARED__ROUTE_CHANGED',
        location: { pathname: '/flow-path/fake-page-path' },
        method: 'push'
      };
      const store = {
        getState: () => ({
          app: {}
        })
      };

      const result = isFlowPathWithToggleOn('/flow-path', 'fakeToggle')({ action, store });

      expect(result).to.be.true;
    });
  });

  context('isFlowPathByLocationChange', () => {
    it('should return true when it is flow path when action is LOCATION_CHANGE', () => {
      const action = {
        type: LOCATION_CHANGE,
        payload: {
          location: {
            pathname: '/view-reservation'
          }
        }
      };

      const result = isFlowPathByLocationChange('/view-reservation')({ action });

      expect(result).to.be.true;
    });

    it('should return false when it is not flow path', () => {
      const action = {
        type: LOCATION_CHANGE,
        payload: {
          location: {
            pathname: '/air/booking/some-path'
          }
        }
      };

      const result = isFlowPathByLocationChange('/car/cancel')({ action });

      expect(result).to.be.false;
    });
  });

  context('isPagePathByLocationChange', () => {
    it('should return true if the paths are same', () => {
      const action = {
        type: LOCATION_CHANGE,
        payload: {
          location: {
            pathname: '/pathname'
          }
        }
      };

      const result = isPagePathByLocationChange('/pathname')({ action });

      expect(result).to.be.true;
    });

    it('should return false if the paths are same', () => {
      const action = {
        type: LOCATION_CHANGE,
        payload: {
          location: {
            pathname: '/pathname'
          }
        }
      };

      const result = isPagePathByLocationChange('/other/pathname')({ action });

      expect(result).to.be.false;
    });
  });

  context('isPagePathByLocationOrHistoryChange', () => {
    it('should return true if the paths are same with LOCATION_CHANGE', () => {
      const action = {
        type: LOCATION_CHANGE,
        payload: {
          location: {
            pathname: '/pathname'
          }
        }
      };

      const result = isPagePathByLocationOrHistoryChange('/pathname')({ action });

      expect(result).to.be.true;
    });

    it('should return false if the paths are same with LOCATION_CHANGE', () => {
      const action = {
        type: LOCATION_CHANGE,
        payload: {
          location: {
            pathname: '/pathname'
          }
        }
      };

      const result = isPagePathByLocationOrHistoryChange('/other/pathname')({ action });

      expect(result).to.be.false;
    });

    it('should return true if the paths are same with HISTORY__SAVE_CHANGE', () => {
      const action = {
        type: historyActionTypes.HISTORY__SAVE_CHANGE,
        payload: {
          routeState: {
            pathname: '/pathname'
          }
        }
      };

      const result = isPagePathByLocationOrHistoryChange('/pathname')({ action });

      expect(result).to.be.true;
    });

    it('should return false if the paths are same with HISTORY__SAVE_CHANGE', () => {
      const action = {
        type: historyActionTypes.HISTORY__SAVE_CHANGE,
        payload: {
          routeState: {
            pathname: '/pathname'
          }
        }
      };

      const result = isPagePathByLocationOrHistoryChange('/other/pathname')({ action });

      expect(result).to.be.false;
    });
  });

  context('isMatchPathAndPathChanged', () => {
    const regexPath = '/view-reservation/trip-details/travel-info-page/[0-9]';

    it('should return false when path is not matched', () => {
      const action = {
        type: LOCATION_CHANGE,
        payload: {
          routeState: {
            action: 'pop',
            pathname: '/car/cancel'
          }
        }
      };

      const result = isMatchPathAndPathChanged(regexPath)({ action });

      expect(result).to.be.false;
    });

    it('should return true when path is matched and refresh', () => {
      const action = {
        type: 'HISTORY__SAVE_CHANGE',
        payload: {
          routeState: {
            action: null,
            pathname: '/view-reservation/trip-details/travel-info-page/1'
          }
        }
      };
      const result = isMatchPathAndPathChanged(regexPath)({ action });

      expect(result).to.be.true;
    });

    it('should return false when action type is not HISTORY__SAVE_CHANGE and not refresh', () => {
      const action = {
        type: 'OTHER_ACTIONS',
        payload: {
          routeState: {
            action: 'push'
          }
        }
      };
      const result = isMatchPathAndPathChanged()({ action });

      expect(result).to.be.false;
    });

    context('when action type is LOCATION_CHANGE', () => {
      it('should return true when current path matched and changed', () => {
        const action = {
          type: LOCATION_CHANGE,
          payload: {
            location: {
              pathname: '/view-reservation/trip-details/travel-info-page/1'
            },
            action: 'PUSH'
          }
        };
        const mockRouter = {
          location: {
            pathname: '/view-reservation/trip-details/'
          }
        };
        const mockStore = {
          getState() {
            return { router: mockRouter };
          }
        };

        const result = isMatchPathAndPathChanged(regexPath)({ action, store: mockStore });

        expect(result).to.be.true;
      });

      it('should return false when path matched but does not changed', () => {
        const action = {
          type: LOCATION_CHANGE,
          payload: {
            location: {
              pathname: '/view-reservation/trip-details/travel-info-page/1'
            },
            action: 'POP'
          }
        };
        const mockRouter = {
          location: {
            pathname: '/view-reservation/trip-details/travel-info-page/1'
          }
        };
        const mockStore = {
          getState() {
            return { router: mockRouter };
          }
        };

        const result = isMatchPathAndPathChanged(regexPath)({ action, store: mockStore });

        expect(result).to.be.false;
      });

      it('should return false when path does not matched but changed', () => {
        const action = {
          type: LOCATION_CHANGE,
          payload: {
            location: {
              pathname: '/view-reservation/'
            },
            action: 'pop'
          }
        };
        const mockRouter = {
          location: {
            pathname: '/car/cancel'
          }
        };
        const mockStore = {
          getState() {
            return { router: mockRouter };
          }
        };

        const result = isMatchPathAndPathChanged(regexPath)({ action, store: mockStore });

        expect(result).to.be.false;
      });
    });
  });

  context('isMatchPath', () => {
    it('should match when rexexp is an exact string match without regexpr variables', () => {
      const action = {
        type: 'SHARED__ROUTE_CHANGED',
        location: { pathname: '/air/booking/some-path' },
        method: 'push'
      };

      const result = isMatchPath('/air/booking/some-path')({ action });

      expect(result).to.be.true;
    });

    it('should match when string matches the regexpr', () => {
      const action = {
        type: 'SHARED__ROUTE_CHANGED',
        location: { pathname: '/earlyBird/PNR123/some-path' },
        method: 'push'
      };

      const result = isMatchPath('/earlyBird/[0-9A-Z]{6}/some-path')({ action });

      expect(result).to.be.true;
    });

    it('should not match when string does not match the regexpr', () => {
      const action = {
        type: 'SHARED__ROUTE_CHANGED',
        location: { pathname: '/earlyBird/PNR/some-path' },
        method: 'push'
      };

      const result = isMatchPath('/earlyBird/[0-9A-Z]{6}/some-path')({ action });

      expect(result).to.be.false;
    });
  });

  context('isMatchSearch', () => {
    it('should match when string matches regex', () => {
      const action = {
        location: { search: 'queryParam=test' },
        method: 'push',
        type: 'SHARED__ROUTE_CHANGED'
      };

      const result = isMatchSearch('queryParam=')({ action });

      expect(result).to.be.true;
    });

    it('should not match when search string does not match regex', () => {
      const action = {
        location: { search: 'queryParam=test' },
        method: 'push',
        type: 'SHARED__ROUTE_CHANGED'
      };

      const result = isMatchSearch('queryParamNOT=')({ action });

      expect(result).to.be.false;
    });
  });

  context('isMatchPathByHistory', () => {
    it('should match when rexexp is an exact string match without regexpr variables', () => {
      const history = {
        location: { pathname: '/air/booking/some-path' },
        action: 'POP'
      };

      const result = isMatchPathByHistory('/air/booking/some-path')({ history });

      expect(result).to.be.true;
    });

    it('should match when string matches the regexpr', () => {
      const history = {
        location: { pathname: '/earlyBird/PNR123/some-path' },
        action: 'POP'
      };

      const result = isMatchPathByHistory('/earlyBird/[0-9A-Z]{6}/some-path')({ history });

      expect(result).to.be.true;
    });

    it('should not match when string does not match the regexpr', () => {
      const history = {
        location: { pathname: '/earlyBird/PNR/some-path' },
        action: 'POP'
      };

      const result = isMatchPathByHistory('/earlyBird/[0-9A-Z]{6}/some-path')({ history });

      expect(result).to.be.false;
    });
  });

  context('isMatchPathAndSearch', () => {
    const action = {
      location: { search: 'queryParam=test', pathname: '/test-path' },
      method: 'push',
      type: 'SHARED__ROUTE_CHANGED'
    };

    it('should return true if search and path matches', () => {
      const result = isMatchPathAndSearch('/test-path', 'queryParam=')({ action });

      expect(result).to.be.true;
    });

    it('should return false if only search matches', () => {
      const result = isMatchPathAndSearch('/not-test-path', 'queryParam=')({ action });

      expect(result).to.be.false;
    });

    it('should return false if only path matches', () => {
      const result = isMatchPathAndSearch('/test-path', 'notQueryParam=')({ action });

      expect(result).to.be.false;
    });

    it('should return false if neither search nor path matches', () => {
      const result = isMatchPathAndSearch('/not-test-path', 'notQueryParam=')({ action });

      expect(result).to.be.false;
    });
  });

  context('isMatchSearchByHistory', () => {
    it('should match when string matches regex', () => {
      const history = {
        location: { search: 'queryParam=test' },
        action: 'POP'
      };

      const result = isMatchSearchByHistory('queryParam=')({ history });

      expect(result).to.be.true;
    });

    it('should not match when search string does not match regex', () => {
      const history = {
        location: { search: 'queryParam=test' },
        action: 'POP'
      };

      const result = isMatchSearchByHistory('queryParamNOT=')({ history });

      expect(result).to.be.false;
    });
  });
  context('isMatchPathAndSearchByHistory', () => {
    const history = {
      location: { search: 'queryParam=test', pathname: '/test-path' },
      action: 'POP'
    };

    it('should return true if search and path matches', () => {
      const result = isMatchPathAndSearchByHistory('/test-path', 'queryParam=')({ history });

      expect(result).to.be.true;
    });

    it('should return false if only search matches', () => {
      const result = isMatchPathAndSearchByHistory('/not-test-path', 'queryParam=')({ history });

      expect(result).to.be.false;
    });

    it('should return false if only path matches', () => {
      const result = isMatchPathAndSearchByHistory('/test-path', 'notQueryParam=')({ history });

      expect(result).to.be.false;
    });

    it('should return false if neither search nor path matches', () => {
      const result = isMatchPathAndSearchByHistory('/not-test-path', 'notQueryParam=')({ history });

      expect(result).to.be.false;
    });
  });

  context('isMatchPathBeforeLocationChange', () => {
    it('should match when rexexp is an exact string match without regexpr variables', () => {
      const action = {
        type: LOCATION_CHANGE,
        payload: {
          location: { pathname: '/air/booking/some-path' },
          action: 'PUSH'
        }
      };

      const result = isMatchPathBeforeLocationChange('/air/booking/some-path')({ action });

      expect(result).to.be.true;
    });

    it('should match when string matches the regexpr', () => {
      const action = {
        type: LOCATION_CHANGE,
        payload: {
          location: { pathname: '/earlyBird/PNR123/some-path' },
          action: 'PUSH'
        }
      };

      const result = isMatchPathBeforeLocationChange('/earlyBird/[0-9A-Z]{6}/some-path')({ action });

      expect(result).to.be.true;
    });

    it('should not match when string does not match the regexpr', () => {
      const action = {
        type: LOCATION_CHANGE,
        payload: {
          location: { pathname: '/earlyBird/PNR/some-path' },
          action: 'PUSH'
        }
      };

      const result = isMatchPathBeforeLocationChange('/earlyBird/[0-9A-Z]{6}/some-path')({ action });

      expect(result).to.be.false;
    });
  });

  context('isMatchPathBeforeRouteSaved', () => {
    it('should match when rexexp is an exact string match without regexpr variables', () => {
      const action = {
        type: historyActionTypes.HISTORY__SAVE_CHANGE,
        payload: {
          routeState: {
            pathname: '/air/booking/some-path',
            action: 'push'
          }
        }
      };

      const result = isMatchPathBeforeRouteSaved('/air/booking/some-path')({ action });

      expect(result).to.be.true;
    });

    it('should match when string matches the regexpr', () => {
      const action = {
        type: historyActionTypes.HISTORY__SAVE_CHANGE,
        payload: {
          routeState: {
            pathname: '/earlyBird/PNR123/some-path',
            action: 'push'
          }
        }
      };

      const result = isMatchPathBeforeRouteSaved('/earlyBird/[0-9A-Z]{6}/some-path')({ action });

      expect(result).to.be.true;
    });

    it('should not match when string does not match the regexpr', () => {
      const action = {
        type: historyActionTypes.HISTORY__SAVE_CHANGE,
        payload: {
          routeState: {
            pathname: '/earlyBird/PNR/some-path',
            action: 'push'
          }
        }
      };

      const result = isMatchPathBeforeRouteSaved('/earlyBird/[0-9A-Z]{6}/some-path')({ action });

      expect(result).to.be.false;
    });
  });

  context('forceRedirectHelper', () => {
    it('should force redirect route path when call forceRedirect successfully', () => {
      const history = { location: { state: null }, push: sinon.stub() };
      const store = mockStore({});
      const addHistoryForceRedirectStub = sinon.stub(HistoryActions, 'addHistoryForceRedirect');

      const forceRedirect = forceRedirectHelper(store, history);

      forceRedirect('/');

      expect(addHistoryForceRedirectStub).to.have.been.calledWith('/');
      expect(history.push).to.have.been.calledWith('/');
    });
  });
});

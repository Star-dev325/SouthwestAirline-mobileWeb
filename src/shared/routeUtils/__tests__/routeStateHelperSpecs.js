import * as routeStateHelper from 'src/shared/routeUtils/routeStateHelper';

describe('routeStateHelper', () => {
  context('isRefresh', () => {
    it('should return true when routeState action is null', () => {
      const mockRouteState = {
        action: null
      };

      expect(routeStateHelper.isRefresh(mockRouteState)).to.be.true;
    });
  });

  context('isTransitionOrRefresh', () => {
    it('should return true when routeState.action is pop', () => {
      const state = {
        action: 'push'
      };

      expect(routeStateHelper.isTransitionOrRefresh(state)).to.be.true;
    });

    it('should return true when routeState.action is null', () => {
      const state = {
        action: null
      };

      expect(routeStateHelper.isTransitionOrRefresh(state)).to.be.true;
    });
  });

  context('isPushReplaceOrRefresh', () => {
    it('should return true when routeState.action is push', () => {
      const state = {
        action: 'push'
      };

      expect(routeStateHelper.isPushReplaceOrRefresh(state)).to.be.true;
    });

    it('should return true when routeState.action is replace', () => {
      const state = {
        action: 'replace'
      };

      expect(routeStateHelper.isPushReplaceOrRefresh(state)).to.be.true;
    });

    it('should return true when routeState.action is null', () => {
      const state = {
        action: null
      };

      expect(routeStateHelper.isPushReplaceOrRefresh(state)).to.be.true;
    });
  });

  context('isNotInUrlRange', () => {
    it('should return true when any prevPath is not start with flowUrlRange', () => {
      const flowUrlRange = ['car/booking'];
      const prevPath = 'air/booking';

      expect(routeStateHelper.isNotInUrlRange(flowUrlRange, prevPath)).to.be.true;
    });
  });

  context('isBrowserBackOrForward', () => {
    it('should return true when is browser back or forward', () => {
      const routeState = {
        action: 'pop'
      };

      expect(routeStateHelper.isBrowserBackOrForward(routeState)).to.be.true;
    });
  });

  context('isPrevRouteStaySame', () => {
    it('should return true when next state has the name with the prev state', () => {
      const nextRoute = {
        pathname: 'route',
        key: 'key'
      };
      const prevRoute = {
        pathname: 'route',
        key: 'key'
      };

      expect(routeStateHelper.isPrevRouteStaySame(nextRoute, prevRoute)).to.be.true;
    });
  });

  context('getHistoryStateByIndex', () => {
    it('should return the correct route state when pass the history index', () => {
      const mockHistory = [{ name: 'history1' }, { name: 'history2' }];

      expect(routeStateHelper.getHistoryStateByIndex(mockHistory, -1)).to.be.deep.equal({ name: 'history2' });
      expect(routeStateHelper.getHistoryStateByIndex(mockHistory, -2)).to.be.deep.equal({ name: 'history1' });
    });
  });

  context('isFuzzyMatchRoutePath', () => {
    it('should return true when currentPathName is inside the routePathList', () => {
      const routePathList = ['/air/booking'];
      const pathname = '/air/booking';

      expect(routeStateHelper.isFuzzyMatchRoutePath({ pathname }, routePathList)).to.be.true;
    });

    it('should return true when currentPathName is inside the routePathList and currentPathName with Params', () => {
      const routePathList = ['/air/booking'];
      const pathname = '/air/booking/adult/outboud/result';

      expect(routeStateHelper.isFuzzyMatchRoutePath({ pathname }, routePathList)).to.be.true;
    });

    it('should return false when currentPathName is not inside the routePathList', () => {
      const routePathList = ['/air/booking'];
      const pathname = '/air/cancel';

      expect(routeStateHelper.isFuzzyMatchRoutePath({ pathname }, routePathList)).to.be.false;
    });

    it('should return false when currentPathName is undefined', () => {
      const routePathList = ['/air/booking'];

      expect(routeStateHelper.isFuzzyMatchRoutePath({}, routePathList)).to.be.false;
    });
  });

  context('isExactMatchRoutePath', () => {
    it('should return true when pathname is inside the routePathList', () => {
      const routePathList = ['/air/booking'];
      const pathname = '/air/booking';

      expect(routeStateHelper.isExactMatchRoutePath({ pathname }, routePathList)).to.be.true;
    });

    it('should return true when currentPathName is inside the routePathList and both path and pathname with Params', () => {
      const routePathList = ['/air/booking/:tripIndex/AAA'];
      const pathname = '/air/booking/3/AAA';

      expect(routeStateHelper.isExactMatchRoutePath({ pathname }, routePathList)).to.be.true;
    });

    it('should return false when pathname is inside the routePathList and pathname with params', () => {
      const routePathList = ['/air/booking'];
      const pathname = '/air/booking/adult/outboud/result';

      expect(routeStateHelper.isExactMatchRoutePath({ pathname }, routePathList)).to.be.false;
    });

    it('should return false when pathname is not inside the routePathList', () => {
      const routePathList = ['/air/booking'];
      const pathname = '/air/cancel';

      expect(routeStateHelper.isExactMatchRoutePath({ pathname }, routePathList)).to.be.false;
    });

    it('should return false when pathname is undefined', () => {
      const routePathList = ['/air/booking'];

      expect(routeStateHelper.isExactMatchRoutePath({}, routePathList)).to.be.false;
    });
  });

  context('isRefreshAtSamePage', () => {
    it('should return true when it is refresh at the same page', () => {
      const nextRouteState = {
        pathname: '/air/booking',
        action: null
      };
      const currentRouteState = {
        pathname: '/air/booking',
        action: 'push'
      };

      expect(routeStateHelper.isRefreshAtSamePage(nextRouteState, currentRouteState)).to.be.true;
    });
  });

  context('isBrowserBack', () => {
    it('should return true when it is browser back', () => {
      const nextRouteState = {
        pathname: '/air/booking',
        action: 'pop',
        key: 'nyb7zv'
      };
      const prevRouteState = {
        pathname: '/air/booking',
        action: 'push',
        key: 'nyb7zv'
      };

      expect(routeStateHelper.isBrowserBack(nextRouteState, prevRouteState)).to.be.true;
    });
  });

  context('getCurrentRouteState', () => {
    it('should return current route state', () => {
      const mockHistory = [{ pathname: '/url1' }, { pathname: '/url2' }];

      expect(routeStateHelper.getCurrentRouteState(mockHistory)).to.be.deep.equal({ pathname: '/url2' });
    });
  });

  context('isBackOrForwardToTheSamePage', () => {
    it('should return true when is browser back or forward to the current page', () => {
      const mockNextRouteState = {
        action: 'pop',
        pathname: '/url'
      };
      const mockCurrentRouteState = {
        action: null,
        pathname: '/url'
      };

      expect(routeStateHelper.isBackOrForwardToTheCurrentPage(mockCurrentRouteState, mockNextRouteState)).to.be.true;
    });

    it('should return false when it is browser back or forward to other page', () => {
      const mockNextRouteState = {
        action: 'pop',
        pathname: '/url'
      };
      const mockCurrentRouteState = {
        action: null,
        pathname: '/other-url'
      };

      expect(routeStateHelper.isBackOrForwardToTheCurrentPage(mockCurrentRouteState, mockNextRouteState)).to.be.false;
    });
  });

  context('shouldCleanFlow', () => {
    it('should return true when search contain cleanFlow is true', () => {
      const routeState = {
        pathname: 'some path',
        search: '?cleanFlow=true'
      };

      expect(routeStateHelper.shouldCleanFlow(routeState)).to.equal(true);
    });

    it('should return false when search contain cleanFlow is not exist', () => {
      const routeState = {
        pathname: 'some path',
        search: ''
      };

      expect(routeStateHelper.shouldCleanFlow(routeState)).to.equal(false);
    });

    it('should return false when search contain cleanFlow is false', () => {
      const routeState = {
        pathname: 'some path',
        search: '?cleanFlow=false'
      };

      expect(routeStateHelper.shouldCleanFlow(routeState)).to.equal(false);
    });

    it('should return false when routeState is null', () => {
      const routeState = null;

      expect(routeStateHelper.shouldCleanFlow(routeState)).to.equal(false);
    });
  });

  context('isModalOpen', () => {
    it('should return true when search contains _modal=', () => {
      const routeState = {
        pathname: 'some path',
        search: '?_modal=MODAL_ID'
      };

      expect(routeStateHelper.isModalOpen(routeState)).to.equal(true);
    });

    it('should return false when search does not contain _modal=', () => {
      const routeState = {
        pathname: 'some path',
        search: '?other=true&params=false'
      };

      expect(routeStateHelper.isModalOpen(routeState)).to.equal(false);
    });

    it('should return false when search is empty', () => {
      const routeState = {
        pathname: 'some path',
        search: ''
      };

      expect(routeStateHelper.isModalOpen(routeState)).to.equal(false);
    });
  });

  context('isComingFromHomePage', () => {
    it('should return true when previous path is `/`', () => {
      const persistentHistory = [
        { pathname: '/', action: 'pop' },
        { pathname: '/check-in', action: 'push', search: '?cleanFlow=true' }
      ];

      const result = routeStateHelper.isComingFromHomePage(persistentHistory);

      expect(result).to.be.true;
    });

    it('should return true when previous path is redirect from home page', () => {
      const persistentHistory = [
        { pathname: '/', action: 'pop' },
        { pathname: '/check-in', action: 'push', search: '?clk=GNAVCHCKIN&cleanFlow=true' },
        { pathname: '/check-in', action: 'replace', search: '?cleanFlow=true' }
      ];

      const result = routeStateHelper.isComingFromHomePage(persistentHistory);

      expect(result).to.be.true;
    });

    it('should return true when previous path is multiple redirect from home page', () => {
      const persistentHistory = [
        { pathname: '/', action: 'pop' },
        { pathname: '/check-in', action: 'push', search: '?clk=GNAVCHCKIN&cleanFlow=true' },
        { pathname: '/check-in', action: 'replace', search: '?someother=option&cleanFlow=true' },
        { pathname: '/check-in', action: 'replace', search: '?cleanFlow=true' }
      ];

      const result = routeStateHelper.isComingFromHomePage(persistentHistory);

      expect(result).to.be.true;
    });

    it('should return false when there is no previous page', () => {
      const persistentHistory = [{ pathname: '/check-in', action: null, search: '/air/booking/shopping' }];

      const result = routeStateHelper.isComingFromHomePage(persistentHistory);

      expect(result).to.be.false;
    });
  });

  describe('isOnEntryRoute', () => {
    it('should return true if the currentPathname matches the route if the route is a string', () => {
      const currentPathName = '/air/booking';
      const entryRouteName = '/air/booking';

      const result = routeStateHelper.isOnEntryRoute(currentPathName, entryRouteName);

      expect(result).to.be.true;
    });

    it('should return true if the currentPathname matches the route if the route is an object', () => {
      const currentPathName = '/air/booking';
      const entryRouteName = {
        canonicalPath: '/air/booking',
        htmlPath: '/air/booking/index.html'
      };

      const result = routeStateHelper.isOnEntryRoute(currentPathName, entryRouteName);

      expect(result).to.be.true;
    });

    it('should return false if the currentPathname matches the route if the route is a string', () => {
      const currentPathName = '/air/booking';
      const entryRouteName = '/air/cancel';

      const result = routeStateHelper.isOnEntryRoute(currentPathName, entryRouteName);

      expect(result).to.be.false;
    });

    it('should return false if the currentPathname matches the route if the route is an object', () => {
      const currentPathName = '/air/booking';
      const entryRouteName = {
        canonicalPath: '/air/cancel',
        htmlPath: '/air/cancel/index.html'
      };

      const result = routeStateHelper.isOnEntryRoute(currentPathName, entryRouteName);

      expect(result).to.be.false;
    });
  });

  describe('isOnExitRoute', () => {
    it('should return true if the currentPathname matches the route if the route is a string', () => {
      const currentPathName = '/air/booking';
      const exitRouteName = '/air/booking';

      const result = routeStateHelper.isOnExitRoute(currentPathName, exitRouteName);

      expect(result).to.be.true;
    });

    it('should return true if the currentPathname matches the route if the route is an object', () => {
      const currentPathName = '/air/booking';
      const exitRouteName = {
        canonicalPath: '/air/booking',
        htmlPath: '/air/booking/index.html'
      };

      const result = routeStateHelper.isOnExitRoute(currentPathName, exitRouteName);

      expect(result).to.be.true;
    });

    it('should return false if the currentPathname matches the route if the route is a string', () => {
      const currentPathName = '/air/booking';
      const exitRouteName = '/air/cancel';

      const result = routeStateHelper.isOnExitRoute(currentPathName, exitRouteName);

      expect(result).to.be.false;
    });

    it('should return false if the currentPathname matches the route if the route is an object', () => {
      const currentPathName = '/air/booking';
      const exitRouteName = {
        canonicalPath: '/air/cancel',
        htmlPath: '/air/cancel/index.html'
      };

      const result = routeStateHelper.isOnExitRoute(currentPathName, exitRouteName);

      expect(result).to.be.false;
    });
  });
});

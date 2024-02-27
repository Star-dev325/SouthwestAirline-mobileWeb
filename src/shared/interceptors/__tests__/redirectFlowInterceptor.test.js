import * as HistoryActions from 'src/shared/actions/historyActions';
import * as SharedActions from 'src/shared/actions/sharedActions';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import redirectFlowInterceptor from 'src/shared/interceptors/redirectFlowInterceptor';
import * as routeStateHelper from 'src/shared/routeUtils/routeStateHelper';
import { mockFlowConfig } from 'test/unit/helpers/interceptorTestUtils';

describe('redirectFlowInterceptor', () => {
  let addHistoryForceRedirectMock;
  let dispatchMock;
  let exitWebViewMock;
  let getCurrentRouteStateMock;
  let isOnEntryRouteMock;
  let isOnExitRouteMock;
  let pushMock;
  let setIsRedirectingPathMock;

  beforeEach(() => {
    addHistoryForceRedirectMock = jest.spyOn(HistoryActions, 'addHistoryForceRedirect');
    dispatchMock = jest.fn();
    exitWebViewMock = jest.spyOn(WebViewActions, 'exitWebView');
    getCurrentRouteStateMock = jest.spyOn(routeStateHelper, 'getCurrentRouteState');
    isOnExitRouteMock = jest.spyOn(routeStateHelper, 'isOnExitRoute');
    isOnEntryRouteMock = jest.spyOn(routeStateHelper, 'isOnEntryRoute');
    pushMock = jest.fn();
    setIsRedirectingPathMock = jest.spyOn(SharedActions, 'setIsRedirectingPath');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return undefined when flowConfig is empty', () => {
    const result = redirectFlowInterceptor(mockInterceptorContext({ flowConfig: undefined }));

    expect(result).toBeUndefined();
  });

  describe('initial status', () => {
    it('should redirect to entry when flowStatus is initial and not in initial page', () => {
      getCurrentRouteStateMock.mockReturnValue({ pathname: '/not-entry' });
      const result = redirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig('initial') }));

      result.interceptor();

      expect(addHistoryForceRedirectMock).toHaveBeenCalledWith('/entry');
      expect(pushMock).toHaveBeenCalledWith('/entry');
    });

    it('should redirect to entry when flowStatus is initial and not in initial page when route returns an object', () => {
      getCurrentRouteStateMock.mockReturnValue({ pathname: '/not-entry' });
      const result = redirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfigWithObjectAlias('initial') }));

      result.interceptor();

      expect(addHistoryForceRedirectMock).toHaveBeenCalledWith('/entry');
      expect(pushMock).toHaveBeenCalledWith('/entry');
    });

    it('should redirect to entry when flowStatus is initial and not in initial page when route returns an object, but not a canonical path property', () => {
      getCurrentRouteStateMock.mockReturnValue({ pathname: '/not-entry' });
      const result = redirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfigWithObjectAliasNoCanonicalPropPath('initial') }));

      result.interceptor();

      expect(addHistoryForceRedirectMock).toHaveBeenCalledWith('/entry');
      expect(pushMock).toHaveBeenCalledWith('/entry');
    });

    it('should call exitWebView when in a webview and flowStatus is initial and not in initial page', () => {
      getCurrentRouteStateMock.mockReturnValue({ pathname: '/not-entry' });
      const result = redirectFlowInterceptor(
        mockInterceptorContext({
          flowConfig: generateFlowConfig('initial'),
          store: {
            getState: () => ({
              persistentHistory: [],
              app: {
                webView: {
                  isWebView: true
                }
              }
            }),
            dispatch: () => {}
          }
        })
      );

      result.interceptor();

      expect(addHistoryForceRedirectMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalledWith('/entry');
      expect(exitWebViewMock).toHaveBeenCalled();
    });

    it('should not redirect to entry when flowStatus is initial and in initial page', () => {
      getCurrentRouteStateMock.mockReturnValue({ pathname: '/entry' });
      const result = redirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig('initial') }));

      expect(result).toBeUndefined();
      expect(addHistoryForceRedirectMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
      expect(dispatchMock).not.toHaveBeenCalled();
    });

    it('should not redirect to entry when flowstatus is initial and in initial page when route returns an object', () => {
      getCurrentRouteStateMock.mockReturnValue({ pathname: '/entry' });
      const result = redirectFlowInterceptor(
        mockInterceptorContext({ flowConfig: generateFlowConfigWithObjectAlias('initial') })
      );

      expect(result).toBeUndefined();
      expect(addHistoryForceRedirectMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
      expect(dispatchMock).not.toHaveBeenCalled();
    });
  });

  describe('in_progress status', () => {
    it('should redirect to home when flowStatus is in_progress and on exit page', () => {
      getCurrentRouteStateMock.mockReturnValue({ pathname: '/not-entry' });
      isOnExitRouteMock.mockReturnValue(true);
      const result = redirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig('in_progress') }));

      result.interceptor();

      expect(addHistoryForceRedirectMock).toHaveBeenCalledWith('/');
      expect(pushMock).toHaveBeenCalledWith('/');
    });

    it('should call exitWebView when in a webview and when flowStatus is in_progress and on exit page', () => {
      getCurrentRouteStateMock.mockReturnValue({ pathname: '/not-entry' });
      isOnExitRouteMock.mockReturnValue(true);
      const result = redirectFlowInterceptor(
        mockInterceptorContext({
          flowConfig: generateFlowConfig('in_progress'),
          store: {
            getState: () => ({
              persistentHistory: [],
              app: {
                webView: {
                  isWebView: true
                }
              }
            }),
            dispatch: () => {}
          }
        })
      );

      result.interceptor();

      expect(addHistoryForceRedirectMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
      expect(exitWebViewMock).toHaveBeenCalled();
    });

    it('should not redirect to home when flowStatus is in_progress and not on exit page', () => {
      getCurrentRouteStateMock.mockReturnValue({ pathname: '/not-entry' });
      isOnExitRouteMock.mockReturnValue(false);
      const result = redirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig('in_progress') }));

      expect(result).toBeUndefined();
      expect(addHistoryForceRedirectMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });

  describe('completed status', () => {
    it('should redirect to home when flowStatus is completed and not on exit page', () => {
      getCurrentRouteStateMock.mockReturnValue({ pathname: '/not-entry' });
      isOnExitRouteMock.mockReturnValue(false);
      const result = redirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig('completed') }));

      result.interceptor();

      expect(addHistoryForceRedirectMock).toHaveBeenCalledWith('/');
      expect(pushMock).toHaveBeenCalledWith('/');
    });

    it('should call exitWebView when in a webview and when flowStatus is completed and not on exit page', () => {
      getCurrentRouteStateMock.mockReturnValue({ pathname: '/not-entry' });
      isOnExitRouteMock.mockReturnValue(false);
      const result = redirectFlowInterceptor(
        mockInterceptorContext({
          flowConfig: generateFlowConfig('completed'),
          store: {
            getState: () => ({
              persistentHistory: [],
              app: {
                webView: {
                  isWebView: true
                }
              }
            }),
            dispatch: () => {}
          }
        })
      );

      result.interceptor();

      expect(addHistoryForceRedirectMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
      expect(exitWebViewMock).toHaveBeenCalled();
    });

    it('should not redirect to home when flowStatus is completed and on exit page', () => {
      getCurrentRouteStateMock.mockReturnValue({ pathname: '/not-entry' });
      isOnExitRouteMock.mockReturnValue(true);
      const result = redirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig('completed') }));

      expect(result).toBeUndefined();
      expect(addHistoryForceRedirectMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
    });

    it('should not redirect to home when flowStatus is completed and on entry page', () => {
      getCurrentRouteStateMock.mockReturnValue({ pathname: '/entry' });
      isOnExitRouteMock.mockReturnValue(true);
      const result = redirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig('completed') }));

      expect(result).toBeUndefined();
      expect(addHistoryForceRedirectMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });

  describe('undefined status', () => {
    beforeEach(() => {
      getCurrentRouteStateMock.mockReturnValue({ pathname: '/don`t-care-path' });
    });

    it('should redirect to home when flow status is undefined and on exit page', () => {
      isOnExitRouteMock.mockReturnValue(true);
      const result = redirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig() }));

      result.interceptor();

      expect(addHistoryForceRedirectMock).toHaveBeenCalledWith('/');
      expect(pushMock).toHaveBeenCalledWith('/');
    });

    it('should call exitWebView when in a webview and flow status is undefined and on exit page', () => {
      isOnExitRouteMock.mockReturnValue(true);
      const result = redirectFlowInterceptor(
        mockInterceptorContext({
          flowConfig: generateFlowConfig(),
          store: {
            getState: () => ({
              persistentHistory: [],
              app: {
                webView: {
                  isWebView: true
                }
              }
            }),
            dispatch: () => {}
          }
        })
      );

      result.interceptor();

      expect(addHistoryForceRedirectMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
      expect(exitWebViewMock).toHaveBeenCalled();
    });

    it('should redirect to entry when flow status is undefined and not on exit page and not on entry page', () => {
      isOnEntryRouteMock.mockReturnValue(false);
      isOnExitRouteMock.mockReturnValue(false);
      const result = redirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig() }));

      result.interceptor();

      expect(addHistoryForceRedirectMock).toHaveBeenCalledWith('/entry');
      expect(pushMock).toHaveBeenCalledWith('/entry');
    });

    it('should call exitWebView when in a webview and flow status is undefined and not on exit page and not on entry page', () => {
      isOnEntryRouteMock.mockReturnValue(false);
      isOnExitRouteMock.mockReturnValue(false);
      const result = redirectFlowInterceptor(
        mockInterceptorContext({
          flowConfig: generateFlowConfig(),
          store: {
            getState: () => ({
              persistentHistory: [],
              app: {
                webView: {
                  isWebView: true
                }
              }
            }),
            dispatch: () => {}
          }
        })
      );

      result.interceptor();

      expect(addHistoryForceRedirectMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
      expect(exitWebViewMock).toHaveBeenCalled();
    });

    it('should redirect to entry when flow status is undefined and not on exit page and on entry page', () => {
      isOnEntryRouteMock.mockReturnValue(true);
      isOnExitRouteMock.mockReturnValue(false);
      const result = redirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig() }));

      expect(result).toBeUndefined();
      expect(addHistoryForceRedirectMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });

  describe('routes with params', () => {
    it('should not redirect to entry when flowStatus is initial and in initial page and should handle a wildcard route', () => {
      getCurrentRouteStateMock.mockReturnValue({ pathname: '/entry/ABC123' });
      const result = redirectFlowInterceptor(
        generateFlowConfigWithEntryWithWildcard({ flowConfig: generateFlowConfig('initial') })
      );

      expect(result).toBeUndefined();
      expect(addHistoryForceRedirectMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
    });

    it('should not redirect to home when flowStatus is in_progress and not on exit page', () => {
      getCurrentRouteStateMock.mockReturnValue({ pathname: '/not-entry/ABC123' });
      isOnExitRouteMock.mockReturnValue(false);
      const result = redirectFlowInterceptor(
        generateFlowConfigWithEntryWithWildcard({ flowConfig: generateFlowConfig('in_progress') })
      );

      expect(result).toBeUndefined();
      expect(addHistoryForceRedirectMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
    });

    it('should not redirect to home when flowStatus is completed and on entry page', () => {
      getCurrentRouteStateMock.mockReturnValue({ pathname: '/entry/ABC123' });
      isOnExitRouteMock.mockReturnValue(true);
      const result = redirectFlowInterceptor(
        generateFlowConfigWithEntryWithWildcard({ flowConfig: generateFlowConfig('completed') })
      );

      expect(result).toBeUndefined();
      expect(addHistoryForceRedirectMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });

  describe('setIsRedirectingPath action', () => {
    describe('should dispatch', () => {
      it('when flowStatus is initial and not in initial page', () => {
        getCurrentRouteStateMock.mockReturnValue({ pathname: '/not-entry' });
        const result = redirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig('initial') }));

        result.interceptor();

        expect(setIsRedirectingPathMock).toHaveBeenCalledWith(true);
      });

      it('when flowStatus is in_progress and on exit page', () => {
        getCurrentRouteStateMock.mockReturnValue({ pathname: '/not-entry' });
        isOnExitRouteMock.mockReturnValue(true);
        const result = redirectFlowInterceptor(
          mockInterceptorContext({ flowConfig: generateFlowConfig('in_progress') })
        );

        result.interceptor();

        expect(setIsRedirectingPathMock).toHaveBeenCalledWith(true);
      });

      it('when flowStatus is completed and not on exit page', () => {
        getCurrentRouteStateMock.mockReturnValue({ pathname: '/not-entry' });
        isOnExitRouteMock.mockReturnValue(false);
        const result = redirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig('completed') }));

        result.interceptor();

        expect(setIsRedirectingPathMock).toHaveBeenCalledWith(true);
      });

      it('when flow status is undefined and on exit page', () => {
        getCurrentRouteStateMock.mockReturnValue({ pathname: '/don`t-care-path' });
        isOnExitRouteMock.mockReturnValue(true);
        const result = redirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig() }));

        result.interceptor();

        expect(setIsRedirectingPathMock).toHaveBeenCalledWith(true);
      });

      it('when flow status is undefined and not on exit page and not on entry page', () => {
        getCurrentRouteStateMock.mockReturnValue({ pathname: '/don`t-care-path' });
        isOnEntryRouteMock.mockReturnValue(false);
        isOnExitRouteMock.mockReturnValue(false);
        const result = redirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig() }));

        result.interceptor();

        expect(setIsRedirectingPathMock).toHaveBeenCalledWith(true);
      });
    });

    describe('should not dispatch', () => {
      it('when in a webview and redirectPath is truthy', () => {
        getCurrentRouteStateMock.mockReturnValue({ pathname: '/not-entry' });
        isOnExitRouteMock.mockReturnValue(true);
        const result = redirectFlowInterceptor(
          mockInterceptorContext({
            flowConfig: generateFlowConfig('in_progress'),
            store: {
              getState: () => ({
                persistentHistory: [],
                app: {
                  webView: {
                    isWebView: true
                  }
                }
              }),
              dispatch: dispatchMock
            }
          })
        );

        result.interceptor();

        expect(setIsRedirectingPathMock).not.toHaveBeenCalled();
      });

      it('when not in a webview and redirectPath is falsy', () => {
        getCurrentRouteStateMock.mockReturnValue({ pathname: '/not-entry' });
        isOnExitRouteMock.mockReturnValue(false);
        redirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig('in_progress') }));

        expect(setIsRedirectingPathMock).not.toHaveBeenCalled();
      });
    });
  });

  function generateFlowConfig(flowStatus) {
    return mockFlowConfig({ entry: '/entry', flowStatusGetter: () => flowStatus });
  }

  function generateFlowConfigWithEntryWithWildcard(flowStatus) {
    return mockFlowConfig({ entry: '/entry/:wildcard', flowStatusGetter: () => flowStatus });
  }

  function generateFlowConfigWithObjectAlias(flowStatus) {
    return mockFlowConfig({
      entry: {
        canonicalPath: '/entry',
        htmlPath: '/entry/index.html'
      },
      flowStatusGetter: () => flowStatus
    });
  }

  function generateFlowConfigWithObjectAliasNoCanonicalPropPath(flowStatus) {
    return mockFlowConfig({
      entry: {
        normalPath: '/entry',
        htmlPath: '/entry/index.html'
      },
      flowStatusGetter: () => flowStatus
    });
  }

  function mockInterceptorContext({ flowConfig, history, store }) {
    return {
      flowConfig,
      history: history || { push: pushMock },
      store: store || { getState: () => ({ persistentHistory: [] }), dispatch: dispatchMock }
    };
  }
});

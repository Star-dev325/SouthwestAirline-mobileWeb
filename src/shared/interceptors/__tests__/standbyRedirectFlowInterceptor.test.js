import * as HistoryActions from 'src/shared/actions/historyActions';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import standbyRedirectFlowInterceptor from 'src/shared/interceptors/standbyRedirectFlowInterceptor';
import * as routeStateHelper from 'src/shared/routeUtils/routeStateHelper';
import { mockFlowConfig } from 'test/unit/helpers/interceptorTestUtils';

describe('standbyRedirectFlowInterceptor', () => {
  let addHistoryForceRedirectStub;
  let dispatchStub;
  let exitWebViewStub;
  let getCurrentRouteStateStub, isOnExitRouteStub;
  let pushStub;

  beforeEach(() => {
    getCurrentRouteStateStub = jest.spyOn(routeStateHelper, 'getCurrentRouteState');
    isOnExitRouteStub = jest.spyOn(routeStateHelper, 'isOnExitRoute');
    addHistoryForceRedirectStub = jest.spyOn(HistoryActions, 'addHistoryForceRedirect');
    pushStub = jest.fn();
    exitWebViewStub = jest.spyOn(WebViewActions, 'exitWebView');
    dispatchStub = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return undefined when flowConfig is empty', () => {
    const result = standbyRedirectFlowInterceptor(mockInterceptorContext({ flowConfig: undefined }));

    expect(result).not.toBeDefined();
  });

  describe('initial status', () => {
    it('should not perform any action when flowStatus is initial and not in initial page', () => {
      getCurrentRouteStateStub.mockReturnValueOnce({ pathname: '/not-entry' });
      const result = standbyRedirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig('initial') }));

      expect(result).not.toBeDefined();
    });

    it('should not perform any action when in a webview and flowStatus is initial and not in initial page', () => {
      getCurrentRouteStateStub.mockReturnValueOnce({ pathname: '/not-entry' });
      const result = standbyRedirectFlowInterceptor(
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

      expect(result).not.toBeDefined();
    });

    it('should not perform any action when flowStatus is initial and in initial page', () => {
      getCurrentRouteStateStub.mockReturnValueOnce({ pathname: '/entry' });
      const result = standbyRedirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig('initial') }));

      expect(result).not.toBeDefined();
    });
  });

  describe('completed status', () => {
    it('should redirect to home when flowStatus is completed and not on exit page', () => {
      getCurrentRouteStateStub.mockReturnValueOnce({ pathname: '/not-entry' });
      isOnExitRouteStub.mockReturnValueOnce(false);
      const result = standbyRedirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig('completed') }));

      result.interceptor();

      expect(addHistoryForceRedirectStub).toHaveBeenCalledWith('/');
      expect(pushStub).toHaveBeenCalledWith('/');
    });

    it('should call exitWebView when in a webview and when flowStatus is completed and not on exit page', () => {
      getCurrentRouteStateStub.mockReturnValueOnce({ pathname: '/not-entry' });
      isOnExitRouteStub.mockReturnValueOnce(false);
      const result = standbyRedirectFlowInterceptor(
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

      expect(addHistoryForceRedirectStub).not.toHaveBeenCalled();
      expect(exitWebViewStub).toHaveBeenCalled();
    });

    it('should not redirect to home when flowStatus is completed and on exit page', () => {
      getCurrentRouteStateStub.mockReturnValueOnce({ pathname: '/not-entry' });
      isOnExitRouteStub.mockReturnValueOnce(true);
      const result = standbyRedirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig('completed') }));

      expect(result).not.toBeDefined();
    });

    it('should not redirect to home when flowStatus is completed and on entry page', () => {
      getCurrentRouteStateStub.mockReturnValueOnce({ pathname: '/entry' });
      isOnExitRouteStub.mockReturnValueOnce(true);
      const result = standbyRedirectFlowInterceptor(mockInterceptorContext({ flowConfig: generateFlowConfig('completed') }));

      expect(result).not.toBeDefined();
    });
  });

  function generateFlowConfig(flowStatus) {
    return mockFlowConfig({ entry: '/entry', flowStatusGetter: () => flowStatus });
  }

  function mockInterceptorContext({ flowConfig, history, store }) {
    return {
      flowConfig,
      history: history || { push: pushStub },
      store: store || { getState: () => ({ persistentHistory: [] }), dispatch: dispatchStub }
    };
  }
});

import * as WebViewStore from 'src/shared/analytics/webViewStore/index';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';

const { SHARED__SET_APP_READY } = SharedActionTypes;

describe('WebViewStore', () => {
  it('should return analytics actions from selectors', () => {
    const { analyticsActionsForWebViewStore } = WebViewStore;

    expect(analyticsActionsForWebViewStore).to.have.lengthOf(1);
    expect(analyticsActionsForWebViewStore).to.include.members([SHARED__SET_APP_READY]);
  });

  it('should return undefined if nothing exists', () => {
    const state = {};
    const action = SHARED__SET_APP_READY;

    const result = WebViewStore.generateWebViewStore(state, action);

    expect(result).to.deep.equal({
      isWebView: undefined,
      deviceType: undefined
    });
  });

  it('should return the data as stored in redux', () => {
    const isWebView = true;
    const deviceType = 'deviceType';

    const state = {
      app: {
        webView: {
          isWebView,
          deviceType
        }
      }
    };
    const action = SHARED__SET_APP_READY;

    const result = WebViewStore.generateWebViewStore(state, action);

    expect(result).to.deep.equal({
      isWebView,
      deviceType
    });
  });
});

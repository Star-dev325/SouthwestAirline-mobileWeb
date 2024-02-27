import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import createMockStore from 'test/unit/helpers/createMockStore';
import ShowForWebView from 'src/shared/components/showForWebView';

describe('ShowForWebView', () => {
  context('when isWebView property is true', () => {
    it('should show the children of ShowForWebView', () => {
      const store = createMockStore()({
        app: {
          webView: {
            isWebView: true
          }
        }
      });
      const showForWebViewWrapper = createComponent(store);
      const showForWebViewWrapperChildren = showForWebViewWrapper.find('div');

      expect(showForWebViewWrapperChildren).to.have.lengthOf(2);
      expect(showForWebViewWrapperChildren.at(1)).to.have.text('Content');
    });
  });

  context('when isWebView property is false', () => {
    it('should not show the children of ShowForWebView', () => {
      const store = createMockStore()({
        app: {
          webView: {
            isWebView: false
          }
        }
      });
      const showForWebViewWrapper = createComponent(store);
      const showForWebViewWrapperChildren = showForWebViewWrapper.find('div');

      expect(showForWebViewWrapperChildren).to.have.lengthOf(0);
    });
  });

  const createComponent = (store) =>
    mount(
      <Provider store={store}>
        <ShowForWebView>
          <div>Content</div>
        </ShowForWebView>
      </Provider>
    );
});

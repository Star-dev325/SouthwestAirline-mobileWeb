import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import HideForWebView from 'src/shared/components/hideForWebView';
import createMockStore from 'test/unit/helpers/createMockStore';

describe('HideForWebView', () => {
  describe('when isWebView property is true', () => {
    it('should not show the children of HideForWebView', () => {
      const store = createMockStore()({
        app: {
          webView: {
            isWebView: true
          }
        }
      });
      const { container } = createComponent(store);
      const hideForWebViewWrapperChildren = container.querySelectorAll('div');

      expect(hideForWebViewWrapperChildren).toHaveLength(0);
    });
  });

  describe('when isWebView property is false', () => {
    it('should show the children of HideForWebView', () => {
      const store = createMockStore()({
        app: {
          webView: {
            isWebView: false
          }
        }
      });
      const { container } = createComponent(store);
      const hideForWebViewWrapperChildren = container.querySelectorAll('div');

      expect(hideForWebViewWrapperChildren).toHaveLength(2);
      expect(hideForWebViewWrapperChildren[1]).toHaveTextContent('Content');
    });
  });

  const createComponent = (store) =>
    render(
      <Provider store={store}>
        <HideForWebView>
          <div>Content</div>
        </HideForWebView>
      </Provider>
    );
});

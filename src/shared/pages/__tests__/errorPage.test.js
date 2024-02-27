jest.mock('src/shared/helpers/webViewHelper', () => ({
  exitWebView: jest.fn()
}));

jest.mock('@swa-ui/hybrid', () => ({
  isHybridEnabled: jest.fn()
}));

import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import { exitWebView } from 'src/shared/helpers/webViewHelper';
import { isHybridEnabled } from '@swa-ui/hybrid';
import ErrorPage from 'src/shared/pages/errorPage';
import createMockStore from 'test/unit/helpers/createMockStore';

describe('error page', () => {
  let mockResetErrorBoundary;
  const { location } = window;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    mockResetErrorBoundary = jest.fn();
    delete window.location;
    window.location = { replace: jest.fn() };
  });

  afterEach(() => {
    window.location = location;
  });

  it('should match snapshot', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should return home when button is clicked', () => {
    isHybridEnabled.mockReturnValue(false);
    const { getByText } = createComponent();

    fireEvent.click(getByText('SHARED__ERROR_PAGE__BUTTON'));

    expect(window.location.replace).toHaveBeenCalledWith('/');
  });

  it('should exit webview when button is clicked in a webview', () => {
    isHybridEnabled.mockReturnValue(true);
    const { getByText } = createComponent();

    fireEvent.click(getByText('SHARED__ERROR_PAGE__WEBVIEW_BUTTON'));

    expect(exitWebView).toHaveBeenCalled();
  });

  it('should not return home when button is clicked in a webview', () => {
    isHybridEnabled.mockReturnValue(true);
    const { getByText } = createComponent();

    fireEvent.click(getByText('SHARED__ERROR_PAGE__WEBVIEW_BUTTON'));

    expect(window.location.replace).not.toHaveBeenCalled();
  });

  it('should reset error state when unmounted', () => {
    const { unmount } = createComponent();

    unmount();

    expect(mockResetErrorBoundary).toHaveBeenCalled();
  });

  const createComponent = () => {
    const store = createMockStore()({});
    const props = {
      error: 'mock error',
      errorInfo: { componentStack: 'mock error info' },
      resetErrorBoundary: mockResetErrorBoundary
    };

    return render(
      <Provider store={store}>
        <ErrorPage {...props} />
      </Provider>
    );
  };
});

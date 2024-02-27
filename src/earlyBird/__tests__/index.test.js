import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import EarlyBird from 'src/earlyBird';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

describe('EarlyBird', () => {
  it('should render EarlyBird route page', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });
});

const createComponent = (props = {}) => {
  const defaultProps = {
    match: {
      url: '/earlybird'
    }
  };
  const mergedProps = { ...defaultProps, ...props };
  const store = createMockStoreWithRouterMiddleware()({
    app: {
      errorHeader: {
        errorMessage: null,
        hasError: false
      }
    },
    router: {
      location: {
        search: 'search'
      }
    }
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <EarlyBird {...mergedProps} />
      </BrowserRouter>
    </Provider>
  );
};

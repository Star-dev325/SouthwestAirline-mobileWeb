import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import AirCancel from 'src/airCancel';

describe('AirCancel', () => {
  it('should render AirCancel route page', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });
});

const createComponent = (props = {}) => {
  const defaultProps = {
    match: {
      url: '/air/cancel'
    }
  };
  const mergedProps = { ...defaultProps, ...props };
  const store = configureMockStore()({
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
        <AirCancel {...mergedProps} />
      </BrowserRouter>
    </Provider>
  );
};

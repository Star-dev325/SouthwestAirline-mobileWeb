import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import FlightStatus from 'src/flightStatus';

jest.mock('src/flightStatus', () => () => <div>Flight Status Page</div>);

describe('FlightStatus', () => {
  it('should render FlightStatus route page', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });
});

const createComponent = (props = {}) => {
  const defaultProps = {
    match: {
      url: '/flight-status'
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
        <FlightStatus {...mergedProps} />
      </BrowserRouter>
    </Provider>
  );
};

jest.mock('src/travelFunds/pages/lookUpTravelFundsPage', () => jest.fn(() => <div>Travel Funds Page</div>));

import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import TravelFunds from 'src/travelFunds';

describe('TravelFunds', () => {
  it('should render TravelFunds route page', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });
});

const createComponent = (props = {}) => {
  const defaultProps = {
    match: {
      url: '/travel-funds'
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
        <TravelFunds {...mergedProps} />
      </BrowserRouter>
    </Provider>
  );
};

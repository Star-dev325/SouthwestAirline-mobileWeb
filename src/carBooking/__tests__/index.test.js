import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import CarBooking from 'src/carBooking';

jest.mock('src/carBooking/pages/carBookingSearchPage', ()=> () => <div>Car Booking Landing Page</div>);

describe('CarBooking', () => {
  it('should render CarBooking route page', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });
});

const createComponent = (props = {}) => {
  const defaultProps = {
    match: {
      url: '/car/booking'
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
        <CarBooking {...mergedProps} />
      </BrowserRouter>
    </Provider>
  );
};

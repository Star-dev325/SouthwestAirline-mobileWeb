import { render } from '@testing-library/react';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('contact method page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render contact method page', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  const createComponent = (props = {}) => {
    const noop = () => {};
    const defaultProps = {
      alreadyHasContactMethod: false,
      contactMethodInfo: {},
      goBack: noop,
      isInternationalBooking: false,
      isLoggedIn: false,
      updateContactMethodFn: noop
    };
    const store = configureMockStore()({
      app: {},
      router: {
        location: {
          search: 'search'
        }
      }
    });
    const { AirChangeContactMethodPage } = require('src/airChange/pages/airChangeContactMethodPage');
    const combinedProps = { ...defaultProps, ...props };

    return render(
      <Provider store={store}>
        <AirChangeContactMethodPage {...combinedProps} />
      </Provider>
    );
  };
});

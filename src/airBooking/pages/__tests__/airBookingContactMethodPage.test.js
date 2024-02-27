import React from 'react';
import _ from 'lodash';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { AirBookingContactMethodPage } from 'src/airBooking/pages/airBookingContactMethodPage';

describe('contact method page', () => {
  it('should render contact method page', () => {
    expect(createComponent({})).toMatchSnapshot();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      updateContactMethodFn: _.noop,
      goBack: _.noop,
      contactMethodInfo: {},
      isInternationalBooking: false,
      alreadyHasContactMethod: false,
      isLoggedIn: false
    };
    const store = configureMockStore()({
      app: {
        errorHeader: {
          hasError: false,
          errorMessage: null
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    });
    const mergedProps = { ...defaultProps, ...props };

    return render(
      <Provider store={store}>
        <AirBookingContactMethodPage {...mergedProps} />
      </Provider>
    );
  };
});

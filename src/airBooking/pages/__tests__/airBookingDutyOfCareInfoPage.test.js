import React from 'react';
import _ from 'lodash';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AirBookingDutyOfCareInfoPage } from 'src/airBooking/pages/airBookingDutyOfCareInfoPage';
import configureMockStore from 'test/unit/helpers/configureMockStore';

describe('contact info travel manager page', () => {
  it('should render', () => {
    expect(createComponent()).toMatchSnapshot();
  });

  const createComponent = (props = {}) => {
    const state = {
      app: {
        errorHeader: {
          hasError: false,
          errorMessage: null
        },
        airBooking: {
          accountInfo: {
            dutyOfCareContact: {
              contactMethod: 'CALL_ME'
            }
          }
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    };
    const defaultProps = {
      updateContactInfoTravelManagerFn: _.noop,
      goBack: _.noop,
      dutyOfCareContact: {
        contactEmail: null,
        contactMethod: 'CALL_ME',
        contactPhone: { countryCode: '1', number: '2145551234' }
      },
      isInternationalBooking: false,
      alreadyHasContactMethod: false,
      isLoggedIn: false
    };

    const store = configureMockStore()(state);

    return render(
      <Provider store={store}>
        <AirBookingDutyOfCareInfoPage {..._.merge({}, defaultProps, props)} />
      </Provider>
    );
  };
});

import { AirBookingBillingAddressPage } from 'src/airBooking/pages/airBookingBillingAddressPage';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { render } from '@testing-library/react';

describe('AirBookingBillingAddressPage', () => {
  let goBackMock;
  let pushMock;
  let saveTravelFundsBillingAddressFnMock;

  beforeEach(() => {
    saveTravelFundsBillingAddressFnMock = jest.fn();
    goBackMock = jest.fn();
    pushMock = jest.fn();
  });

  it('should render billing address page', () => {
    const { baseElement } = createComponent();
    
    expect(baseElement).toMatchSnapshot();
  });

  it('should prop travelFundsAddress as initial form data if it exists', () => {
    const instance = React.createRef();

    createComponent({ ref: instance });

    expect(instance.current._getInitialFormData()).toEqual({
      addressLine1: '554 Lane',
      addressLine2: '',
      city: 'Austin',
      stateProvinceRegion: 'TX',
      zipOrPostalCode: '75204',
      isoCountryCode: 'US',
      phoneNumber: '215-546-5465',
      phoneCountryCode: 'US'
    });
  });

  it('should prop transformed contactInfo as initial form data if it exists and no form data exists', () => {
    const instance = React.createRef();

    createComponent({
      ref: instance,
      travelFundsAddress: null
    });

    expect(instance.current._getInitialFormData()).toEqual({
      addressLine1: 'Contact Info Lane',
      addressLine2: '',
      city: 'Dallas',
      stateProvinceRegion: 'TX',
      zipOrPostalCode: '12345',
      isoCountryCode: 'US',
      phoneNumber: '215-546-5465',
      phoneCountryCode: 'US'
    });
  });

  it('should trigger action and goBack to purchase page when form submitted', () => {
    const instance = React.createRef();
    const mockFormData = {
      addressLine1: '554 Lane',
      addressLine2: '',
      city: 'Austin',
      stateProvinceRegion: 'TX',
      zipOrPostalCode: '75204',
      isoCountryCode: 'US',
      phoneNumber: '215-546-5465',
      phoneCountryCode: 'US'
    };

    createComponent({ ref: instance });

    instance.current._onSubmit(mockFormData);

    expect(saveTravelFundsBillingAddressFnMock).toBeCalledWith(mockFormData);
    expect(goBackMock).toBeCalled();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      push: pushMock,
      goBack: goBackMock,
      contactInfo: {
        address: {
          addressLine1: 'Contact Info Lane',
          addressLine2: '',
          city: 'Dallas',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '12345',
          isoCountryCode: 'US'
        },
        phone: {
          number: '2155465465',
          countryCode: '1'
        }
      },
      travelFundsAddress: {
        addressLine1: '554 Lane',
        addressLine2: '',
        city: 'Austin',
        stateProvinceRegion: 'TX',
        zipOrPostalCode: '75204',
        isoCountryCode: 'US',
        phoneNumber: '215-546-5465',
        phoneCountryCode: 'US'
      },
      saveTravelFundsBillingAddressFn: saveTravelFundsBillingAddressFnMock
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
        <AirBookingBillingAddressPage {...mergedProps} />
      </Provider>
    );
  };
});

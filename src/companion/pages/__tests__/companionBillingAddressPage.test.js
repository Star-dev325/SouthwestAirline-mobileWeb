import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { CompanionBillingAddressPage } from 'src/companion/pages/companionBillingAddressPage';

describe('CompanionBillingAddressPage', () => {
  let goBackMock, pushMock, saveTravelFundsBillingAddressFnMock;

  beforeEach(() => {
    saveTravelFundsBillingAddressFnMock = jest.fn();
    goBackMock = jest.fn();
    pushMock = jest.fn();
  });

  it('should render billing address page', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should prop transformed contactInfo as initial form data if it exists and no form data exists', () => {
    const instance = React.createRef();

    createComponent({ ref: instance, travelFundsAddress: null });

    expect(instance.current._buildInitialFormData()).toEqual({
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

  it('should prop travelFundsAddress as initial form data if it exists', () => {
    const instance = React.createRef();

    createComponent({ ref: instance });

    expect(instance.current._buildInitialFormData()).toEqual({
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

  it('should trigger action and goBack to purchase page when form submitted', () => {
    const instance = React.createRef();

    createComponent({ ref: instance });

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

    const finalProps = { ...defaultProps, ...props };

    return render(
      <Provider store={store}>
        <CompanionBillingAddressPage {...finalProps} />
      </Provider>
    );
  };
});

import i18n from '@swa-ui/locale';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import BillingAddressForm from 'src/shared/components/billingAddressForm';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

describe('BillingAddressForm', () => {
  let mockGoBack;
  let mockOnSubmit;

  beforeEach(() => {
    mockGoBack = jest.fn();
    mockOnSubmit = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should render update form title', () => {
      const { container } = createComponent({ initialFormData: null });

      expect(container.querySelector('.segments .fields--label').textContent).toEqual(
        i18n('SHARED__BILLING_INFO__BILLING_ADDRESS')
      );
    });

    it('should prefill form with initialFormData prop', () => {
      const { container } = createComponent();
      const allInputs = container.querySelectorAll('input');

      expect(allInputs[0].value).toBe('554 Lane');
      expect(allInputs[1].value).toBe('Apt 5');
      expect(allInputs[2].value).toBe('75204');
      expect(allInputs[3].value).toBe('Austin');
      expect(allInputs[5].value).toBe('215-546-5465');
    });
  });

  describe('submit', () => {
    it('should goBack when user clicks cancel', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.action-bar--left-buttons .button'));

      expect(mockGoBack).toHaveBeenCalled();
    });

    it('should trigger onSubmit callback with form data', () => {
      const { container } = createComponent();

      fireEvent.submit(container.querySelector('form'));

      expect(mockOnSubmit).toHaveBeenCalledWith({
        addressLine1: '554 Lane',
        addressLine2: 'Apt 5',
        city: 'Austin',
        isoCountryCode: 'US',
        phoneCountryCode: 'US',
        phoneNumber: '215-546-5465',
        stateProvinceRegion: 'TX',
        zipOrPostalCode: '75204'
      });
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      formId: 'FORM_ID',
      goBack: mockGoBack,
      initialFormData: {
        addressLine1: '554 Lane',
        addressLine2: 'Apt 5',
        city: 'Austin',
        isoCountryCode: 'US',
        phoneCountryCode: 'US',
        phoneNumber: '215-546-5465',
        stateProvinceRegion: 'TX',
        zipOrPostalCode: '75204'
      },
      onSubmit: mockOnSubmit
    };

    const mergedProps = { ...defaultProps, ...props };
    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <BillingAddressForm {...mergedProps} />
      </Provider>
    );
  };
});

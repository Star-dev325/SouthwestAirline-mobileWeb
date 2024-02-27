import { render } from '@testing-library/react';
import React from 'react';
import CarPromoCodeCardSection from 'src/shared/form/fields/carPromoCodeCardSection';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('CarPromoCodeCardSection', () => {
  describe('enable and disable the form filed', () => {
    it("should disable the type selector field and promo code input field when vendor selector field haven't value", () => {
      const { container } = createWrapper();

      const typeSelectorField = container.querySelectorAll('.form-select-placeholder-field--select')[1];
      const promoCodeInputField = container.querySelector('.car-promo-code-card--code-input input');

      expect(typeSelectorField.querySelector('select').hasAttribute('disabled')).toBeTruthy();
      expect(promoCodeInputField.hasAttribute('disabled')).toBeTruthy();
    });

    it('should enable the type selector field and disable promo code input field when only vendor selector field have value', () => {
      const { container } = createWrapper({ value: { vendor: 'ALAMO', type: '', code: '' } });

      const typeSelectorField = container.querySelectorAll('.form-select-placeholder-field--select')[1];
      const promoCodeInputField = container.querySelector('.car-promo-code-card--code-input input');

      expect(typeSelectorField.querySelector('select').hasAttribute('disabled')).toBeFalsy();
      expect(promoCodeInputField.hasAttribute('disabled')).toBeTruthy();
    });

    it('should enable the promo code input field when both of type selector field and vendor selector field have value', () => {
      const { container } = createWrapper({ value: { vendor: 'ALAMO', type: 'CORPORATE_RATE', code: '' } });

      const typeSelectorField = container.querySelectorAll('.form-select-placeholder-field--select')[1];
      const promoCodeInputField = container.querySelector('.car-promo-code-card--code-input input');

      expect(typeSelectorField.querySelector('select').hasAttribute('disabled')).toBeFalsy();
      expect(promoCodeInputField.hasAttribute('disabled')).toBeFalsy();
    });
  });

  describe('promo type placeholder', () => {
    it('should equal Select Code or ID when vendor is Alamo', () => {
      const typeSelectorField = createComponent(1, { value: { vendor: 'ALAMO', type: '', code: '' } });

      expect(typeSelectorField.querySelector('select').getAttribute('placeholder')).toBe(
        'CAR_BOOKING__PROMO_TYPE_HOLDER_MAP__ALAMO'
      );
    });

    it('should equal Select ID, Number or Code when vendor is DOLLAR', () => {
      const typeSelectorField = createComponent(1, { value: { vendor: 'DOLLAR', type: '', code: '' } });

      expect(typeSelectorField.querySelector('select').getAttribute('placeholder')).toBe(
        'CAR_BOOKING__PROMO_TYPE_HOLDER_MAP__DOLLAR'
      );
    });

    it('should equal Select Number when vendor is AVIS', () => {
      const typeSelectorField = createComponent(1, { value: { vendor: 'AVIS', type: '', code: '' } });

      expect(typeSelectorField.querySelector('select').getAttribute('placeholder')).toBe(
        'CAR_BOOKING__PROMO_TYPE_HOLDER_MAP__AVIS'
      );
    });

    it('should equal Select Code or Number when vendor is THRIFTY', () => {
      const typeSelectorField = createComponent(1, { value: { vendor: 'THRIFTY', type: '', code: '' } });

      expect(typeSelectorField.querySelector('select').getAttribute('placeholder')).toBe(
        'CAR_BOOKING__PROMO_TYPE_HOLDER_MAP__THRIFTY'
      );
    });

    it('should equal Select Number or ID when vendor is ZL', () => {
      const typeSelectorField = createComponent(1, { value: { vendor: 'ZL', type: '', code: '' } });

      expect(typeSelectorField.querySelector('select').getAttribute('placeholder')).toBe(
        'CAR_BOOKING__PROMO_TYPE_HOLDER_MAP__ZL'
      );
    });

    it('should equal Select Code when vendor is ZA', () => {
      const typeSelectorField = createComponent(1, { value: { vendor: 'ZA', type: '', code: '' } });

      expect(typeSelectorField.querySelector('select').getAttribute('placeholder')).toBe(
        'CAR_BOOKING__PROMO_TYPE_HOLDER_MAP__ZA'
      );
    });
  });

  it('should sort vendor', () => {
    const companyListProps = [
      { label: 'Alamo', value: 'ALAMO' },
      { label: 'Avis', value: 'AVIS' },
      { label: 'Budget', value: 'BUDGET' },
      { label: 'Dollar', value: 'DOLLAR' },
      { label: 'Enterprise', value: 'ET' },
      { label: 'Hertz', value: 'HERTZ' },
      { label: 'National', value: 'ZL' },
      { label: 'Payless', value: 'ZA' },
      { label: 'Thrifty', value: 'THRIFTY' }
    ];
    const carCompanySelectField = createComponent(0, {
      promoVendorOptions: companyListProps
    });

    const options = carCompanySelectField.querySelectorAll('select option');

    expect(options[2].textContent).toBe('Alamo');
    expect(options[options.length - 1].textContent).toBe('Thrifty');
  });

  const promoVendorOptions = [
    { label: 'Alamo', value: 'ALAMO' },
    { label: 'Avis', value: 'AVIS' },
    { label: 'Budget', value: 'BUDGET' },
    { label: 'Dollar', value: 'DOLLAR' },
    { label: 'Enterprise', value: 'ET' },
    { label: 'Hertz', value: 'HERTZ' },
    { label: 'National', value: 'ZL' },
    { label: 'Payless', value: 'ZA' },
    { label: 'Thrifty', value: 'THRIFTY' }
  ];

  const promoTypeOptions = [
    { label: 'Alamo Insiders ID', value: 'FREQUENT_RENTER' },
    { label: 'Contract ID', value: 'CORPORATE_RATE' }
  ];

  const createWrapper = (props = {}) => {
    const defaultProps = {
      onCarCompanyChangedFn: jest.fn(),
      onClearLinkClickedFn: jest.fn(),
      onPromoTypeChangedFn: jest.fn(),
      promoCodeIndex: 1,
      promoTypeOptions,
      promoVendorOptions
    };

    const mergedProps = { ...defaultProps, ...props };
    const MockedForm = createMockedForm(createMockedFormStore());

    return render(
      <MockedForm onSubmit={jest.fn()}>
        <CarPromoCodeCardSection {...mergedProps} />
      </MockedForm>
    );
  };

  const createComponent = (componentIndexToReturn = 0, props = {}) => {
    const { container } = createWrapper(props);

    return container.querySelectorAll('.form-select-placeholder-field--select')[componentIndexToReturn];
  };
});

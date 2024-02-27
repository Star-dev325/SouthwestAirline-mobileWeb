import i18n from '@swa-ui/locale';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import CarBookingEnterCodesForm from 'src/carBooking/components/carBookingEnterCodesForm';
import * as CarVendorsBuilder from 'test/builders/model/carVendorsBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('CarBookingEnterCodesForm', () => {
  let onSubmitStub;
  const validPromo = {
    code: 'asdf1234',
    type: 'FREQUENT_RENTER',
    vendor: 'ALAMO'
  };

  const invalidPromo = {
    code: '',
    type: 'FREQUENT_RENTER',
    vendor: 'ALAMO'
  };

  beforeEach(() => {
    onSubmitStub = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      carVendors: CarVendorsBuilder.build(),
      formId: 'formId',
      onSubmit: onSubmitStub,
      promos: []
    };

    const finalProps = { ...defaultProps, ...props };

    return render(
      <Provider store={createMockedFormStore()}>
        <CarBookingEnterCodesForm {...finalProps} />
      </Provider>
    );
  };

  const getSelectedCompanyValue = (promoCodeFirstSelect) =>
    promoCodeFirstSelect.querySelectorAll('.form-select-placeholder-field--wrapper-label')[0];

  const getSelectedTypeValue = (promoCodeFirstSelect) =>
    promoCodeFirstSelect.querySelectorAll('.form-select-placeholder-field--wrapper-label')[1];

  const getPromoCodeValue = (promoCodeFirstSelect) => promoCodeFirstSelect.querySelector('input[name="code1"]');

  describe('when only input promocode one', () => {
    it('should clear the type and code model value when change vendor value', () => {
      const { container } = createComponent();
      const promoCodeFirstSelectField = container.querySelector('select[name="vendor1"]');

      fireEvent.change(promoCodeFirstSelectField, { target: { value: 'BUDGET' } });

      expect(getSelectedCompanyValue(container).textContent).toContain('Budget');
      expect(getSelectedTypeValue(promoCodeFirstSelectField)).toBeFalsy();
      expect(container.querySelector('input[name="code1"]').value).toBeFalsy();
    });

    it('should clear the vendor type and promo code when click clear', () => {
      const { container } = createComponent();
      const promoCodeFirstSelectField = container.querySelector('select[name="vendor1"]');

      fireEvent.change(promoCodeFirstSelectField, { target: { value: 'BUDGET' } });

      expect(getSelectedCompanyValue(promoCodeFirstSelectField)).toBeFalsy();
      expect(getSelectedTypeValue(promoCodeFirstSelectField)).toBeFalsy();
      expect(getPromoCodeValue(promoCodeFirstSelectField)).toBeFalsy();
    });
  });

  describe('validation', () => {
    it('should not show error when only input valid data on promo form', () => {
      const { container } = createComponent({ promos: [validPromo] });

      fireEvent.submit(container.querySelector('form'));

      expect(container.querySelector('.error-header')).toBeNull();
      expect(onSubmitStub).toHaveBeenCalled();
    });

    it('should not show error message when nothing input to promocode form', () => {
      const { container } = createComponent({ promos: [] });

      fireEvent.submit(container.querySelector('form'));

      expect(onSubmitStub).toHaveBeenCalled();
    });

    it('should show error when only input vendor field on promo form', () => {
      const { container } = createComponent({ promos: [{ vendor: 'ALAMO', type: '', code: '' }] });

      fireEvent.submit(container.querySelector('form'));

      expect(container.querySelector('.error-header').textContent).toEqual('Please correct the highlighted errors.');
      expect(container.querySelector('.icon.icon_exclamation-circle')).not.toBeNull();
      expect(onSubmitStub).not.toHaveBeenCalled();
    });

    it('should show error when only input vendor field and type field are entered on promo form', () => {
      const { container } = createComponent({ promos: [invalidPromo] });

      fireEvent.submit(container.querySelector('form'));

      expect(container.querySelector('.error-header').textContent).toEqual(
        i18n('Please correct the highlighted errors.')
      );
      expect(container.querySelector('.icon.icon_exclamation-circle')).not.toBeNull();
      expect(onSubmitStub).not.toHaveBeenCalled();
    });

    it('should show error when only input non alphanumeric promo code field on promo form', () => {
      const { container } = createComponent({ promos: [{ vendor: 'ALAMO', type: 'FREQUENT_RENTER', code: '###' }] });

      fireEvent.submit(container.querySelector('form'));

      expect(container.querySelector('.error-header').textContent).toEqual(
        i18n('Please correct the highlighted errors.')
      );
      expect(container.querySelector('.icon.icon_exclamation-circle')).not.toBeNull();
      expect(onSubmitStub).not.toHaveBeenCalled();
    });

    it('should show error same data is entered for both promo field sections on the form', () => {
      const { container } = createComponent({ promos: [validPromo, validPromo] });

      fireEvent.submit(container.querySelector('form'));

      expect(container.querySelector('.error-header').textContent).toEqual(
        i18n('SHARED__ERROR_MESSAGES__CAR_BOOKING_PROMO_CODE_DUPLICATE')
      );
      expect(onSubmitStub).not.toHaveBeenCalled();
    });
  });

  describe('when both sections have same vendor and promo code', () => {
    let component;

    beforeEach(() => {
      component = createComponent({ promos: [validPromo, validPromo] });
    });

    it(`should contain duplicated form UI if click done`, () => {
      const { container } = component;

      fireEvent.submit(container.querySelector('form'));

      expect(container.querySelector('.error-header').textContent).toEqual(
        i18n('SHARED__ERROR_MESSAGES__CAR_BOOKING_PROMO_CODE_DUPLICATE')
      );
      expect(onSubmitStub).not.toHaveBeenCalled();
    });

    it('should not contain duplicated form UI if change any form fields', () => {
      const { container } = component;
      const section2 = container.querySelector('[name="vendor2"]');

      fireEvent.change(section2, { target: { value: 'CORPORATE_RATE' } });
      fireEvent.submit(container.querySelector('form'));

      expect(container.querySelector('.error-header')).toBeNull();
      expect(onSubmitStub).toHaveBeenCalled();
    });

    it('should not contain duplicated form UI when click clear button in promo card', () => {
      const { container } = component;
      const clearButton2 = container.querySelector('.clear-button');

      fireEvent.click(clearButton2);
      fireEvent.submit(container.querySelector('form'));

      const section2 = container.querySelector('.car-promo-code-card');

      expect(section2.querySelector('input[name="vendor2"]'));
      expect(section2.querySelector('input[name="type2"]'));
      expect(section2.querySelector('input[name="code2"]'));
      expect(container.querySelector('.error-header')).toBeNull();
      expect(onSubmitStub).toHaveBeenCalled();
    });
  });
});

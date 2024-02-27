jest.mock('src/shared/components/fullScreenModal/fullScreenModal', () => (props) => <div>{props.children}</div>);
jest.mock('src/shared/components/fullScreenModal/helpers/fullScreenModalHelper');

import { fireEvent, render } from '@testing-library/react';
import Q from 'q';
import React from 'react';
import { CAR_BOOKING_DISCOUNT_MODAL_ID } from 'src/carBooking/constants/carBookingConstants';
import * as FSMHelpers from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import CarBookingPromoCodeSelectorField from 'src/shared/form/fields/carBookingPromoCodeSelectorField';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as CarVendorsBuilder from 'test/builders/model/carVendorsBuilder';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('carBookingPromoCodeSelectorField', () => {
  let hideFullScreenModalMock;
  let showFullScreenModalMock;

  beforeEach(() => {
    hideFullScreenModalMock = jest.spyOn(FSMHelpers, 'hideFullScreenModal');
    showFullScreenModalMock = jest.spyOn(FSMHelpers, 'showFullScreenModal');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should show label and placeholder value when empty array', () => {
    const { container } = createComponent();

    expect(container.querySelector('label').textContent).toBe('CAR_BOOKING__PROMO_CODE_FORM__TITLE');
    expect(container.querySelector('.car-booking-promo-code--select-count').textContent).toBe(
      'CAR_BOOKING__PROMO_CODE_FORM__VIEW'
    );
  });

  it('should show placeholder of 1 Code Entered when value have one propCode', () => {
    const { container } = createComponent({ value: [{ code: 'code', type: 'type', vendor: 'vendor' }] });

    expect(container.querySelector('.car-booking-promo-code--select-count').textContent).toBe('1 Code Entered');
  });

  it('should show placeholder of 1 Code Entered when value have two propCodes with same vendor and type', () => {
    const { container } = createComponent({
      value: [
        { code: 'code1', type: 'type1', vendor: 'vendor1' },
        { code: 'code2', type: 'type1', vendor: 'vendor1' }
      ]
    });

    expect(container.querySelector('.car-booking-promo-code--select-count').textContent).toBe('1 Code Entered');
  });

  it('should show placeholder of 1 Code Entered when value have two propCodes with same vendor and type', () => {
    const { container } = createComponent({
      value: [
        { vendor: 'vendor1', type: 'type1', code: 'code1' },
        { vendor: 'vendor1', type: 'type1', code: 'code2' }
      ]
    });

    expect(container.querySelector('.car-booking-promo-code--select-count').textContent).toBe('1 Code Entered');
  });

  it('should show placeholder of 2 Codes Entered when value have two propCodes', () => {
    const { container } = createComponent({
      value: [
        { code: 'code1', type: 'type1', vendor: 'vendor1' },
        { code: 'code2', type: 'type2', vendor: 'vendor2' }
      ]
    });

    expect(container.querySelector('.car-booking-promo-code--select-count').textContent).toBe('2 Codes Entered');
  });

  it('should open modal when selector field is clicked', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelector('div[data-qa="promo-discounts"]'));

    expect(showFullScreenModalMock).toBeCalledWith(CAR_BOOKING_DISCOUNT_MODAL_ID);
  });

  it('should close modal when submit callback is called', () => {
    const { container } = createComponent();

    hideFullScreenModalMock.mockReturnValue(Q.resolve({}));

    fireEvent.submit(container.querySelectorAll('form')[1]);

    expect(hideFullScreenModalMock).toBeCalledWith('promoCode');
  });

  it('should update url query params with entered promo codes', () => {
    const pushMock = jest.spyOn(BrowserObject.history, 'pushState');
    const { getByText } = createComponent();

    hideFullScreenModalMock.mockReturnValue({
      then: (callback) => {
        callback();
      }
    });

    fireEvent.click(getByText('Done'));

    expect(pushMock).toBeCalled();
  });

  const createComponent = (props = {}) => {
    const MockedForm = createMockedForm(createMockedFormStore());

    const defaultProps = {
      carVendors: CarVendorsBuilder.build(),
      name: 'vendorField',
      onChange: jest.fn(),
      value: []
    };

    const mergedProps = { ...defaultProps, ...props };

    const wrapper = render(
      <MockedForm onSubmit={jest.fn()}>
        <CarBookingPromoCodeSelectorField {...mergedProps} />
      </MockedForm>
    );

    return wrapper;
  };
});

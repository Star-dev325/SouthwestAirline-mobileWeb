import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CarBookingPricingPage } from 'src/carBooking/pages/carBookingPricingPage';
import * as AppSelector from 'src/shared/selectors/appSelector';
import CarReservationBuilder from 'test/builders/model/carReservationBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('CarBookingPricingPage', () => {
  let pushStub;
  let saveSelectedExtraStub;
  let saveCarReservationStub;
  let loadUserAccountInfoStub;
  let saveUserAccountDriverInfoStub;
  let saveUserAccountContactInfoStub;

  beforeEach(() => {
    pushStub = jest.fn();
    saveSelectedExtraStub = jest.fn();
    saveCarReservationStub = jest.fn();
    loadUserAccountInfoStub = jest.fn();
    saveUserAccountDriverInfoStub = jest.fn();
    saveUserAccountContactInfoStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const createComponent = (extraProps = {}) => {
    const defaultProps = {
      carReservation: new CarReservationBuilder().build(),
      carExtras: [],
      productId: 'product-id',
      push: pushStub,
      saveSelectedExtrasFn: saveSelectedExtraStub,
      saveCarReservationFn: saveCarReservationStub,
      loadUserAccountInfoFn: loadUserAccountInfoStub,
      saveUserAccountDriverInfoFn: saveUserAccountDriverInfoStub,
      saveUserAccountContactInfoFn: saveUserAccountContactInfoStub,
      isUserLoggedIn: false
    };

    const newProps = {
      ...defaultProps,
      ...extraProps
    };
    
    return render(
      <BrowserRouter>
        <Provider store={createMockedFormStore()}>
          <CarBookingPricingPage {...newProps} />
        </Provider>
      </BrowserRouter>
    );
  };

  describe('carExtras', () => {
    it('should be hidden when we do not have car extras', () => {
      const { container } = createComponent();

      expect(container.querySelector('.car-extras-form-content [data-testId="car-extra"]')).toBeNull();
    });

    it('should be displayed when we have car extras', () => {
      const props = { carExtras: [{ type: 'SKI_RACK', description: 'Ski Rack' }] };
      const { container } = createComponent(props);
      
      const carExtras = container.querySelectorAll('.car-extras-form-content [data-testId="car-extra"]');

      expect(carExtras).toHaveLength(1);
    });
  });

  describe('continue button', () => {
    it('should call saveSelectedExtra action and push when form is submitted with selected carExtras', () => {
      const props = { carExtras: [{ type: 'SKI_RACK', description: 'Ski Rack' }] };
      const { container } = createComponent(props);
      const firstCheckBox = container
        .querySelector('[data-qa="car-booking-extras-checkbox-0"]')
        .querySelector('.checkbox-button--mark');

      fireEvent.click(firstCheckBox);
      fireEvent.submit(container.querySelector('form'));

      expect(saveSelectedExtraStub).toHaveBeenCalledWith(['SKI_RACK']);
    });

    it('should call saveSelectedExtra action and push to next page when form is submitted without any selected carExtras', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow')
        .mockReturnValue('car/booking');
      const { container } = createComponent();

      fireEvent.submit(container.querySelector('form'));

      expect(saveSelectedExtraStub).toHaveBeenCalledWith([]);
      expect(pushStub).toHaveBeenCalledWith('/car/booking/purchase');
    });
  });

  describe('submit', () => {
    it('should call saveSelectedExtra, saveCarReservation and loadUserAccountInfo actions when user is logged in', () => {
      const carBookingPricingPage = createComponent({ isUserLoggedIn: true });

      fireEvent.submit(carBookingPricingPage.getByRole('submit'));

      expect(saveSelectedExtraStub).toHaveBeenCalled();
      expect(saveCarReservationStub).toHaveBeenCalled();
      expect(loadUserAccountInfoStub).toHaveBeenCalled();
      expect(saveUserAccountDriverInfoStub).not.toHaveBeenCalled();
      expect(saveUserAccountContactInfoStub).not.toHaveBeenCalled();
    });

    it('should call saveSelectedExtra, saveCarReservation and save user account actions and not call loadUserAccountInfo action when user is not logged in', () => {
      const carBookingPricingPage = createComponent({ isUserLoggedIn: false });

      fireEvent.submit(carBookingPricingPage.getByRole('submit'));

      expect(saveSelectedExtraStub).toHaveBeenCalled();
      expect(saveCarReservationStub).toHaveBeenCalled();
      expect(loadUserAccountInfoStub).not.toHaveBeenCalled();
      expect(saveUserAccountDriverInfoStub).toHaveBeenCalled();
      expect(saveUserAccountContactInfoStub).toHaveBeenCalled();
    });
  });
});

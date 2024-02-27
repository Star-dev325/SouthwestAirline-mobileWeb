import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { DriverInfoEditPage } from 'src/carBooking/pages/driverInfoEditPage';
import * as AppSelector from 'src/shared/selectors/appSelector';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('DriverInfoEditPage', () => {
  let saveUserAccountDriverInfoMockFn;
  let pushStub;

  const noop =  jest.fn();

  beforeEach(() => {
    saveUserAccountDriverInfoMockFn = noop;
    pushStub = noop;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const createPageComponent = (props = {}) => {
    const driverInfo = {
      firstName: 'Amber',
      lastName: 'Awesome',
      accountNumber: '10000'
    };
    const defaultProps = {
      driverInfo,
      saveUserAccountDriverInfoFn: saveUserAccountDriverInfoMockFn,
      push: pushStub
    };
    const state = {
      app: {},
      router: {
        location: {
          search: ''
        }
      }
    };
    const mergedProps = { ...defaultProps, ...props };

    return render((
      <Provider store={createMockedFormStore(state)}>
        <Router>
          <DriverInfoEditPage {...mergedProps} />
        </Router>
      </Provider>
    ));
  };
 
  describe('render', () => {
    it('should render driver info form', () => {
      const { container } = createPageComponent();

      expect(container.querySelector('.car-booking-driver-info-edit-form')).not.toBeNull();
    });
  });
  describe('onSubmit', () => {
    it('should call saveUserAccountDriverInfoFn action when form submitted', () => {
      const { container } = createPageComponent();

      fireEvent.submit(container.querySelector('.car-booking-driver-info-edit-form'));

      expect(saveUserAccountDriverInfoMockFn).toHaveBeenCalled();
    });
   
    it('should transition to carBooking purchase page after retrieve driverInfo is successful', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('car/booking');
      const component = createPageComponent();

      fireEvent.submit(component.container.querySelector('.car-booking-driver-info-edit-form'));

      expect(pushStub).toHaveBeenCalledWith('/car/booking/purchase');
    });
   
    it('should display error message when form submitted with invalid data', async () => {
      const component = createPageComponent({ driverInfo: { middleName: '123' } });

      fireEvent.submit(component.container.querySelector('.car-booking-driver-info-edit-form'));

      expect(component.container.querySelector('.error-header')).not.toBeNull();
      expect(screen.getByText(/Please correct the highlighted errors./i)).toBeInTheDocument();
      expect(saveUserAccountDriverInfoMockFn).not.toHaveBeenCalled();
      expect(pushStub).not.toHaveBeenCalled();
    });
   
    it('should display error message when form submitted with invalid chars in Rapid Rewards number', () => {
      const component = createPageComponent({ driverInfo: { accountNumber: 'A123' } });

      fireEvent.submit(component.container.querySelector('.car-booking-driver-info-edit-form'));

      expect(component.container.querySelector('.error-header')).not.toBeNull();
      expect(screen.getByText(/Please correct the highlighted errors./i)).toBeInTheDocument();
      expect(saveUserAccountDriverInfoMockFn).not.toHaveBeenCalled();
      expect(pushStub).not.toHaveBeenCalled();
    });
   
    it('should display error message when form submitted with invalid Rapid Rewards number too long', () => {
      const component = createPageComponent({ driverInfo: { accountNumber: '123456789012345' } });

      fireEvent.submit(component.container.querySelector('.car-booking-driver-info-edit-form'));
      
      expect(component.container.querySelector('.error-header')).not.toBeNull();
      expect(screen.getByText(/Please correct the highlighted errors./i)).toBeInTheDocument();
      expect(saveUserAccountDriverInfoMockFn).not.toHaveBeenCalled();
      expect(pushStub).not.toHaveBeenCalled();
    });
  });
});

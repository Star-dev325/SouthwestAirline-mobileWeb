// TODO DONE
import i18n from '@swa-ui/locale';
import { fireEvent } from '@testing-library/react';
import CarBookingPurchaseForm from 'src/carBooking/components/carBookingPurchaseForm';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';

describe('CarBookingPurchaseForm', () => {
  const windowSatellite = window._satellite;
  let driverInfo;
  let onChangeStub;
  let onDriverInfoClickStub;
  let onSubmitStub;
  let satelliteTrackStub;
  let wrapper;

  beforeEach(() => {
    driverInfo = { firstName: 'Fred', lastName: 'Flintstone', accountNumber: '601005646' };
    onChangeStub = jest.fn();
    onDriverInfoClickStub = jest.fn();
    onSubmitStub = jest.fn();
    satelliteTrackStub = jest.fn();
    window._satellite = { track: satelliteTrackStub };
  });

  afterEach(() => {
    jest.clearAllMocks();
    window._satellite = windowSatellite;
  });

  const createFormComponent = (props = {}) => {
    const defaultProps = {
      driverInfo: undefined,
      formId: 'formId',
      initialFormData: undefined,
      isUserLoggedIn: false,
      onChange: onChangeStub,
      onDriverInfoClick: onDriverInfoClickStub,
      onSubmit: onSubmitStub,
      totalPrice: 10199,
      totalWithTaxesAndCurrencyCode: {
        amount: '1.00',
        currencyCode: 'USD'
      }
    };

    const mergedProps = { ...defaultProps, ...props };
    const state = {
      app: {},
      router: {
        location: {
          search: '_modal=countryCode'
        }
      }
    };

    wrapper = createComponent(CarBookingPurchaseForm, { state, props: mergedProps });

    return wrapper;
  };

  describe('render', () => {
    it('should render car booking purchase form and fields not related to driverInfo when no driverInfo', () => {
      const { container } = createFormComponent();

      expect(container.querySelector('.car-booking-purchase-form')).not.toBeNull();
      expect(container.querySelector('[name="confirmationEmail"]')).not.toBeNull();
      expect(container.querySelector('[name="driverPhoneNumber"]')).not.toBeNull();
      expect(container.querySelector('[name="purposeOfTravel"]')).not.toBeNull();
    });

    it('should render car booking purchase form and fields not related to driverInfo when has driverInfo', () => {
      const { container } = createFormComponent({ driverInfo });

      expect(container.querySelector('.car-booking-purchase-form')).not.toBeNull();
      expect(container.querySelector('[name="confirmationEmail"]')).not.toBeNull();
      expect(container.querySelector('[name="driverPhoneNumber"]')).not.toBeNull();
      expect(container.querySelector('[name="purposeOfTravel"]')).not.toBeNull();
    });

    it('should display drive name and RR account fields when use is not logged in', () => {
      const { container } = createFormComponent();

      expect(container.querySelector('[name="firstName"]')).not.toBeNull();
      expect(container.querySelector('[name="middleName"]')).not.toBeNull();
      expect(container.querySelector('[name="lastName"]')).not.toBeNull();
      expect(container.querySelector('[name="accountNumber"]')).not.toBeNull();
    });

    it('should display show summary of driver name and RR account when user is logged in', () => {
      const { container } = createFormComponent({ driverInfo, isUserLoggedIn: true });

      expect(container.querySelector('[name="firstName"]')).toBeNull();
      expect(container.querySelector('[name="middleName"]')).toBeNull();
      expect(container.querySelector('[name="lastName"]')).toBeNull();
      expect(container.querySelector('[name="accountNumber"]')).toBeNull();
    });
  });

  describe('submit', () => {
    it('should call onSubmit when form is submitted', () => {
      const contactInfo = {
        confirmationEmail: 'test@test.com',
        driverCountryCode: '1',
        driverIsoCountryCode: 'US',
        driverPhoneNumber: '812-926-1976'
      };

      const { container } = createFormComponent({
        driverInfo,
        initialFormData: contactInfo,
        isUserLoggedIn: true
      });

      const phoneNumber = container.querySelectorAll('input')[0];
      const confirmationEmail = container.querySelectorAll('input')[1];

      fireEvent.change(phoneNumber, { target: { value: '817-926-1976' } });
      fireEvent.change(confirmationEmail, { target: { value: 'abc@test.com' } });
      fireEvent.submit(container.querySelector('Form'));

      expect(onSubmitStub).toHaveBeenCalledWith({
        confirmationEmail: 'abc@test.com',
        driverIsoCountryCode: 'US',
        driverPhoneNumber: '817-926-1976',
        purposeOfTravel: ''
      });
    });

    describe('form validation errors', () => {
      it('should show phone number validation message when number length is too short', () => {
        const contactInfo = {
          confirmationEmail: 'test@test.com',
          driverCountryCode: '1',
          driverIsoCountryCode: 'US',
          driverPhoneNumber: '812-926'
        };

        const { container } = createFormComponent({ driverInfo, initialFormData: contactInfo, isUserLoggedIn: true });

        fireEvent.submit(container.querySelector('Form'));

        expect(container.querySelector('.field--error-msg').textContent).toEqual(
          i18n('SHARED__ERROR_MESSAGES__US_PHONE_NUMBER_LENGTH_ERROR')
        );
      });

      it('should show email validation message when address contains invalid characters', () => {
        const contactInfo = {
          confirmationEmail: 'test**',
          driverCountryCode: '1',
          driverIsoCountryCode: 'US',
          driverPhoneNumber: '812-926-1966'
        };
        const { container } = createFormComponent({ driverInfo, initialFormData: contactInfo, isUserLoggedIn: true });

        fireEvent.submit(container.querySelector('Form'));
        
        expect(container.querySelector('.field--error-msg').textContent).toEqual(
          i18n('SHARED__ERROR_MESSAGES__INVALID_EMAIL')
        );
      });

      it('should show Rapid Rewards validation message when RR number contains invalid characters and user is not logged in', () => {
        const { container } = createFormComponent({ isUserLoggedIn: false });

        const accountNumber = container.querySelectorAll('input')[3];

        fireEvent.change(accountNumber, { target: { value: 'ABC123456' } });
        fireEvent.submit(container.querySelector('Form'));

        expect(container.querySelector('.field--error-msg').textContent).toEqual(
          i18n('SHARED__ERROR_MESSAGES__RAPID_REWARDS_VALID')
        );
      });

      it('should show Rapid Rewards validation message when RR number is too long and user is not logged in', () => {
        const { container } = createFormComponent({ isUserLoggedIn: false });

        const accountNumber = container.querySelectorAll('input')[3];

        fireEvent.change(accountNumber, { target: { value: '123456789012345' } });

        fireEvent.submit(container.querySelector('Form'));
        expect(container.querySelector('.field--error-msg').textContent).toEqual(
          i18n('SHARED__ERROR_MESSAGES__RAPID_REWARDS_LENGTH')
        );
      });
    });
  });

  describe('track', () => {
    it('should _satellite track when phone number is focused', () => {
      const { container } = createFormComponent();

      container.querySelector('input[name="driverPhoneNumber"]').focus();

      expect(satelliteTrackStub).toHaveBeenCalledWith('form:phonenumber');
    });

    it('should _satellite track when email is focused', () => {
      const { container } = createFormComponent();

      container.querySelector('input[name="confirmationEmail"]').focus();

      expect(satelliteTrackStub).toHaveBeenCalledWith('form:emailaddress');
    });

    it('should _satellite track when purpose of travel is focused', () => {
      const { container } = createFormComponent();

      container.querySelector('[name="purposeOfTravel"]').focus();

      expect(satelliteTrackStub).toHaveBeenCalledWith('form:purposeoftravel');
    });
  });
});

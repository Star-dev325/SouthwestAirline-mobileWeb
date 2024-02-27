jest.mock('src/shared/components/fullScreenModal/helpers/fullScreenModalHelper', () => ({
  showFullScreenModal: jest.fn(),
  hideFullScreenModal: jest.fn()
}));

import i18n from '@swa-ui/locale';
import { fireEvent } from '@testing-library/react';
import * as fullScreenModalHelper from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import PassportForm from 'src/shared/form/components/passportForm';
import { noop } from 'src/shared/helpers/jsUtils';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';

describe('passportForm', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('render', () => {
    it('should render passport fields', () => {
      const { container } = renderComponent();

      expect(container).toMatchSnapshot();
    });

    it('should render passport page when Intl Must Ride PNR created in ARD (partially populated passport data)', () => {
      const initialFormData = {
        countryOfResidence: 'US',
        emergencyContactName: '',
        nationality: 'US',
        passportExpirationDate: '',
        passportIssuedBy: 'US',
        passportNumber: '',
        emergencyContactCountryCode: '',
        emergencyContactPhoneNumber: ''
      };

      const { container } = renderComponent({ initialFormData });

      expect(container).toMatchSnapshot();
    });

    it('should not show passenger name when passenger name empty', () => {
      const { container } = renderComponent({ passengerName: undefined });

      expect(container.querySelector('.passport-form--passenger-name')).toBeNull();
    });

    it('should disable nationality item when disableNationalityItem is true', () => {
      const { container } = renderComponent({ disableNationalityItem: true });

      expect(container.querySelector('[name="nationality"]').classList[2]).toContain('disabled');
    });

    it('should show emergency info radio button if it is optional', () => {
      const { container } = renderComponent({ enableUserToHideEmergencyContact: true });

      expect(container.querySelectorAll('.form-radio-field')[1]).not.toContain('hide');
    });

    it('should show emergency info radio button for save all if shouldShowSaveEmergencyContactForAll is true', () => {
      const { container } = renderComponent({ shouldShowSaveEmergencyContactForAll: true });

      expect(container.querySelectorAll('.form-radio-field')[0]).not.toContain('hide');
    });

    it('should show EMERGENCY CONTACT header when isEmergencyContactRequired is true', () => {
      const { container } = renderComponent({ isEmergencyContactRequired: true });

      expect(container.querySelector('.passport-form--emergency-contact-header').textContent).toEqual(
        i18n('SHARED__PLACEHOLDER__EMERGENCY_CONTACT')
      );
    });

    it('should show EMERGENCY CONTACT (OPTIONAL) header when isEmergencyContactRequired is false', () => {
      const { container } = renderComponent();

      expect(container.querySelector('.passport-form--emergency-contact-header').textContent).toEqual(
        i18n('SHARED__PLACEHOLDER__EMERGENCY_CONTACT_OPTIONAL')
      );
    });

    it('should show emergency info radio button for save all if enableUserToHideEmergencyContact and shouldShowSaveEmergencyContactForAll are true', () => {
      const { container } = renderComponent({
        enableUserToHideEmergencyContact: true,
        shouldShowSaveEmergencyContactForAll: true
      });

      expect(container.querySelectorAll('.form-radio-field')[1]).not.toContain('hide');
    });

    describe('when it is a lap child form', () => {
      it('should not show emergency contact information', () => {
        const { container } = renderComponent({ isLapChild: 'true' });

        expect(container.querySelector('.passport-form--emergency-contact-header')).toBeNull();
      });

      it('should show LAP CHILD header', () => {
        const { container } = renderComponent({ isLapChild: 'true' });

        expect(container.querySelector('.passport-form--passenger-label').textContent).toEqual(
          'VIEW_RESERVATION__BOARDING_INFO__LAP_CHILD_TITLE'
        );
      });
    });
  });

  describe('when clicking the country list', () => {
    it('should show country list fullscreen modal when click passportIssuedBy', () => {
      const { container } = renderComponent();

      fireEvent.click(container.querySelector('a[name="passportIssuedBy"]'));
      expect(fullScreenModalHelper.showFullScreenModal).toHaveBeenCalled();
    });
    it('should show country list fullscreen modal when click nationality', () => {
      const { container } = renderComponent();

      fireEvent.click(container.querySelector('a[name="nationality"]'));
      expect(fullScreenModalHelper.showFullScreenModal).toHaveBeenCalled();
    });
    it('should show country list fullscreen modal when click countryOfResidence', () => {
      const { container } = renderComponent();

      fireEvent.click(container.querySelector('a[name="countryOfResidence"]'));
      expect(fullScreenModalHelper.showFullScreenModal).toHaveBeenCalled();
    });
    it('should show country list fullscreen modal when click emergencyContactPhoneNumber', () => {
      const { container } = renderComponent();
      const emergencyContactPhoneNumberElement = container.querySelector('div.labeled.input.large .input--label');

      fireEvent.click(emergencyContactPhoneNumberElement);

      expect(fullScreenModalHelper.showFullScreenModal).toHaveBeenCalled();
    });
  });

  const renderComponent = (props = {}) => {
    const defaultProps = {
      formId: 'formId',
      initialFormData: {
        countryOfResidence: 'US',
        emergencyContactCountryCode: 'US',
        emergencyContactName: 'TEST NAME',
        emergencyContactPhoneNumber: '2131312321',
        nationality: 'AO',
        passportExpirationDate: '2019-11-17',
        passportIssuedBy: 'AS',
        passportNumber: 'AAAA'
      },
      onPassPortNumberFocus: noop,
      onSubmit: noop,
      passengerName: 'fake name',
      passportSubmitButtonText: 'submit'
    };
    const mergedProps = { ...defaultProps, ...props };

    return createComponent(PassportForm, { props: mergedProps });
  };
});

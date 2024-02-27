import i18n from '@swa-ui/locale';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import CompanionPassengerForm from 'src/companion/components/companionPassengerForm';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('companionPassengerForm', () => {
  let clickContactMethodFnMock;
  let clickSpecialAssistanceFnMock;

  beforeEach(() => {
    clickContactMethodFnMock = jest.fn();
    clickSpecialAssistanceFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('have correct components', () => {
    it('should have PageHeaderWithButtons when showHeaderButton is passed', () => {
      const { container } = createComponent({
        showHeaderButton: true
      });

      expect(container.querySelector('.button')).not.toBeNull();
    });

    it('should have CompanionPersonalInfo', () => {
      const { container } = createComponent();

      expect(container.querySelector('.companion-personal-info')).not.toBeNull();
    });

    it('should have ContactMethodField', () => {
      const { container } = createComponent({
        initialFormData: {
          contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_TEXT')}, (333)123-4567`
        }
      });

      expect(container.querySelector('.contact-method')).toMatchSnapshot();
    });

    it('should have continue button when pass showContinueButton', () => {
      const { container } = createComponent({
        showContinueButton: true
      });

      expect(container.querySelector('.continue')).not.toBeNull();
    });
  });

  describe('SpecialAssistance', () => {
    it('should render SpecialAssistanceNavItem', () => {
      const { container } = createComponent({
        showContinueButton: true
      });

      expect(container.querySelector('.special-assistance-item')).not.toBeNull();
    });

    it('should navigate to SpecialAssistance page when NavItem is clicked', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.special-assistance-item'));

      expect(clickSpecialAssistanceFnMock).toHaveBeenCalled();
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      formId: 'formId',
      companionInfo: {
        name: 'Companion Wang',
        gender: 'F',
        dateOfBirth: '1981-01-01'
      },
      initialFormData: {
        emailReceiptTo: '',
        receiptEmail: 'aterris@example.com',
        contactMethod: 'EMAIL',
        contactEmail: 'aterris@example.com',
        number: '',
        countryCode: '',
        saveContactMethod: '',
        shareItineraryEmail: 'test@test.com',
        redressNumber: '123456',
        knownTravelerNumber: '12345678'
      },
      onSubmit: () => {},
      clickContactMethodFn: clickContactMethodFnMock,
      clickSpecialAssistanceFn: clickSpecialAssistanceFnMock,
      contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_TEXT')}, (333)123-4567`,
      declineNotifications: false,
      isInternationalBooking: false
    };

    const finalProps = { ...defaultProps, ...props };

    return render(
      <Provider store={createMockedFormStore()}>
        <CompanionPassengerForm {...finalProps} />
      </Provider>
    );
  };
});

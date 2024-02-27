import i18n from '@swa-ui/locale';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { CompanionPassengerEditPage } from 'src/companion/pages/companionPassengerEditPage';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('companionPassengerEditPage', () => {
  let goBackMock, pushMock, saveCompanionPassengerFnMock;

  beforeEach(() => {
    pushMock = jest.fn();
    goBackMock = jest.fn();
    saveCompanionPassengerFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('have correct components', () => {
    it('should have CompanionPassengerEditForm', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });
  });

  describe('on submit', () => {
    it('should save companion passenger info and back to purchase summary page when submit', () => {
      const { container } = createComponent({
        goBack: goBackMock,
        saveCompanionPassengerFn: saveCompanionPassengerFnMock
      });

      fireEvent.submit(container.querySelector('form'));

      expect(goBackMock).toHaveBeenCalled();
      expect(saveCompanionPassengerFnMock).toHaveBeenCalledWith({
        contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_EMAIL')}, a@gmail.com`,
        emailReceiptTo: 'aterris@example.com',
        knownTravelerNumber: '12345678',
        redressNumber: '123456',
        shareItineraryEmail: 'test@test.com'
      });
    });
  });

  describe('opening sub-menus', () => {
    it('should transition to contact method page when click contact method block', () => {
      const instance = React.createRef();
      const { container } = createComponent({ ref: instance });

      fireEvent.click(container.querySelector('.nav-item-field'));

      expect(pushMock).toHaveBeenCalledWith('/companion/contact-method');
    });

    it('should transition to special assistance page when click special assistance block', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.special-assistance-item'));

      expect(pushMock).toHaveBeenCalledWith('/companion/special-assistance');
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      push: pushMock,
      goBack: goBackMock,
      saveCompanionPassengerFn: saveCompanionPassengerFnMock,
      contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_EMAIL')}, a@gmail.com`,
      declineNotifications: false,
      isInternationalBooking: false,
      formData: {
        emailReceiptTo: 'aterris@example.com',
        shareItineraryEmail: 'test@test.com',
        redressNumber: '123456',
        knownTravelerNumber: '12345678'
      },
      companionInfo: {
        name: 'Companion Fang',
        gender: 'F',
        dateOfBirth: '1995-02-05'
      }
    };

    return render(
      <Provider store={createMockedFormStore()}>
        <CompanionPassengerEditPage {...defaultProps} {...props} />
      </Provider>
    );
  };
});

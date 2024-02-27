import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import ContactMethodPage from 'src/shared/pages/contactMethodPage';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('ContactMethodPage', () => {
  describe('domestic contact method', () => {
    it('should call updateContactMethodStub when click DONE button', () => {
      const updateContactMethodFn = jest.fn();
      const goBack = jest.fn();

      const wrapper = createComponent({ updateContactMethodFn, goBack, isLoggedIn: true, isAirBooking: true }, {});

      fireEvent.click(screen.getByText('Email'));

      const emailInputWrapper = wrapper.container.querySelector('.contact-email-field input');

      fireEvent.change(emailInputWrapper, { target: { value: 'a@gmail.com' } });

      const button = wrapper.getByText('SHARED__BUTTON_TEXT__DONE');

      fireEvent.click(button);

      expect(updateContactMethodFn).toHaveBeenCalled();
      expect(goBack).toHaveBeenCalled();
    });
  });

  describe('international contact method', () => {
    it('should call goBack when click done button', () => {
      const updateContactMethodFn = jest.fn();
      const goBack = jest.fn();

      const wrapper = createComponent(
        { updateContactMethodFn, goBack, isInternationalBooking: true, isLoggedIn: true },
        {}
      );

      const radioButton = wrapper.container.querySelector('.form-radio-field--radio');

      fireEvent.click(radioButton);

      const button = wrapper.getByText('SHARED__BUTTON_TEXT__DONE');

      fireEvent.click(button);

      expect(updateContactMethodFn).toHaveBeenCalled();
      expect(goBack).toHaveBeenCalled();
    });
  });

  describe('save contact method', () => {
    it('should update contact method with save contact method field', () => {
      const updateContactMethodFn = jest.fn();

      const wrapper = createComponent(
        { updateContactMethodFn, isInternationalBooking: true, isLoggedIn: true, isAirBooking: true },
        {}
      );

      fireEvent.click(screen.getByText('Email'));

      const emailInputWrapper = wrapper.container.querySelector('.contact-email-field input');

      fireEvent.change(emailInputWrapper, { target: { value: 'a@gmail.com' } });

      const button = wrapper.getByText('SHARED__BUTTON_TEXT__DONE');

      fireEvent.click(button);

      expect(updateContactMethodFn).toHaveBeenCalledWith({
        contactMethod: 'EMAIL',
        email: 'a@gmail.com',
        isNotificationsEnabled: true,
        preferredLanguage: 'EN',
        saveContactMethod: false
      });
    });

    it('should update contact method with true when turn on save contact method', () => {
      const updateContactMethodFn = jest.fn();

      const wrapper = createComponent(
        { updateContactMethodFn, isInternationalBooking: true, isLoggedIn: true, isAirBooking: true },
        {}
      );

      fireEvent.click(screen.getByText('Email'));

      const emailInputWrapper = wrapper.container.querySelector('.contact-email-field input');

      fireEvent.change(emailInputWrapper, { target: { value: 'a@gmail.com' } });

      const saveContactCheckbox = wrapper.container
        .querySelector('.save-contact-method-field')
        .querySelector('.checkbox-button--mark');

      fireEvent.click(saveContactCheckbox);

      const button = wrapper.getByText('SHARED__BUTTON_TEXT__DONE');

      fireEvent.click(button);

      expect(updateContactMethodFn).toHaveBeenCalledWith({
        contactMethod: 'EMAIL',
        email: 'a@gmail.com',
        isNotificationsEnabled: true,
        preferredLanguage: 'EN',
        saveContactMethod: true
      });
    });
  });

  describe('go back', () => {
    it('should call goBack when click CANCEL button', () => {
      const goBack = jest.fn();

      const { container } = createComponent({ goBack });

      fireEvent.click(container.querySelector('.action-bar--left-buttons button'));

      expect(goBack).toHaveBeenCalled();
    });

    it('should not call goBack when click done button', () => {
      const goBack = jest.fn();

      const wrapper = createComponent({ goBack, asyncGoBack: true, isInternationalBooking: true, isLoggedIn: true });

      fireEvent.click(screen.getByText('Email'));

      const button = wrapper.getByText('SHARED__BUTTON_TEXT__DONE');

      fireEvent.click(button);

      expect(goBack).not.toHaveBeenCalled();
    });
  });

  const createComponent = (props = {}, state = {}) => {
    const defaultProps = {
      asyncGoBack: false,
      contactMethodInfo: {},
      formId: 'CONTACT_METHOD_FORM',
      goBack: jest.fn(),
      isAirBooking: false,
      isAlreadyHasContactMethod: false,
      isInternationalBooking: false,
      isLoggedIn: false,
      updateContactMethodFn: jest.fn()
    };
    const newProps = {
      ...defaultProps,
      ...props
    };

    const store = createMockedFormStore({
      app: {},
      router: {
        location: {
          search: 'search'
        }
      },
      ...state
    });

    return render(
      <Provider store={createMockedFormStore(store)}>
        <ContactMethodPage {...newProps} />
      </Provider>
    );
  };
});

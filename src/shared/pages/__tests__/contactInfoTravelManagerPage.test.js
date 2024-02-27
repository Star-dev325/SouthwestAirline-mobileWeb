import React from 'react';
import _ from 'lodash';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import ContactInfoTravelManagerPage from 'src/shared/pages/contactInfoTravelManagerPage';

describe('contact info travel manager page', () => {
  const clickCallOption = (container) => {
    fireEvent.click(container);
  };

  describe('contact travel info method', () => {
    it('should render contact info travel page', () => {
      const contactInfoTravelMethodWrapper = createComponent({ onSubmit: jest.fn() });

      expect(contactInfoTravelMethodWrapper.container.querySelector('.page-header')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
      expect(createComponent({ onSubmit: jest.fn() })).toMatchSnapshot();
    });

    it('should set contact method email when contact method is EMAIL_ME', () => {
      const dutyOfCareContact = {
        contactEmail: '123@gnmail.com',
        contactMethod: 'EMAIL_ME',
        contactPhone: { countryCode: '1', number: '2145551234' }
      };

      expect(createComponent({ onSubmit: jest.fn(), dutyOfCareContact })).toMatchSnapshot();
    });

    it('should set contact method email when contact method is null', () => {
      const dutyOfCareContact = {
        contactEmail: null,
        contactMethod: null,
        contactPhone: null
      };

      expect(createComponent({ dutyOfCareContact })).toMatchSnapshot();
    });

    it('should call updateContactMethodStub on done button click', () => {
      const updateContactInfoTravelManagerFn = jest.fn();
      const updateFormFieldDataValueFn = jest.fn();
      const contactInfoTravelMethodWrapper = createComponent({ onSubmit: jest.fn(), updateContactInfoTravelManagerFn, updateFormFieldDataValueFn });

      const emailItemWrapper = contactInfoTravelMethodWrapper.container.querySelectorAll('.contact-method-item')[1];

      clickCallOption(emailItemWrapper);

      const emailInputWrapper = contactInfoTravelMethodWrapper.container
        .querySelector('.contact-email-field')
        .querySelector('input');

      fireEvent.change(emailInputWrapper, { target: { value: 'a@gmail.com' } });

      const button = contactInfoTravelMethodWrapper.getByText('SHARED__BUTTON_TEXT__DONE');

      clickCallOption(button);

      expect(updateContactInfoTravelManagerFn).toHaveBeenCalled();
    });

    it('should call updateFormFieldDataValueFn on done button click when phone number is entered', () => {
      const updateContactInfoTravelManagerFn = jest.fn();
      const updateFormFieldDataValueFn = jest.fn();
      const contactInfoTravelMethodWrapper = createComponent({ onSubmit: jest.fn(), updateContactInfoTravelManagerFn, updateFormFieldDataValueFn });

      const declineNotification = contactInfoTravelMethodWrapper.container.querySelectorAll('.contact-method-item')[0];

      clickCallOption(declineNotification);

      const button = contactInfoTravelMethodWrapper.getByText('SHARED__BUTTON_TEXT__DONE');

      clickCallOption(button);

      expect(updateFormFieldDataValueFn).toHaveBeenCalled();
    });

    it('should call updateFormFieldDataValueFn on done button click when decline notification is selected', () => {
      const updateContactInfoTravelManagerFn = jest.fn();
      const updateFormFieldDataValueFn = jest.fn();
      const contactInfoTravelMethodWrapper = createComponent({ onSubmit: jest.fn(), isAirBooking: true, dutyOfCareContact: {}, updateContactInfoTravelManagerFn, updateFormFieldDataValueFn });

      const declineNotification = contactInfoTravelMethodWrapper.container.querySelectorAll('.checkbox-button')[0];
      
      clickCallOption(declineNotification);

      const button = contactInfoTravelMethodWrapper.getByText('SHARED__BUTTON_TEXT__DONE');

      clickCallOption(button);

      expect(updateFormFieldDataValueFn).toHaveBeenCalled();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      formId: 'CONTACT_TRAVEL_MANAGER_METHOD_FORM',
      updateContactInfoTravelManagerFn: jest.fn(),
      goBack: jest.fn(),
      dutyOfCareContact: {
        contactEmail: null,
        contactMethod: 'CALL_ME',
        contactPhone: { countryCode: '1', number: '2145551234' }
      },
      isLoggedIn: false,
      asyncGoBack: false
    };

    const store = createMockedFormStore({
      app: {},
      router: {
        location: {
          search: 'search'
        }
      }
    });

    return render(
      <Provider store={store}>
        <ContactInfoTravelManagerPage {..._.merge({}, defaultProps, props)} />
      </Provider>
    );
  };
});

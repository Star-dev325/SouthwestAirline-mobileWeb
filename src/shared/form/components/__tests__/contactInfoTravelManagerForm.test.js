jest.mock('src/shared/components/phoneCountryCodeList', () => (props) => (
  <div onClick={() => props.onCountryCodeSelect({ countryCode: '+1' })}>CountryCodeSelect</div>
));
jest.mock('src/shared/components/fullScreenModal/fullScreenModal', () => (props) => <div>{props.children}</div>);

import React from 'react';
import _ from 'lodash';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import ContactInfoTravelManagerForm from 'src/shared/form/components/contactInfoTravelManagerForm';
import * as FullScreenModalHelper from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';

describe('contact info travel manager form', () => {
  describe('domestic contact info method', () => {
    const state = {
      router: {
        location: {
          search: '_modal=countryCode'
        }
      },
      app: {
        formData: {
          AIR_BOOKING_CONTACT_TRAVEL_MANAGER_METHOD_FORM: {
            url: '/air/booking/contact-method',
            data: {
              contactMethod: 'CALL',
              phoneCountryCode: '1',
              phoneNumber: '123-345-6567'
            }
          }
        }
      }
    };

    const clickCallOption = (container) => {
      fireEvent.click(container);
    };

    const callSubmit = (container) => {
      fireEvent.submit(container);
    };

    it('should render correct components', () => {
      const contactInfoTravelManagerMethod = createComponent();

      expect(contactInfoTravelManagerMethod).toMatchSnapshot();
    });

    it('should display phone number field when click Call', () => {
      const contactInfoTravelManagerMethod = createComponent();
      const callItemWrapper = contactInfoTravelManagerMethod.container.querySelector('.contact-method-options');

      clickCallOption(callItemWrapper.children[0]);

      expect(contactInfoTravelManagerMethod.container.querySelector('.phone-number-field')).toBeDefined();
    });

    it('should display phone number field when click Text', () => {
      const contactInfoTravelManagerMethod = createComponent();
      const textItemWrapper = contactInfoTravelManagerMethod.container.querySelector('.contact-method-options');

      clickCallOption(textItemWrapper.children[0]);

      expect(contactInfoTravelManagerMethod.container.querySelector('.phone-number-field')).toBeDefined();
    });

    it('should display email field when click Email', () => {
      const contactInfoTravelManagerMethod = createComponent();
      const emailItemWrapper = contactInfoTravelManagerMethod.container.querySelector('.contact-method-options');

      clickCallOption(emailItemWrapper.children[1]);

      expect(contactInfoTravelManagerMethod.container.querySelector('.contact-email-field')).toBeDefined();
    });

    it('should call goBackMock when click CANCEL button', () => {
      const goBackMockFn = jest.fn();
      const contactInfoTravelManagerMethod = createComponent({ goBack: goBackMockFn });
      const cancelButtonWrapper = contactInfoTravelManagerMethod.container.querySelector('.action-bar--left-buttons');

      clickCallOption(cancelButtonWrapper.querySelector('button'));

      expect(goBackMockFn).toHaveBeenCalled();
    });

    it('should display PhoneCountryCodeList when click phone number label', () => {
      const showFullScreenModalFnMock = jest.fn();

      jest.spyOn(FullScreenModalHelper, 'showFullScreenModal').mockImplementation(showFullScreenModalFnMock);

      const contactInfoTravelManagerMethod = createComponent();
      const callItemWrapper = contactInfoTravelManagerMethod.container.querySelector('.contact-method-options');

      clickCallOption(callItemWrapper.children[0]);

      const countryCodeWrapper = contactInfoTravelManagerMethod.container.querySelector('.phone-number-field');

      clickCallOption(countryCodeWrapper.querySelector('.input--label'));

      expect(showFullScreenModalFnMock).toHaveBeenCalled();
    });

    it('should not render phone/email options when decline option is selected', () => {
      const contactInfoTravelManagerMethod = createComponent({ declineNotifications: false }, state);
      const elements = contactInfoTravelManagerMethod.container.querySelector('[name="declineNotifications"]');

      clickCallOption(elements.children[0]);

      expect(contactInfoTravelManagerMethod.container.querySelector('.input--label')).toBeNull();
    });

    it('should change the country code', async () => {
      const contactInfoTravelManagerMethod = createComponent({ declineNotifications: false }, state);
      const elements = contactInfoTravelManagerMethod.container.querySelector('li.contact-method-item');

      clickCallOption(elements.children[0]);

      const listItem = await contactInfoTravelManagerMethod.findByText('CountryCodeSelect');

      expect(listItem).toBeDefined();

      clickCallOption(listItem);

      callSubmit(contactInfoTravelManagerMethod.container.querySelector('form'));
    });
  });

  const createComponent = (props = {}, state = {}) => {
    const defaultProps = {
      formId: 'CONTACT_INFO_TRAVEL_MANAGER_METHOD_FORM',
      formData: {
        contactMethod: 'TEXT123',
        declineNotifications: false,
        disclaimerText: 'TEXT',
        email: null,
        isNotificationsEnabled: false,
        phoneCountryCode: '1',
        phoneNumber: '2145551234'
      },
      isAirBooking: true,
      isLoggedIn: false,
      onSubmit: jest.fn(),
      goBack: jest.fn(),
      onChange: jest.fn(),
      initialFormData: {
        contactMethod: 'TEXT123',
        declineNotifications: false,
        disclaimerText: 'TEXT',
        email: null,
        isNotificationsEnabled: false,
        phoneCountryCode: '1',
        phoneNumber: '2145551234'
      }
    };
    const store = createMockedFormStore(
      _.merge(
        {},
        {
          app: {},
          router: {
            location: {
              search: 'search'
            }
          }
        },
        state
      )
    );

    return render(
      <Provider store={store}>
        <ContactInfoTravelManagerForm {...defaultProps} {...props} />
      </Provider>
    );
  };
});

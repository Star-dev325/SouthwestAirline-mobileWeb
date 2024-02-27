import { storiesOf } from '@storybook/react';
import React from 'react';

import ContactMethodForm from 'src/shared/form/components/contactMethodForm';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';

storiesOf('components/contactMethodForm', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('domestic', () => {
    return (
      <div>
        <ContactMethodForm
          formId="storyForDomestic"
          onSubmit={_.noop}
          initialFormData={{
            contactMethod: 'CALL'
          }}
          isInternationalBooking={false}
          isAlreadyHasContactMethod={false}
          isLoggedIn
          goBack={_.noop}
        />
      </div>
    );
  })
  .add('international', () => {
    return (
      <div>
        <ContactMethodForm
          formId="storyForInternational"
          onSubmit={_.noop}
          initialFormData={{
            contactMethod: 'EMAIL'
          }}
          isInternationalBooking
          isAlreadyHasContactMethod
          isLoggedIn
          goBack={_.noop}
        />
      </div>
    );
  })
  .add('domestic air booking', () => {
    return (
      <div>
        <ContactMethodForm
          formId="AIR_BOOKING_CONTACT_METHOD_FORM"
          onSubmit={_.noop}
          initialFormData={{
            contactMethod: 'TEXT',
            phoneCountryCode: '1',
            phoneNumber: '657-567-6759',
            preferredLanguage: 'ES'
          }}
          isAirBooking
          isAlreadyHasContactMethod
          isLoggedIn
          goBack={_.noop}
        />
      </div>
    );
  })
  .add('international air booking', () => {
    return (
      <div>
        <ContactMethodForm
          formId="AIR_BOOKING_CONTACT_METHOD_FORM"
          onSubmit={_.noop}
          initialFormData={{
            contactMethod: 'EMAIL',
            declineNotifications: false,
            email: 'email@wnco.com',
            isNotificationsEnabled: true,
            preferredLanguage: 'EN'
          }}
          isAirBooking
          isInternationalBooking
          isAlreadyHasContactMethod
          isLoggedIn
          goBack={_.noop}
        />
      </div>
    );
  });

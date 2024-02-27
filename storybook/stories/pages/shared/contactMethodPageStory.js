import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';

import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import ContactMethodPage from 'src/shared/pages/contactMethodPage';
import configureMockStore from 'redux-mock-store';

const store = configureMockStore()({
  app: {},
  router: {
    location: {
      search: 'search'
    }
  }
});

storiesOf('pages/shared/contactMethodPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('domestic', () => (
    <ContactMethodPage
      contactMethodInfo={{
        contactMethod: 'EMAIL'
      }}
      formId="storyForDomestic"
      goBack={_.noop}
      isAlreadyHasContactMethod={false}
      isInternationalBooking={false}
      updateContactMethodFn={_.noop}
    />
  ))
  .add('international', () => (
    <ContactMethodPage
      contactMethodInfo={{
        contactMethod: 'CALL'
      }}
      formId="storyForInternational"
      goBack={_.noop}
      isAlreadyHasContactMethod
      isInternationalBooking
      isLoggedIn
      updateContactMethodFn={_.noop}
    />
  ))
  .add('domestic day of travel with email and message', () => (
    <ContactMethodPage
      contactMethodInfo={{
        contactMethod: 'EMAIL'
      }}
      formId="DAY_OF_TRAVEL_CONTACT_METHOD_FORM"
      goBack={_.noop}
      isAlreadyHasContactMethod={false}
      isInternationalBooking={false}
      message="The information you provide will be used to notify you about any changes to your flight(s). Changing your preferred method of contact (i.e. email to SMS text) will not remove the previously entered contact method. In addition, only the latest entry for each will receive the flight notification."
      updateContactMethodFn={_.noop}
    />
  ))
  .add('domestic day of travel with text and message', () => (
    <ContactMethodPage
      contactMethodInfo={{
        contactMethod: 'TEXT'
      }}
      formId="DAY_OF_TRAVEL_CONTACT_METHOD_FORM"
      goBack={_.noop}
      isAlreadyHasContactMethod={false}
      isInternationalBooking={false}
      message="The information you provide will be used to notify you about any changes to your flight(s). Changing your preferred method of contact (i.e. email to SMS text) will not remove the previously entered contact method. In addition, only the latest entry for each will receive the flight notification."
      updateContactMethodFn={_.noop}
    />
  ))
  .add('domestic day of travel with call and message', () => (
    <ContactMethodPage
      contactMethodInfo={{
        contactMethod: 'CALL'
      }}
      formId="DAY_OF_TRAVEL_CONTACT_METHOD_FORM"
      goBack={_.noop}
      isAlreadyHasContactMethod={false}
      isInternationalBooking={false}
      message="The information you provide will be used to notify you about any changes to your flight(s). Changing your preferred method of contact (i.e. email to SMS text) will not remove the previously entered contact method. In addition, only the latest entry for each will receive the flight notification."
      updateContactMethodFn={_.noop}
    />
  ))
  .add('international day of travel', () => (
    <ContactMethodPage
      contactMethodInfo={{
        contactMethod: 'EMAIL',
        email: 'email@wnco.com'
      }}
      formId="DAY_OF_TRAVEL_CONTACT_METHOD_FORM"
      goBack={_.noop}
      isAlreadyHasContactMethod={false}
      isInternationalBooking={true}
      message="A Reservation may only contain one contact method. By providing your contact information you are granting Southwest Airlines permission to send operational information on your flights."
      updateContactMethodFn={_.noop}
    />
  ))
  .add('international day of travel and has no notifications', () => (
    <ContactMethodPage
      contactMethodInfo={{
        contactMethod: 'EMAIL',
        declineNotifications: true
      }}
      formId="DAY_OF_TRAVEL_CONTACT_METHOD_FORM"
      goBack={_.noop}
      isAlreadyHasContactMethod={false}
      isInternationalBooking={true}
      message="The information you provide will be used to notify you about any changes to your flight(s). Changing your preferred method of contact (i.e. email to SMS text) will not remove the previously entered contact method. In addition, only the latest entry for each will receive the flight notification."
      updateContactMethodFn={_.noop}
    />
  ));

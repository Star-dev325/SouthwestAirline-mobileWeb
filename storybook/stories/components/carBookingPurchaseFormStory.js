import { storiesOf } from '@storybook/react';
import React from 'react';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import CarBookingPurchaseForm from 'src/carBooking/components/carBookingPurchaseForm';

const notLoggedInProps = {
  formId: 'formId',
  onSubmit: _.noop,
  totalWithTaxesAndCurrencyCode: { amount: '141.00', currencyCode: 'USD' },
  isUserLoggedIn: false,
  driverInfo: null
};

const loggedInProps = {
  ...notLoggedInProps,
  isUserLoggedIn: true,
  driverInfo: {
    firstName: 'Fred',
    middleName: 'Edward',
    lastName: 'Flintstone',
    accountNumber: '601005646'
  }
};

storiesOf('components/carBookingPurchaseForm', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <CarBookingPurchaseForm {...notLoggedInProps} />;
  })
  .add('logged in', () => {
    return <CarBookingPurchaseForm {...loggedInProps} />;
  });

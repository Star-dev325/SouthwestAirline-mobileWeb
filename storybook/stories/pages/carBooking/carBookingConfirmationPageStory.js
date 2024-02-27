import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import React from 'react';
import _ from 'lodash';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import CarReservationBuilder from 'test/builders/model/carReservationBuilder';
import { CarBookingConfirmationPage } from 'src/carBooking/pages/carBookingConfirmationPage';

const defaultProps = {
  carReservation: new CarReservationBuilder().build(),
  bookingResponse: {
    confirmationNumber: 'AJC129876234',
    driver: {
      firstName: 'Amy',
      lastName: 'Awesome'
    }
  },
  isWebView: false,
  history: {
    push: _.noop
  },
  enableNavigationControlsFn: _.noop
};

storiesOf('pages/carBooking/carBookingConfirmationPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <CarBookingConfirmationPage {...defaultProps} />;
  });

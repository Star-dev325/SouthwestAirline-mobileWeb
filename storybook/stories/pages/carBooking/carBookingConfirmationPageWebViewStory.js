import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import React from 'react';
import _ from 'lodash';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import CarReservationBuilder from 'test/builders/model/carReservationBuilder';
import { CarBookingConfirmationPage } from 'src/carBooking/pages/carBookingConfirmationPage';

const EnhancedCarBookingConfirmationPage = withBodyClass('is-webview')(CarBookingConfirmationPage);

const defaultProps = {
  carReservation: new CarReservationBuilder().build(),
  bookingResponse: {
    confirmationNumber: 'AJC129876234',
    driver: {
      firstName: 'Amy',
      lastName: 'Awesome'
    }
  },
  isWebView: true,
  history: {
    push: _.noop
  },
  enableNavigationControlsFn: _.noop,
  displayAppReviewFn: _.noop
};

const store = createMockedFormStore({
  app: {
    webView: {
      isWebView: true
    }
  }
});

storiesOf('pages/carBooking/carBookingConfirmationPageWebView', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('webview', () => {
    return <EnhancedCarBookingConfirmationPage {...defaultProps} />;
  });

import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import React from 'react';
import _ from 'lodash';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import CarReservationBuilder from 'test/builders/model/carReservationBuilder';
import { CarBookingPricingPage } from 'src/carBooking/pages/carBookingPricingPage';

const EnhancedWebViewCarBookingPricingPage = withBodyClass(['car-booking_price', 'is-webview'])(CarBookingPricingPage);

const carExtras = [
  { type: 'SKI_RACK', description: 'Ski Rack' },
  { type: 'GPS', description: 'GPS' }
];

const defaultProps = {
  carReservation: new CarReservationBuilder().build(),
  carExtras,
  productId: 'product-id',
  push: _.noop,
  saveSelectedExtrasFn: _.noop,
  loadUserAccountInfoFn: _.noop,
  isUserLoggedIn: false
};

const propsWithWebView = _.merge({}, defaultProps, {
  isWebView: true
});
const webViewStore = {
  app: {
    webView: {
      isWebView: true
    }
  }
};

storiesOf('pages/carBooking/carBookingPricingPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <CarBookingPricingPage {...defaultProps} />;
  });

storiesOf('pages/carBooking/carBookingPricingPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(createMockedFormStore(webViewStore)))
  .add('webview', () => {
    return <EnhancedWebViewCarBookingPricingPage {...propsWithWebView} />;
  });

import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import React from 'react';
import _ from 'lodash';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { CarBookingPurchasePage } from 'src/carBooking/pages/carBookingPurchasePage';

const EnhancedWebViewCarBookingPurchasePage = withBodyClass(['car-booking_purchase', 'is-webview'])(
  CarBookingPurchasePage
);

const driverInfo = {
  firstName: 'Alex',
  lastName: 'Fisher',
  accountNumber: '601005646'
};
const contactInfo = {
  confirmationEmail: 'test@test.com',
  driverPhoneNumber: '812-926-1966',
  driverCountryCode: '1',
  driverIsoCountryCode: 'US'
};
const selectedCarResult = {
  imageUrl: '/some/url/image',
  vendorName: 'Hertz',
  productId: 'product-id',
  isRapidRewardsPartner: true,
  isUnavailable: false,
  pricePerDayCents: 10199,
  promoCodeApplied: false,
  totalCentsWithTaxes: 15299
};

const notLoggedInProps = {
  totalWithTaxesAndCurrencyCode: {
    amount: '200.99',
    currencyCode: 'USD'
  },
  reserveCarFn: _.noop,
  isUserLoggedIn: false,
  selectedCarResult,
  selectedExtras: [],
  push: _.noop
};

const loggedInProps = {
  ...notLoggedInProps,
  driverInfo,
  contactInfo,
  isUserLoggedIn: true
};

const notLoggedInPropsWithWebView = _.merge({}, notLoggedInProps, {
  isWebView: true
});

const store = {
  app: {
    webView: {
      isWebView: true
    }
  }
};

storiesOf('pages/carBooking/carBookingPurchasePage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <CarBookingPurchasePage {...notLoggedInProps} />;
  })
  .add('log in for faster checkout', () => {
    return <CarBookingPurchasePage {...notLoggedInPropsWithWebView} />;
  })
  .add('logged in', () => {
    return <CarBookingPurchasePage {...loggedInProps} />;
  });

storiesOf('pages/carBooking/carBookingPurchasePage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(createMockedFormStore(store)))
  .add('webview', () => {
    return <EnhancedWebViewCarBookingPurchasePage {...notLoggedInPropsWithWebView} />;
  });

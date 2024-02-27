import { storiesOf } from '@storybook/react';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import StoryRouter from 'storybook-router';

import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { EarlyBirdConfirmationPage } from 'src/earlyBird/pages/earlyBirdConfirmationPage';
import EarlyBirdConfirmationResponseBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/earlyBird/earlyBirdConfirmationPageBuilder';

const earlyBirdConfirmationResponse = new EarlyBirdConfirmationResponseBuilder().build();
const earlyBirdWithApplePayConfirmationResponse = new EarlyBirdConfirmationResponseBuilder().withApplePay().build();

const props = {
  earlyBirdConfirmationPage: earlyBirdConfirmationResponse,
  saveCreditCardFn: () => {},
  paymentInfo: {}
};

const withApplePayProps = {
  earlyBirdConfirmationPage: earlyBirdWithApplePayConfirmationResponse,
  saveCreditCardFn: () => {},
  paymentInfo: {}
};

const store = configureMockStore()({
  app: {
    wcmContent: {
      applicationProperties: {}
    }
  },
  router: {
    location: '/earlybird/confirmation'
  }
});

storiesOf('pages/earlyBird/earlyBirdConfirmationPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <EarlyBirdConfirmationPage {...props} />;
  })
  .add('withApplePay', () => {
    return <EarlyBirdConfirmationPage {...withApplePayProps} />;
  });

import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-router';
import configureMockStore from 'redux-mock-store';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { CompanionConfirmationPage } from 'src/companion/pages/companionConfirmationPage';
import FlightsPurchasePageBuilder from 'test/builders/apiResponse/flightsPurchasePageBuilder';

const response = new FlightsPurchasePageBuilder().build().flightConfirmationPage;
const props = {
  ...response,
  blockSeniorFareShopping: true
};

const store = configureMockStore()({
  app: {},
  router: {
    location: {
      search: 'search'
    }
  },
  toggles: {}
});

storiesOf('pages/companion/companionConfirmationPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <CompanionConfirmationPage {...props} />;
  })
  .add('funds with no expiration date text', () => {
    const response = new FlightsPurchasePageBuilder().withNoExpirationDateTextFundsApplied().build().flightConfirmationPage;

    return <CompanionConfirmationPage {...props} {...response} />;
  });

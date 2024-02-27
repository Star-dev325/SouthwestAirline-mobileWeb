import { storiesOf } from '@storybook/react';
import _ from 'lodash';
import React from 'react';
import StoryRouter from 'storybook-router';
import configureMockStore from 'redux-mock-store';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { CompanionPassengerPage } from 'src/companion/pages/companionPassengerPage';

const store = configureMockStore()({
  app: {},
  router: {
    location: {
      search: 'search'
    }
  },
  toggles: {}
});

const props = {
  push: () => {},
  saveCompanionPassengerFn: () => {},
  contactMethodContent: 'Email, a@gmail.com',
  declineNotifications: false,
  isInternationalBooking: false,
  fetchSavedCreditCardsAndGoToNextPageFn: () => {},
  formData: {
    emailReceiptTo: 'aterris@example.com',
    shareItineraryEmail: 'test@test.com',
    redressNumber: '123456',
    knownTravelerNumber: '12345678'
  },
  companionInfo: {
    name: 'Companion Fang',
    gender: 'F',
    dateOfBirth: '1995-02-05'
  }
};

storiesOf('pages/companion/companionPassengerPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <CompanionPassengerPage {...props} />;
  })
  .add('Missing date of birth', () => {
    return <CompanionPassengerPage {..._.omit(props, 'companionInfo.dateOfBirth')} />;
  })
  .add('Missing gender', () => {
    return <CompanionPassengerPage {..._.omit(props, 'companionInfo.gender')} />;
  });

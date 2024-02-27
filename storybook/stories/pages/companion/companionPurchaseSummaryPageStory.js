import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-router';
import configureMockStore from 'redux-mock-store';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { CompanionPurchaseSummaryPage } from 'src/companion/pages/companionPurchaseSummaryPage';
import { getPassengerInfos } from 'test/builders/model/passengerInfosBuilder';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';
import EarlyBirdEligibilityBuilder from 'test/builders/model/earlyBirdEligibilityBuilder';
import ContactMethodInfoBuilder from 'test/builders/model/contactMethodInfoBuilder';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import BriefBoundBuilder from 'test/builders/model/briefBoundBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import _ from 'lodash';

const outbound = new BriefBoundBuilder().build();
const inbound = new BriefBoundBuilder()
  .withDepartureAirportCode('OAK')
  .withArrivalAirportCode('LAS')
  .withDepartureDate('2017-11-28')
  .withDepartureDayOfWeek('Tuesday')
  .build();
const tripSummary = {
  bounds: [outbound, inbound],
  passengerCountDescription: '2 Passenger Total',
  currency: {
    amount: '234.30',
    currencyCode: 'USD',
    currencySymbol: '$'
  }
};
const passengers = [
  {
    name: 'Amber Awesome'
  }
];
const priceTotal = new PriceTotalBuilder().build();
const contactMethodInfo = new ContactMethodInfoBuilder().build();
const passengerInfos = getPassengerInfos();
const props = {
  isLoggedIn: true,
  priceTotal,
  purchaseSummaryPage: {
    tripSummary,
    passengers,
    priceTotal
  },
  paymentInfo: {},
  savedCreditCards: new PaymentSavedCreditCardsBuilder().build(),
  contactMethodInfo,
  flightPricingPageResponse: new PricesBuilder().build(),
  passengerInfos,
  shouldShowEarlyBirdInPath: true,
  earlyBirdEligibility: new EarlyBirdEligibilityBuilder().build(),
  push: () => {},
  savePurchaseSummaryFormFn: () => {},
  fetchEarlybirdPricingFn: () => {},
  shouldResumeDataFn: _.noop,
  resumeDataFn: _.noop,
  shouldGotoPayPalSignInFn: _.noop,
  gotoPayPalSignInFn: _.noop
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

storiesOf('pages/companion/companionPurchaseSummaryPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <CompanionPurchaseSummaryPage {...props} />;
  });

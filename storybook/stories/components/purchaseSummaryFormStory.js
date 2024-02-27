import { storiesOf } from '@storybook/react';
import React from 'react';
import PurchaseSummaryForm from 'src/shared/components/purchaseSummaryForm';
import BriefBoundBuilder from 'test/builders/model/briefBoundBuilder';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';

import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';

const store = createMockedFormStore();

const outbound = new BriefBoundBuilder().build();
const inbound = new BriefBoundBuilder()
  .withDepartureAirportCode('OAK')
  .withArrivalAirportCode('LAS')
  .withDepartureDate('2017-11-28')
  .withDepartureDayOfWeek('Tuesday')
  .build();
const dollarsPurchaseSummaryFormProps = {
  tripSummary: {
    bounds: [outbound, inbound],
    passengerCountDescription: '2 Passenger Total',
    currency: {
      amount: '234.30',
      currencyCode: 'USD',
      currencySymbol: '$'
    }
  },
  passengers: [
    {
      name: 'Amber Awesome',
      rapidRewardsNumber: '8349157375'
    },
    {
      name: 'Michael Lacy'
    }
  ],
  priceTotal: new PriceTotalBuilder().build(),
  initialFormData: {
    paymentInfo: {}
  },
  requireSecurityCodeForSavedCreditCard: true,
  savedCreditCards: new PaymentSavedCreditCardsBuilder().build()
};

const internationalPurchaseSummaryFormProps = {
  ...dollarsPurchaseSummaryFormProps,
  declineNotifications: true,
  isInternationalBooking: true
};

storiesOf('components/purchaseSummaryForm', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <PurchaseSummaryForm {...dollarsPurchaseSummaryFormProps} />;
  })
  .add('international', () => {
    return <PurchaseSummaryForm {...internationalPurchaseSummaryFormProps} />;
  });

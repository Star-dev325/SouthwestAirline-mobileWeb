import { storiesOf } from '@storybook/react';
import React from 'react';
import EarlyBirdPriceSubtotal from 'src/earlyBird/components/earlyBirdPriceSubtotal';

const subtotal = {
  departureAirportCode: 'DAL',
  arrivalAirportCode: 'HOU',
  earlyBirdBoundPrice: {
    amount: '15.00',
    currencyCode: 'USD',
    currencySymbol: '$'
  },
  flight: '101/102',
  selectedPaxCount: 2,
  totalBoundPrice: {
    amount: '30.00',
    currencyCode: 'USD',
    currencySymbol: '$'
  }
};

storiesOf('components/earlyBirdPriceSubtotal', module).add('default', () => {
  return <EarlyBirdPriceSubtotal subtotal={subtotal} />;
});

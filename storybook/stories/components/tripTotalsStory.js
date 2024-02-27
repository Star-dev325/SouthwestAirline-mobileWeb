import { storiesOf } from '@storybook/react';
import React from 'react';
import TripTotalsTable from 'src/airChange/components/tripTotals';

const moneyProps = {
  originalTripCost: {
    item: 'Original trip cost',
    fare: {
      amount: '577.68',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    tax: null
  },
  newTripCost: {
    item: 'New trip cost',
    fare: {
      amount: '66.80',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    tax: null
  },
  travelFunds: {
    item: 'Travel Funds applied',
    fare: {
      amount: '3.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    tax: null
  }
};

const pointsProps = {
  originalTripCost: {
    item: 'Original trip cost',
    fare: {
      amount: '14,598',
      currencyCode: 'PTS',
      currencySymbol: null
    },
    tax: {
      amount: '5.60',
      currencyCode: 'USD',
      currencySymbol: '$'
    }
  },
  newTripCost: {
    item: 'New trip cost',
    fare: {
      amount: '12,398',
      currencyCode: 'PTS',
      currencySymbol: null
    },
    tax: {
      amount: '8.40',
      currencyCode: 'USD',
      currencySymbol: '$'
    }
  },
  travelFunds: {
    item: 'Travel Funds applied',
    fare: {
      amount: '3.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    tax: null
  }
};

storiesOf('components/tripTotalsTable', module)
  .add('money change', () => {
    return <TripTotalsTable {...moneyProps} />;
  })
  .add('points change', () => {
    return <TripTotalsTable {...pointsProps} />;
  });

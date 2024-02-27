import React from 'react';
import { storiesOf } from '@storybook/react';
import TitleAndPrice from 'src/shared/components/flightSummary/titleAndPrice';

const dollarProps = {
  message: '1 Passenger Total',
  currency: {
    amount: '21.20',
    currencyCode: 'USD',
    currencySymbol: '$'
  }
};

const pointsProps = {
  message: '2 Passenger Total',
  currency: {
    amount: '12,120',
    currencyCode: 'PTS'
  }
};

storiesOf('components/titleAndPrice', module)
  .add('dollar', () => {
    return <TitleAndPrice {...dollarProps} />;
  })
  .add('points', () => {
    return <TitleAndPrice {...pointsProps} />;
  });

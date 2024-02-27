import { storiesOf } from '@storybook/react';
import React from 'react';
import EarlyBirdInPathPriceTotal from 'src/shared/components/earlyBirdInPathPriceTotal';

const unitPrice = { amount: '15.00', currencyCode: 'USD', currencySymbol: '$' };
const totalPrice = { amount: '30.00', currencyCode: 'USD', currencySymbol: '$' };

storiesOf('components/earlyBirdInPathPriceTotal', module).add('default', () => {
  return (
    <EarlyBirdInPathPriceTotal
      unitPrice={unitPrice}
      total={totalPrice}
      purchasedCount={2}
      description={'EarlyBird Check-In® (ATL - MDW)'}
    />
  );
});

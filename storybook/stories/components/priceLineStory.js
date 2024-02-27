import React from 'react';
import { storiesOf } from '@storybook/react';
import PriceLine from 'src/shared/components/priceLine';

storiesOf('components/priceLine', module).add('default', () => {
  return (
    <PriceLine
      title="Adult base fare"
      total={{
        amount: '123.4',
        currencyCode: 'USD',
        currencySymbol: '$'
      }}
      sign="+"
    />
  );
});

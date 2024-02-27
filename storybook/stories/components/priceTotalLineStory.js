import React from 'react';
import { storiesOf } from '@storybook/react';
import PriceTotalLine from 'src/shared/components/priceTotalLine';
import i18n from '@swa-ui/locale';

storiesOf('components/priceTotalLine', module).add('default', () => {
  return (
    <div>
      <PriceTotalLine
        className="mb4"
        title={i18n('SHARED__PRICE_LINE_TITLES__TOTAL_PER_PASSENGER')}
        total={{
          amount: '123.4',
          currencyCode: 'USD',
          currencySymbol: '$',
          currencyType: 'total'
        }}
      />
    </div>
  );
});

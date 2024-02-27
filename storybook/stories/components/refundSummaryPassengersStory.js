import { storiesOf } from '@storybook/react';
import React from 'react';
import RefundSummaryPassengers from 'src/shared/components/refundSummaryPassengers';
import i18n from '@swa-ui/locale';

storiesOf('components/refundSummaryPassengers', module).add('default', () => {
  const passengers = [
    {
      displayName: 'YANG LU',
      firstName: 'Yang',
      lastName: 'Lu'
    },
    {
      displayName: 'TEST WANG',
      firstName: 'Test',
      lastName: 'Wang'
    }
  ];

  return (
    <div>
      <RefundSummaryPassengers
        passengerLabel={i18n('AIR_CANCEL__FLIGHT_INFO__PASSENGERS')}
        passengers={passengers}
        recordLocator="ABCDEF"
      />
    </div>
  );
});

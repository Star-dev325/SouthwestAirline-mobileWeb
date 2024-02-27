import { storiesOf } from '@storybook/react';
import React from 'react';
import BoundDetailBuilder from 'test/builders/model/boundDetailBuilder';
import ConfirmationTripHeader from 'src/shared/components/confirmationTripHeader';

storiesOf('components/confirmationTripHeader', module).add('default', () => {
  const pnrs = [
    {
      passengers: [
        {
          displayName: 'Andrew Terris',
          accountNumber: '123123123'
        },
        {
          displayName: 'Fisher King'
        }
      ],
      recordLocator: 'LDJS4B'
    }
  ];
  const bounds = [new BoundDetailBuilder().build()];
  return (
    <ConfirmationTripHeader
      dates={{
        first: '2017-12-14',
        second: '2017-12-28'
      }}
      destinationDescription="Austin"
      pnrs={pnrs}
      bounds={bounds}
    />
  );
});

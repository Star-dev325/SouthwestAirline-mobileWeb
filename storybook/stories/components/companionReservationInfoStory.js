import { storiesOf } from '@storybook/react';
import React from 'react';
import CompanionReservationInfo from 'src/viewReservation/components/companionReservationInfo';

storiesOf('components/companionReservationInfo', module).add('default', () => {
  return (
    <CompanionReservationInfo
      companionInfo={{
        companionFirstName: 'sadasdasdsadasdsadsadsadsadasdsadsadasdassa',
        companionLastName: 'sadasdasdsadasdsadsadsadsadasdsadsadasdassa'
      }}
    />
  );
});

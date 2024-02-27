import React from 'react';
import { storiesOf } from '@storybook/react';
import PassengerReservationInfo from 'src/shared/components/passengerReservationInfo';

const reservationGroups = [
  {
    recordLocator: '123ABD',
    passengers: [
      {
        secureFlightName: {
          firstName: 'Singaporian',
          lastName: 'Hfadfasfdasfasfasi'
        },
        isEarlyBird: true,
        knownTravelerId: '23123123',
        accountNumber: '213213213'
      },
      {
        secureFlightName: {
          firstName: 'Singapordfasffsadfasian',
          lastName: 'Hfdasdfasdfasdfdasfi'
        }
      }
    ]
  }
];

storiesOf('components/passengerReservationInfo', module).add('default', () => {
  return (
    <div>
      <PassengerReservationInfo reservationGroups={reservationGroups} />

      <PassengerReservationInfo reservationGroups={reservationGroups} shouldDisplayTsaPrecheck={false} />
    </div>
  );
});

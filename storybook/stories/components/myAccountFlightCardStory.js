//TODO: Should change file name to myAccountFlightCardDemo after refactor saved flight page
import React from 'react';
import { storiesOf } from '@storybook/react';
import MyAccountFlightCard from 'src/myAccount/components/myAccountFlightCard';
import ConfirmationNumberSubtitle from 'src/myAccount/components/confirmationNumberSubtitle';
import Button from 'src/shared/components/button';
import i18n from '@swa-ui/locale';

storiesOf('components/myAccountFlightCard', module).add('default', () => {
  const savedFlights = [
    {
      dates: {
        first: '2016-05-23',
        second: '2016-06-03'
      },
      originDescription: 'Houston (Hobby), TX',
      destinationDescription: 'Dallas (Love Field), TX',
      confirmationNumber: 'MISAPI'
    },
    {
      dates: {
        first: '2016-05-23',
        second: null
      },
      originDescription: 'Austin, TX',
      destinationDescription: 'Houston (Hobby), TX',
      confirmationNumber: '2IGGMN'
    }
  ];
  return (
    <div>
      {savedFlights.map((flight, key) => {
        const { dates, originDescription, destinationDescription, confirmationNumber } = flight;

        return (
          <MyAccountFlightCard
            dates={dates}
            originDescription={originDescription}
            destinationDescription={destinationDescription}
            key={key}
          >
            <ConfirmationNumberSubtitle confirmationNumber={confirmationNumber} />
            <Button size="larger" color="grey" fluid onClick={() => {}}>
              {i18n('MY_ACCOUNT__FLIGHT_CARD__REBOOK_IT')}
            </Button>
          </MyAccountFlightCard>
        );
      })}
    </div>
  );
});

import { storiesOf } from '@storybook/react';
import React from 'react';
import AlertBanner from 'src/viewReservation/components/alertBanner';

storiesOf('components/alertBanner', module)
  .add('default', () => {
    return <AlertBanner message="Something is going down!" />;
  })
  .add('hide alert Icon', () => {
    return <AlertBanner message="Something is going down!" hideAlertIcon />;
  });

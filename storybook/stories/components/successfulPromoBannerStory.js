import { storiesOf } from '@storybook/react';
import React from 'react';
import SuccessfulPromoBanner from 'src/carBooking/components/successfulPromoBanner';

storiesOf('components/successfulPromoBanner', module).add('default', () => {
  return <SuccessfulPromoBanner numberOfAppliedPromoCodes={1} />;
});

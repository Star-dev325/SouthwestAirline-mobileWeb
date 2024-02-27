import React from 'react';
import { storiesOf } from '@storybook/react';
import PartialBooking from 'src/airBooking/components/partialBooking';

const failedPassengers = ['Amber Awesome', 'Ron Hackmann', 'Long PassengernamePassengernamePassengername'];

storiesOf('components/partialBooking', module).add('default', () => {
  return <PartialBooking onSearchFlightClick={() => {}} failedPassengers={failedPassengers} />;
});

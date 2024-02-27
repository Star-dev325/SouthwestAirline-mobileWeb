import React from 'react';
import { storiesOf } from '@storybook/react';
import FlightTimes from 'src/shared/components/flightTimes';

storiesOf('components/flightTimes', module)
  .add('default', () => {
    return (
      <FlightTimes
        arrivalTime={'2015-03-26T08:25:00.000-05:00'}
        departureTime={'2015-03-26T10:35:00.000-05:00'}
        noTimezoneConversion
      />
    );
  })
  .add('isStretched', () => {
    return (
      <FlightTimes
        arrivalTime={'2015-03-26T08:25:00.000-05:00'}
        departureTime={'2015-03-26T10:35:00.000-05:00'}
        isStretched
      />
    );
  });

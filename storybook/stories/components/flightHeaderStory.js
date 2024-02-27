import React from 'react';
import { storiesOf } from '@storybook/react';

import FlightHeader from 'src/shared/components/flightHeader';

storiesOf('components/flightHeader', module).add('default', () => (
  <div className={'bgpdkblue'}>
    <FlightHeader
      arrivalTime={'2015-03-26T08:25:00.000-05:00'}
      departureTime={'2015-03-26T10:35:00.000-05:00'}
      flightNumbers={'42'}
      stopDescription={'Nonstop'}
      isNextDay={true}
    />
  </div>
));

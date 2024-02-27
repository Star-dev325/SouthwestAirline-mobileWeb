import React from 'react';
import { storiesOf } from '@storybook/react';
import FlightInfoBar from 'src/shared/components/flightInfoBar';

const flight1 = {
  flightInfo: { flightNumber: '1688', hasWifi: false, departureTime: '02:30', gate: null },
  title: 'DEPARTING'
};
const flight2 = {
  flightInfo: { flightNumber: '47', hasWifi: true, departureTime: '18:30', gate: 'A10' },
  title: 'CHANGE PLANES'
};
const flight3 = {
  flightInfo: { flightNumber: '233', hasWifi: false, departureTime: '18:30', gate: 'E8' },
  title: 'RETURNING'
};

storiesOf('components/flightInfoBar', module).add('default', () => {
  return (
    <div className="check-in-confirmation">
      <FlightInfoBar {...flight1} />
      <FlightInfoBar {...flight2} />
      <FlightInfoBar {...flight3} />
    </div>
  );
});

import React from 'react';
import { storiesOf } from '@storybook/react';
import FlightInfo from 'src/shared/components/flightInfo';

const flight1 = {
  flights: [
    { flightNumber: '1688', hasWifi: false },
    { flightNumber: '17', hasWifi: false }
  ],
  travelTime: '2h 15m',
  gate: null
};
const flight2 = {
  flights: [
    { flightNumber: '47', hasWifi: true },
    { flightNumber: '319', hasWifi: false }
  ],
  travelTime: '1h 5m',
  gate: 'A10'
};
const flight3 = { flights: [{ flightNumber: '233', hasWifi: false }], travelTime: '0h 55m', gate: 'E8' };

storiesOf('components/flightInfo', module).add('default', () => {
  return (
    <div className="check-in-confirmation">
      <FlightInfo {...flight1} />
      <FlightInfo {...flight2} />
      <FlightInfo {...flight3} />
    </div>
  );
});

import { storiesOf } from '@storybook/react';
import React from 'react';
import FlightInfoSummary from 'src/shared/components/flightInfoSummary';

const props = {
  flightDetails: [
    {
      departureAirportCode: 'ALB',
      departureDate: '2018-05-18',
      departureDayOfWeek: 'Friday',
      departureTime: '05:15',
      arrivalAirportCode: 'AUS',
      arrivalTime: '10:50'
    },
    {
      departureAirportCode: 'AUS',
      departureDate: '2018-05-20',
      departureDayOfWeek: 'Sunday',
      departureTime: '13:15',
      arrivalAirportCode: 'ALB',
      arrivalTime: '16:50'
    }
  ]
};

storiesOf('components/FlightInfoSummary', module).add('default', () => {
  return <FlightInfoSummary {...props} />;
});

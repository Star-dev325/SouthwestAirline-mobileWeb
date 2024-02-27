import { storiesOf } from '@storybook/react';
import React from 'react';
import FlightStatusDetailCard from 'src/flightStatus/components/flightStatusDetailCard';

storiesOf('components/FlightStatusDetailCard', module)
  .add('default', () => {
    const props = {
      AIRCRAFT_TYPE_FLIGHTSTATUS: false,
      flightCard: {
        legs: [
          {
            flightNumber: '6020',
            departure: {
              airport: 'DAL',
              status: 'ON TIME',
              statusType: 'POSITIVE',
              actualTime: '06:00',
              originalTime: '06:00',
              gate: 'N/A'
            },
            arrival: {
              airport: 'HOU',
              status: 'ON TIME',
              statusType: 'POSITIVE',
              actualTime: '07:00',
              originalTime: '07:00',
              gate: 'N/A',
              isNextDay: false
            },
            isNowBoarding: false
          }
        ]
      }
    };
    return <FlightStatusDetailCard {...props} />;
  })
  .add('flight status type toggle ON', () => {
    const props = {
      AIRCRAFT_TYPE_FLIGHTSTATUS: true,
      flightCard: {
        legs: [
          {
            aircraftInfo: {
              aircraftType: 'Boeing 747-700'
            },
            flightNumber: '6020',
            departure: {
              airport: 'DAL',
              status: 'ON TIME',
              statusType: 'POSITIVE',
              actualTime: '06:00',
              originalTime: '06:00',
              gate: 'N/A'
            },
            arrival: {
              airport: 'HOU',
              status: 'ON TIME',
              statusType: 'POSITIVE',
              actualTime: '07:00',
              originalTime: '07:00',
              gate: 'N/A',
              isNextDay: false
            },
            isNowBoarding: false
          }
        ]
      }
    };
    return <FlightStatusDetailCard {...props} />;
  });

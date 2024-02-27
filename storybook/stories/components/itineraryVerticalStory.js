import React from 'react';
import { storiesOf } from '@storybook/react';
import ItineraryVertical from 'src/shared/components/flightSummaryCard/itineraryVertical';

const boundWithOneConnectionStation = {
  boundType: 'DEPARTING',
  departureStatus: 'ON TIME',
  departureStatusType: 'POSITIVE',
  arrivalStatus: 'ON TIME',
  arrivalStatusType: 'POSITIVE',
  flights: [
    {
      number: '235',
      wifiOnBoard: false
    },
    {
      number: '1740',
      wifiOnBoard: false
    }
  ],
  travelTime: '3h 45m',
  departureDate: '2017-08-21',
  departureTime: '06:45',
  departureAirport: {
    name: 'Austin',
    state: 'TX',
    code: 'AUS',
    country: null
  },
  arrivalTime: '11:30',
  arrivalAirport: {
    name: 'Atlanta',
    state: 'GA',
    code: 'ATL',
    country: null
  },
  stops: [
    {
      departureStatus: 'ON TIME',
      departureStatusType: 'POSITIVE',
      arrivalStatus: 'ON TIME',
      arrivalStatusType: 'POSITIVE',
      airport: {
        name: 'Dallas (Love Field)',
        state: 'TX',
        code: 'DAL',
        country: null
      },
      arrivalTime: '07:45',
      departureTime: '08:25',
      changePlanes: true
    }
  ],
  isNextDayArrival: false
};
const boundWithTwoStops = {
  boundType: 'DEPARTING',
  departureStatus: null,
  departureStatusType: null,
  arrivalStatus: null,
  arrivalStatusType: null,
  flights: [
    {
      number: '1774',
      wifiOnBoard: true
    },
    {
      number: '12',
      wifiOnBoard: true
    }
  ],
  travelTime: '8h 40m',
  departureDate: '2017-08-22',
  departureTime: '08:10',
  departureAirport: {
    name: 'Atlanta',
    state: 'GA',
    code: 'ATL',
    country: null
  },
  arrivalTime: '16:50',
  arrivalAirport: {
    name: 'Charlotte',
    state: 'NC',
    code: 'CLT',
    country: null
  },
  passengerTypeCounts: {
    adult: 1,
    senior: 0
  },
  fareType: 'Anytime',
  stops: [
    {
      departureStatus: null,
      departureStatusType: null,
      arrivalStatus: null,
      arrivalStatusType: null,
      airport: {
        name: 'Cleveland',
        state: 'OH',
        code: 'CLE',
        country: null
      },
      arrivalTime: '09:55',
      departureTime: '10:25',
      changePlanes: false
    },
    {
      departureStatus: null,
      departureStatusType: null,
      arrivalStatus: null,
      arrivalStatusType: null,
      airport: {
        name: 'Chicago (Midway)',
        state: 'IL',
        code: 'MDW',
        country: null
      },
      arrivalTime: '10:40',
      departureTime: '14:00',
      changePlanes: true
    }
  ],
  isNextDayArrival: false
};
const boundWithoutStop = {
  boundType: 'RETURNING',
  departureStatus: null,
  departureStatusType: null,
  arrivalStatus: null,
  arrivalStatusType: null,
  flights: [
    {
      number: '511',
      wifiOnBoard: true
    }
  ],
  travelTime: '1h 45m',
  departureDate: '2017-08-22',
  departureTime: '21:25',
  departureAirport: {
    name: 'Chicago (Midway)',
    state: 'IL',
    code: 'MDW',
    country: null
  },
  arrivalTime: '00:10',
  arrivalAirport: {
    name: 'Atlanta',
    state: 'GA',
    code: 'ATL',
    country: null
  },
  passengerTypeCounts: {
    adult: 1,
    senior: 0
  },
  fareType: 'WannaGetAway',
  stops: [],
  isNextDayArrival: true
};

storiesOf('components/itineraryVertical', module).add('default', () => {
  return (
    <div>
      <ItineraryVertical boundDetail={boundWithOneConnectionStation} />
      <ItineraryVertical boundDetail={boundWithTwoStops} />
      <ItineraryVertical boundDetail={boundWithoutStop} />
    </div>
  );
});

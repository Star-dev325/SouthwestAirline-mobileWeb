import { storiesOf } from '@storybook/react';
import React from 'react';

import FlightSummaryCard from 'src/shared/components/flightSummaryCard/flightSummaryCard';
import PassengerPrice from 'src/shared/components/flightSummary/passengerPrice';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const departingBound = {
  boundType: 'DEPARTING',
  departureDate: '2018-03-05',
  flights: [
    {
      number: '1193',
      wifiOnBoard: true
    },
    {
      number: '555',
      wifiOnBoard: true
    }
  ],
  departureTime: '06:00',
  departureAirport: {
    name: 'New York (LaGuardia)',
    state: 'NY',
    code: 'LGA',
    country: null
  },
  arrivalTime: '13:40',
  arrivalAirport: {
    name: 'San Francisco',
    state: 'CA',
    code: 'SFO',
    country: null
  },
  stops: [
    {
      airport: {
        name: 'Chicago (Midway)',
        state: 'IL',
        code: 'MDW',
        country: null
      },
      arrivalTime: '07:30',
      departureTime: '08:40',
      changePlanes: true
    },
    {
      airport: {
        name: 'Portland',
        state: 'OR',
        code: 'PDX',
        country: null
      },
      arrivalTime: null,
      departureTime: null,
      changePlanes: false
    }
  ],
  isNextDayArrival: false,
  travelTime: '10h 40m'
};

const returningBound = {
  boundType: 'RETURNING',
  departureDate: '2018-03-08',
  flights: [
    {
      number: '1296',
      wifiOnBoard: true
    },
    {
      number: '161',
      wifiOnBoard: true
    }
  ],
  departureTime: '09:10',
  departureAirport: {
    name: 'San Francisco',
    state: 'CA',
    code: 'SFO',
    country: null
  },
  arrivalTime: '21:55',
  arrivalAirport: {
    name: 'New York (LaGuardia)',
    state: 'NY',
    code: 'LGA',
    country: null
  },
  stops: [
    {
      airport: {
        name: 'St. Louis',
        state: 'MO',
        code: 'STL',
        country: null
      },
      arrivalTime: null,
      departureTime: null,
      changePlanes: false
    },
    {
      airport: {
        name: 'Atlanta',
        state: 'GA',
        code: 'ATL',
        country: null
      },
      arrivalTime: '18:20',
      departureTime: '19:40',
      changePlanes: true
    }
  ],
  isNextDayArrival: false,
  travelTime: '9h 45m'
};

const store = createMockedFormStore();

storiesOf('components/flightSummaryCard', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    const passengerPriceProps = {
      passengerType: 'Passenger',
      passengerCount: 1,
      fareLabel: 'Anytime',
      fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
    };

    return (
      <div>
        <FlightSummaryCard boundDetail={departingBound}>
          <PassengerPrice {...passengerPriceProps} />
        </FlightSummaryCard>
        <FlightSummaryCard boundDetail={returningBound}>
          <PassengerPrice {...passengerPriceProps} />
        </FlightSummaryCard>
      </div>
    );
  });

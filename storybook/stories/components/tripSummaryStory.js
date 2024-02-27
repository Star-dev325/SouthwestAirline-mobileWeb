import React from 'react';
import { storiesOf } from '@storybook/react';
import TripSummary from 'src/shared/components/tripSummary';
import BriefBoundBuilder from 'test/builders/model/briefBoundBuilder';
import { defaultLapChildCurrency } from 'src/shared/constants/currencyConstants';

const outbound = new BriefBoundBuilder().build();
const inbound = new BriefBoundBuilder()
  .withDepartureAirportCode('OAK')
  .withArrivalAirportCode('LAS')
  .withDepartureDate('2017-11-28')
  .withDepartureDayOfWeek('Tuesday')
  .build();

const props = {
  bounds: [outbound, inbound],
  passengerCountDescription: '2 Passenger Total',
  currency: {
    amount: '234.30',
    currencyCode: 'USD',
    currencySymbol: '$'
  }
};

const lapChildProps = {
  bounds: [outbound, inbound],
  passengerCountDescription: '2 Passenger Total',
  lapChildCountDescription: '1 Lap Child Total',
  currency: {
    amount: '234.30',
    currencyCode: 'USD',
    currencySymbol: '$'
  },
  defaultLapChildCurrency
};

storiesOf('components/tripSummary', module)
  .add('default', () => {
    return (
      <TripSummary
      {...props}
      onTripAndPriceClick={() => {}}
      />
    );
  })
  .add('lapChildEnabled', () => {
    return (
      <TripSummary
      {...lapChildProps}
      onTripAndPriceClick={() => {}}
      />
    );
  })

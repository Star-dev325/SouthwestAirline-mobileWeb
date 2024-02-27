import React from 'react';
import { storiesOf } from '@storybook/react';
import FlightBoundDrawer from 'src/shared/components/flightBoundDrawer';

const defaultProps = { bound: { destinationAirport: 'BOS', originAirport: 'MDW' }};

storiesOf('components/flightBoundDrawer', module).add('default', () => (
  <FlightBoundDrawer {...defaultProps} />
));

import React from 'react';
import { storiesOf } from '@storybook/react';
import FlightsConnect from 'src/shared/components/flightsConnect';

storiesOf('components/flightsConnect', module).add('default', () => <FlightsConnect from="DSL" to="AUS" />);

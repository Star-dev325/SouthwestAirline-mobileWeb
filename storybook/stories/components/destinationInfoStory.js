import { storiesOf } from '@storybook/react';
import React from 'react';
import DestinationInfo from 'src/earlyBird/components/destinationInfo';

storiesOf('components/destinationInfo', module).add('default', () => (
  <DestinationInfo dateRange="May 19 - 21" destinationAirport="Minneapolis/St. Paul" />
));

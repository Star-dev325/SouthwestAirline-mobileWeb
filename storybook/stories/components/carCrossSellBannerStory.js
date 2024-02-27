import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';

import CarCrossSellBanner from 'src/airBooking/components/carCrossSellBanner';

storiesOf('components/carCrossSellBanner', module).add('default', () => {
  return <CarCrossSellBanner onClick={_.noop} />;
});

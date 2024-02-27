import { storiesOf } from '@storybook/react';
import React from 'react';

import CarBookingTimeSelector from 'src/shared/form/fields/carBookingTimeSelector';
import Icon from 'src/shared/components/icon';

storiesOf('components/carBookingTimeSelector', module).add('default', () => {
  return <CarBookingTimeSelector labelLeft label={<Icon type="home-flight-status" />} />;
});

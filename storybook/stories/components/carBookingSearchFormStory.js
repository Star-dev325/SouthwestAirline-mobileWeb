import { storiesOf } from '@storybook/react';
import React from 'react';
import dayjs from 'dayjs';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { withFakeClock } from 'storybook/libs/withFakeClock';

import CarBookingSearchForm from 'src/carBooking/components/carBookingSearchForm';

const props = {
  formId: 'formId',
  carLocations: [],
  carVendors: [],
  lastBookableDate: dayjs().add(90, 'days')
};

storiesOf('components/carBookingSearchForm', module)
  .addDecorator(withFakeClock('2018-09-06'))
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <CarBookingSearchForm {...props} />;
  });

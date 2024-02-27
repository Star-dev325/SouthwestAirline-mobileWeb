import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import CarExtras from 'src/carBooking/components/carExtras';

const carExtras = [
  {
    type: 'SKI_RACK',
    description: 'Ski Rack'
  },
  {
    type: 'INFANT_SEAT',
    description: 'Infant Seat (5 to 20 lbs.)'
  },
  {
    type: 'CHILD_TODDLER_SEAT',
    description: 'Toddler Seat (20 to 40 lbs.)'
  },
  {
    type: 'BOOSTER_SEAT',
    description: 'Booster Seat (40 to 80 lbs.)'
  },
  {
    type: 'NAVIGATIONAL_SYSTEM',
    description: 'Where2&trade; GPS navigation'
  }
];

const store = createMockedFormStore();
const MockedForm = createMockedForm(createMockedFormStore());

storiesOf('components/carExtras', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return (
      <MockedForm formId={'formId'} onSubmit={_.noop}>
        <CarExtras carExtras={carExtras} />
      </MockedForm>
    );
  });

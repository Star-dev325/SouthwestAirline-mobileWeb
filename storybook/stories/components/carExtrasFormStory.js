import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import CarReservationBuilder from 'test/builders/model/carReservationBuilder';
import CarExtrasForm from 'src/carBooking/components/carExtrasForm';

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

const props = {
  formId: 'formId',
  carExtras,
  productId: 'productid',
  carReservation: new CarReservationBuilder().build(),
  onSubmit: _.noop,
  className: ''
};

const store = createMockedFormStore();

storiesOf('components/carExtrasForm', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    console.log(props.carReservation);
    return <CarExtrasForm onSubmit={_.noop} {...props}></CarExtrasForm>;
  });

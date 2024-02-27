import { storiesOf } from '@storybook/react';
import React from 'react';
import dayjs from 'dayjs';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import * as CarVendorsBuilder from 'test/builders/model/carVendorsBuilder';
import CarBookingEnterCodesForm from 'src/carBooking/components/carBookingEnterCodesForm';

const props = {
  formId: 'formId',
  carVendors: CarVendorsBuilder.build(),
  lastBookableDate: dayjs().add(90, 'days')
};

const validPromos = {
  promos: [
    { vendor: 'ALAMO', type: 'FREQUENT_RENTER', code: 'ABC123' },
    { vendor: 'AVIS', type: 'CORPORATE_RATE', code: 'DFFF227' }
  ]
};

const invalidPromos = {
  promos: [
    { vendor: 'ALAMO', type: '', code: '' },
    { vendor: 'AVIS', type: 'FREQUENT_RENTER', code: '###' }
  ]
};

storiesOf('components/carBookingEnterCodesForm', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <CarBookingEnterCodesForm {...props} />;
  })
  .add('populated', () => {
    return <CarBookingEnterCodesForm {...props} {...validPromos} />;
  })
  .add('with invalid data', () => {
    return <CarBookingEnterCodesForm {...props} {...invalidPromos} />;
  });

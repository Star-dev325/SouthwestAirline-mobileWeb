import { storiesOf } from '@storybook/react';
import React from 'react';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import DriverInfoEditForm from 'src/carBooking/components/driverInfoEditForm';

const props = {
  formId: 'formId',
  onSubmit: _.noop,
  initialFormData: {
    firstName: 'Fred',
    middleName: 'Edward',
    lastName: 'Flintstone',
    accountNumber: '601005646'
  }
};

storiesOf('components/driverInfoEditForm', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <DriverInfoEditForm {...props} />;
  });

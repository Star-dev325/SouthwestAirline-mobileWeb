import { storiesOf } from '@storybook/react';
import React from 'react';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import StoryRouter from 'storybook-router';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import CheckInAPISVisaForm from 'src/checkIn/components/checkInAPISVisaForm';

const store = createMockedFormStore();

const props = {
  initialFormData: {
    expiration: '2019-11-17',
    issuedBy: 'AS',
    country: 'AS',
    number: 'abssssss22'
  },
  formId: 'formId',
  onCancel: () => {},
  onSubmit: () => {}
};

storiesOf('component/checkIn/CheckInAPISVisaForm', module)
  .addDecorator(withFakeClock('2020-03-01'))
  .addDecorator(StoryReduxProvider(store))
  .addDecorator(StoryRouter())
  .add('default', () => {
    return <CheckInAPISVisaForm {...props} />;
  })
  .add('empty', () => {
    return <CheckInAPISVisaForm {...props} initialFormData={null} />;
  });

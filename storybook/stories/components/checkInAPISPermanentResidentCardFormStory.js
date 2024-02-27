import { storiesOf } from '@storybook/react';
import React from 'react';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import StoryRouter from 'storybook-router';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import CheckInAPISPermanentResidentCardForm from 'src/checkIn/components/checkInAPISPermanentResidentCardForm';

const store = createMockedFormStore();

const props = {
  initialFormData: {
    expiration: '2019-11-17',
    issuedBy: 'AS',
    number: 'abc-d22-222-222-222',
    type: 'RESIDENT_ALIEN_CARD'
  },
  formId: 'formId',
  onCancel: () => {},
  onSubmit: () => {}
};

storiesOf('component/checkIn/CheckInAPISPermanentResidentCardForm', module)
  .addDecorator(withFakeClock('2020-03-01'))
  .addDecorator(StoryReduxProvider(store))
  .addDecorator(StoryRouter())
  .add('default', () => {
    return <CheckInAPISPermanentResidentCardForm {...props} />;
  })
  .add('empty', () => {
    return <CheckInAPISPermanentResidentCardForm {...props} initialFormData={null} />;
  });

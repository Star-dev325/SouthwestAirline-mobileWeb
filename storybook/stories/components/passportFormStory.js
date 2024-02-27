import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import PassportForm from 'src/shared/form/components/passportForm';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';

const props = {
  formId: 'payment-form',
  onSubmit: _.noop,
  passengerName: 'K Test'
};

storiesOf('components/PassportForm', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <PassportForm {...props} />;
  })
  .add('emergency contact optional', () => {
    return <PassportForm {...props} enableUserToHideEmergencyContact />;
  })
  .add('checkIn Button', () => {
    return <PassportForm {...props} passportSubmitButtonText="CheckIn" />;
  })
  .add('no nationality item', () => {
    return <PassportForm {...props} disableNationalityItem />;
  })
  .add('lap child passport form', () => {
    return <PassportForm {...props} isLapChild />;
  });

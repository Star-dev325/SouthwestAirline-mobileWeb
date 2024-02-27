import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import ReloginForm from 'src/login/components/reloginForm';
import { RELOGIN_FORM } from 'src/shared/constants/formIds';

const mockStore = createMockedFormStore();

storiesOf('components/reloginForm', module)
  .addDecorator(StoryReduxProvider(mockStore))
  .add('default', () => {
    return <ReloginForm formId={RELOGIN_FORM} accountNumber="601400125" onSubmit={_.noop} continueAsGuest={_.noop} />;
  })
  .add('with editable account number field', () => {
    return (
      <ReloginForm
        formId={RELOGIN_FORM}
        accountNumber=""
        onSubmit={_.noop}
        continueAsGuest={_.noop}
        isAccountNumberEditable={true}
      />
    );
  })
  .add('with login to book with points message', () => {
    return (
      <ReloginForm
        accountNumber="601400125"
        continueAsGuest={_.noop}
        formId={RELOGIN_FORM}
        isReLoginPointsBooking={true}
        onSubmit={_.noop}
      />
    );
  });

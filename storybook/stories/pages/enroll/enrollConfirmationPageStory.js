import { storiesOf } from '@storybook/react';
import React from 'react';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { EnrollConfirmationPage } from 'src/enroll/pages/enrollConfirmationPage';

const defaultProps = {
  push: _.noop,
  personalInfo: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  },
  accountNumber: '601005646'
};

storiesOf('pages/enroll/enrollConfirmationPage', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <EnrollConfirmationPage {...defaultProps} />;
  });

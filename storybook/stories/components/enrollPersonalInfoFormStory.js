import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import EnrollPersonalInfoForm from 'src/enroll/components/enrollPersonalInfoForm';

const defaultProps = {
  formId: 'formId',
  onSubmit: _.noop
};

storiesOf('components/enrollPersonalInfoForm', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <EnrollPersonalInfoForm {...defaultProps} />;
  });

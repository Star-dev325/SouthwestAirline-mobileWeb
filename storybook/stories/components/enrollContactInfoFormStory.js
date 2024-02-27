import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import EnrollContactInfoForm from 'src/enroll/components/enrollContactInfoForm';

const defaultProps = {
  formId: 'formId',
  onSubmit: _.noop
};

storiesOf('components/enrollContactInfoForm', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <EnrollContactInfoForm {...defaultProps} />;
  });

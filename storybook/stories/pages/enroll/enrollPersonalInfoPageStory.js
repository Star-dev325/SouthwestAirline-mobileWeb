import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { EnrollPersonalInfoPage } from 'src/enroll/pages/enrollPersonalInfoPage';

const defaultProps = {
  push: _.noop,
  analyticsTrackSubmitFormFn: _.noop
};

storiesOf('pages/enroll/enrollPersonalInfoPage', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <EnrollPersonalInfoPage {...defaultProps} />;
  });

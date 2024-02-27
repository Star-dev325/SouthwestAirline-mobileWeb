import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { EnrollContactInfoPage } from 'src/enroll/pages/enrollContactInfoPage';

const defaultProps = {
  push: _.noop,
  analyticsTrackSubmitFormFn: _.noop
};

storiesOf('pages/enroll/enrollContactInfoPage', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <EnrollContactInfoPage {...defaultProps} />;
  });

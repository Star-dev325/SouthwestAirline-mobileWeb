import _ from 'lodash';
import React from 'react';

import configureMockStore from 'redux-mock-store';
import { EmailEnroll } from 'src/homeAndNav/pages/emailEnroll';
import { storiesOf } from '@storybook/react';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';

const store = configureMockStore()({});

storiesOf('pages/shared/emailEnrollPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <EmailEnroll />;
  });

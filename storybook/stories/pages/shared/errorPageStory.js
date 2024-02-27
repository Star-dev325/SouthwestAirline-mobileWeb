import { storiesOf } from '@storybook/react';
import React from 'react';

import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import ErrorPage from 'src/shared/pages/errorPage';
import configureMockStore from 'redux-mock-store';

const store = configureMockStore()({});

storiesOf('pages/shared/errorPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return (
      <ErrorPage
        error="mock error"
        errorDetails={{ componentStack: 'mock error info' }}
        resetErrorBoundary={() => {}}
      />
    );
  });

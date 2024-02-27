import { storiesOf } from '@storybook/react';
import { loginBanner } from 'mocks/flexPlacement/homepagePlacements';
import React from 'react';
import LoginBanner from 'src/homeAndNav/components/loginBanner';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

const store = createMockStoreWithRouterMiddleware()();

storiesOf('components/loginBanner', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => <LoginBanner content={loginBanner} />);

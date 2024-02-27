import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import TabBar from 'src/shared/components/tabBar';
import Tab from 'src/shared/components/tab';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import configureMockStore from 'redux-mock-store';

const store = configureMockStore()({
  app: {
    webView: { isWebView: false }
  }
});

storiesOf('components/tabBar', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return (
      <div>
        <TabBar activeKey={1} analyticsTrackViewTabFn={_.noop}>
          <Tab eventKey={1}>Pill 1 content</Tab>
          <Tab eventKey={2}>Pill 2 content</Tab>
        </TabBar>
      </div>
    );
  })
  .add('justified', () => {
    return (
      <div>
        <TabBar activeKey={1} analyticsTrackViewTabFn={_.noop} justified>
          <Tab eventKey={1}>Pill 1 content</Tab>
          <Tab eventKey={2}>Pill 2 content</Tab>
        </TabBar>
      </div>
    );
  });

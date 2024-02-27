import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import createMockStore from 'test/unit/helpers/createMockStore';
import React from 'react';
import { storiesOf } from '@storybook/react';

const buttons = [
  {
    name: 'Recent',
    onClick: () => {},
    type: 'button'
  }
];

const doneButtons = [
  {
    name: 'Done',
    onClick: () => {}
  }
];

const mockStore = createMockStore();
const store = mockStore({});

storiesOf('components/pageHeaderWithButtons', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return (
      <div>
        <PageHeaderWithButtons title="action bar" subTitle="sub title" rightButtons={buttons} />

        <br />
        <PageHeaderWithButtons title={'Price review'} showBackButton rightButtons={doneButtons} />

        <br />
        <PageHeaderWithButtons title={'WCM Page'} titleInCenter rightButtons={doneButtons} />
      </div>
    );
  });

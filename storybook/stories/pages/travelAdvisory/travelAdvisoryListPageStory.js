import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-router';
import configureMockStore from 'redux-mock-store';
import _ from 'lodash';

import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { TravelAdvisoryListPage } from 'src/travelAdvisory/pages/travelAdvisoryListPage';

const store = configureMockStore()({});
const props = {
  getTravelAdvisoriesFn: _.noop,
  travelAdvisories: [
    {
      id: '1234567890',
      advisoryTitle: 'Advisory Title 1',
      advisoryInfo:
        'Advisory Info 1 Advisory Info Advisory Info Advisory Info Advisory Info Advisory Info Advisory Info',
      stationInfo: []
    }
  ],
  push: _.noop
};

const propsThreeAdvisories = {
  getTravelAdvisoriesFn: _.noop,
  travelAdvisories: [
    {
      id: '1234567890',
      advisoryTitle: 'Advisory Title',
      advisoryInfo: '',
      stationInfo: []
    },
    {
      id: '0987654321',
      advisoryTitle: 'Another Advisory Title',
      advisoryInfo: '',
      stationInfo: []
    },
    {
      id: '1122334455',
      advisoryTitle: 'The Third Advisory Title',
      advisoryInfo: '',
      stationInfo: []
    }
  ]
};

storiesOf('pages/travelAdvisory/TravelAdvisoryListPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <TravelAdvisoryListPage {...props} />;
  })
  .add('when there are multiple active travel advisories', () => {
    return <TravelAdvisoryListPage {...propsThreeAdvisories} />;
  });

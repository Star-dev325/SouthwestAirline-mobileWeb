import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-router';
import configureMockStore from 'redux-mock-store';
import _ from 'lodash';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { TravelAdvisoryDetailsPage } from 'src/travelAdvisory/pages/travelAdvisoryDetailsPage';

const store = configureMockStore()({});
const props = {
  params: {
    number: '0'
  },
  getTravelAdvisoriesFn: _.noop,
  travelAdvisories: [
    {
      id: '1234567890',
      advisoryTitle: 'Advisory Title',
      advisoryInfo:
        'Advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here advisory information goes here ',
      stationInfo: []
    }
  ],
  push: _.noop
};

storiesOf('pages/travelAdvisory/TravelAdvisoryDetailsPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <TravelAdvisoryDetailsPage {...props} />;
  });

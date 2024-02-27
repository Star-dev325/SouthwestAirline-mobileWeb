import { storiesOf } from '@storybook/react';
import _ from 'lodash';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';

import { EarlyBirdDetailPage } from 'src/earlyBird/pages/earlyBirdDetailPage';
import EarlyBirdBoundsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/earlybird/earlyBirdBoundsBuilder';
import EarlyBirdDetailFormDataBuilder from 'test/builders/formData/earlyBirdDetailFormDataBuilder';

const earlyBirdBounds = new EarlyBirdBoundsBuilder().build();
const formData = new EarlyBirdDetailFormDataBuilder().build();

const props = {
  isLoggedIn: true,
  response: {
    destinationDescription: 'Austin',
    earlyBirdBounds,
    recordLocator: 'NALVRY',
    receiptEmail: null,
    dates: {
      first: '2018-06-25',
      second: '2018-06-30'
    }
  },
  flightDateRange: 'Jun 4 - Jun 6',
  formData,
  showDialogFn: _.noop,
  gotoReviewPageFn: _.noop
};

const store = configureMockStore()({
  app: {
    wcmContent: {
      applicationProperties: {}
    }
  },
  router: {
    location: '/earlybird/checkin'
  }
});

storiesOf('pages/earlyBird/earlyBirdDetailPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('detail', () => {
    return <EarlyBirdDetailPage {...props} />;
  });

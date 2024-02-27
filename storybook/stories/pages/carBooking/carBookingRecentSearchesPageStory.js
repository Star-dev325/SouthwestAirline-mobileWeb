import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import React from 'react';
import _ from 'lodash';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { CarBookingRecentSearchesPage } from 'src/carBooking/pages/carBookingRecentSearchesPage';

const EnhancedWebViewCarBookingRecentSearchesPage = withBodyClass('is-webview')(CarBookingRecentSearchesPage);

const searchRequests = [
  {
    dropOff: 'DAL',
    dropOffDate: '2019-03-27',
    dropOffTime: '11:30AM',
    pickUp: 'AUS',
    pickUpDate: '2019-03-23',
    pickUpTime: '11:30AM',
    vehicleType: 'Mid-size'
  }
];

const props = {
  searchRequests,
  saveSelectedRecentSearchRequestFn: _.noop,
  deleteRecentSearchFn: _.noop,
  push: _.noop
};

const propsWithNoSearches = {
  searchRequests: [],
  saveSelectedRecentSearchRequestFn: _.noop,
  deleteRecentSearchFn: _.noop,
  push: _.noop
};

const propsWithWebView = _.merge({}, props, {
  isWebView: true
});

const webViewStore = {
  app: {
    webView: {
      isWebView: true
    }
  }
};

storiesOf('pages/carBooking/carBookingRecentSearchesPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <CarBookingRecentSearchesPage {...props} />;
  })
  .add('empty list', () => {
    return <CarBookingRecentSearchesPage {...propsWithNoSearches} />;
  });

storiesOf('pages/carBooking/carBookingRecentSearchesPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(createMockedFormStore(webViewStore)))
  .add('webview', () => {
    return (
      <div className="car-booking">
        <EnhancedWebViewCarBookingRecentSearchesPage {...propsWithWebView} />
      </div>
    );
  });

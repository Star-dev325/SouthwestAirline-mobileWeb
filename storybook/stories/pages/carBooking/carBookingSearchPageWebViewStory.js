import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import React from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import { CarBookingSearchPage } from 'src/carBooking/pages/carBookingSearchPage';

const EnhancedCarBookingSearchPage = withBodyClass(['is-webview', 'car-booking_search'])(CarBookingSearchPage);

const defaultProps = {
  push: _.noop,
  carLocations: [],
  carVendors: [],
  findCarsFn: _.noop,
  retrieveCarVendorsFn: _.noop,
  retrieveCarLocationsFn: _.noop,
  retrieveCarVendorImagesFn: _.noop,
  getRecentSearchesFromLocalStorageFn: _.noop,
  lastBookableDate: dayjs().add(90, 'days'),
  location: {
    pathname: '/car/booking',
    search: ''
  },
  match: {
    params: '',
    isExact: false,
    path: '',
    url: ''
  }
};

const store = createMockedFormStore({
  app: {
    webView: {
      isWebView: true
    }
  }
});

storiesOf('pages/carBooking/carBookingSearchPageWebView', module)
  .addDecorator(StoryRouter())
  .addDecorator(withFakeClock('2019-03-24'))
  .addDecorator(StoryReduxProvider(store))
  .add('webview', () => {
    return <EnhancedCarBookingSearchPage {...defaultProps} />;
  });

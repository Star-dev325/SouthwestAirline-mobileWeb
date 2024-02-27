import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import React from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import { CarBookingSearchPage } from 'src/carBooking/pages/carBookingSearchPage';

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

storiesOf('pages/carBooking/carBookingSearchPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(withFakeClock('2019-03-24'))
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <CarBookingSearchPage {...defaultProps} />;
  });

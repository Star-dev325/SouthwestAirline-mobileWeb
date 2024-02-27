import CorporateBookingSelection from 'src/airBooking/components/corporateBookingSelection';
import { storiesOf } from '@storybook/react';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import React from 'react';

const mockStore = {
  getState: () => {},
  subscribe: () => {}
};

const corporateBookingSwitchInfo = {
  label: 'Book with a SWABIZ account',
  learnMoreUrl: 'corporate/url',
  nonCorporateLearnMoreUrl: 'non/corporate/url'
};

storiesOf('components/corporateBookingSelection', module)
  .addDecorator(StoryReduxProvider(mockStore))
  .add('default', () => <CorporateBookingSelection corporateBookingSwitchInfo={corporateBookingSwitchInfo} />);

import { storiesOf } from '@storybook/react';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import EarlyBirdInPathBreakdown from 'src/airBooking/components/earlyBirdInPathBreakdown';
import EarlyBirdInPathPricesBuilder from 'test/builders/apiResponse/earlyBirdInPathPricesBuilder';

const props = {
  EARLY_BIRD_AB_TESTING: true,
  earlyBirdEligibility: new EarlyBirdInPathPricesBuilder().build().earlyBirdEligibility,
  earlyBirdSelected: true
};

storiesOf('components/earlyBirdInPathBreakdown', module)
  .addDecorator(StoryReduxProvider(configureMockStore()()))
  .add('default', () => {
    return <EarlyBirdInPathBreakdown {...props} />;
  });

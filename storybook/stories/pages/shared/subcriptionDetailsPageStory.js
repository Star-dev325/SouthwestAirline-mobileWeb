import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import { SubscriptionDetailsPage } from 'src/shared/pages/subscriptionDetailsPage';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const EnhancedCarCancelConfirmationPage = withBodyClass(['subscription-detail', 'hide-header'])(
  SubscriptionDetailsPage
);

const props = {
  subscriptionTitle: 'Subscription Details'
};

const store = createMockedFormStore();

storiesOf('pages/shared/subscriptionDetailsPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <EnhancedCarCancelConfirmationPage {...props} />;
  });

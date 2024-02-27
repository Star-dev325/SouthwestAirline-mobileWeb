import React from 'react';
import { storiesOf } from '@storybook/react';
import SubscriptionDetails from 'src/enroll/components/subscriptionDetails';

storiesOf('components/subscriptionDetails', module).add('default', () => {
  return <SubscriptionDetails />;
});

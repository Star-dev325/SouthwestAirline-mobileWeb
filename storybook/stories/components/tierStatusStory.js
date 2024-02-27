import React from 'react';
import { storiesOf } from '@storybook/react';
import TierStatus from 'src/myAccount/components/tierStatus';

storiesOf('components/tierStatus', module).add('default', () => {
  return (
    <div>
      <TierStatus percentage={60} label="40,125" desc="of 70,000 points" />
      <TierStatus centerIconType="airplane-depart" percentage={12} label="17" desc="of 50 flights" completed />
    </div>
  );
});

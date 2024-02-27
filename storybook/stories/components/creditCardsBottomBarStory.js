import { storiesOf } from '@storybook/react';
import React from 'react';
import CreditCardsBottomBar from 'src/shared/components/creditCardsBottomBar';

storiesOf('components/creditCardsBottomBar', module).add('default', () => {
  return <CreditCardsBottomBar />;
});

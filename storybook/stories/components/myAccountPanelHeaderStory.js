import React from 'react';
import { storiesOf } from '@storybook/react';
import MyAccoutPanelHeader from 'src/myAccount/components/myAccountPanelHeader';

storiesOf('components/myAccoutPanelHeader', module).add('default', () => {
  return <MyAccoutPanelHeader showCongratulations />;
});

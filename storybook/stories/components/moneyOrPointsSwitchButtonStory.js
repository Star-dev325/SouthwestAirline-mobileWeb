import React from 'react';
import { storiesOf } from '@storybook/react';
import MoneyOrPointsSwitchButton from 'src/shared/components/moneyOrPointsSwitchButton';

storiesOf('components/moneyOrPointsSwitchButton', module)
  .add('default', () => {
    return (
      <div>
        <MoneyOrPointsSwitchButton value="money" onSelect={() => {}} />
      </div>
    );
  })
  .add('disabled', () => {
    return (
      <div>
        <MoneyOrPointsSwitchButton value="money" onSelect={() => {}} disabled />
      </div>
    );
  });

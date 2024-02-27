import { storiesOf } from '@storybook/react';
import React from 'react';
import CreditCardTypeAndNumber from 'src/shared/components/creditCardTypeAndNumber';

storiesOf('components/creditCardTypeAndNumber', module).add('default', () => {
  return (
    <div>
      <CreditCardTypeAndNumber creditCardType={'VISA'} lastFourDigitsOfCreditCard={'1111'} />
      <CreditCardTypeAndNumber creditCardType={'MASTERCARD'} lastFourDigitsOfCreditCard={'9999'} />
      <CreditCardTypeAndNumber creditCardType={'RAPID_REWARDS_VISA'} lastFourDigitsOfCreditCard={'9876'} />
    </div>
  );
});

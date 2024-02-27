import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import CreditCardRadioInput from 'src/shared/components/creditCardRadioInput';

storiesOf('components/creditCardRadioInput', module)
  .add('default', () => {
    return (
      <CreditCardRadioInput
        cardDescription="Visa 9999"
        creditCardType="VISA"
        savedCreditCardId="1-IOE15A"
        onClick={_.noop}
        selected={false}
      />
    );
  })
  .add('active', () => {
    return (
      <CreditCardRadioInput
        cardDescription="Visa 9999"
        creditCardType="VISA"
        savedCreditCardId="1-IOE15A"
        onClick={_.noop}
        selected
      />
    );
  });

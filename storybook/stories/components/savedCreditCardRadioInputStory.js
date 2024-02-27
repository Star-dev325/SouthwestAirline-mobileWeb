import React from 'react';
import { storiesOf } from '@storybook/react';
import _ from 'lodash';
import SavedCreditCardRadioInput from 'src/shared/components/savedCreditCardRadioInput';

const creditCardInfo = {
  isPrimary: true,
  billingContactInfo: {
    address: {
      addressType: '',
      isoCountryCode: 'US',
      stateProvinceRegion: 'TX',
      zipOrPostalCode: 'xxxx',
      addressLine1: 'xxxxx',
      addressLine2: '',
      city: 'Dallas'
    },
    firstName: 'Yu',
    lastName: 'Li'
  },
  creditCardPayment: {
    cardDescription: 'card 9999',
    creditCardType: 'VISA',
    expiration: '2017-12',
    lastFourDigitsOfCreditCard: '9999',
    savedCreditCardId: '1-4KKDWK'
  }
};

storiesOf('components/SavedCreditCardRadioInput', module)
  .add('default', () => {
    return <SavedCreditCardRadioInput creditCardInfo={creditCardInfo} onClick={_.noop} selected={false} />;
  })
  .add('selected', () => {
    return <SavedCreditCardRadioInput creditCardInfo={creditCardInfo} onClick={_.noop} selected />;
  });

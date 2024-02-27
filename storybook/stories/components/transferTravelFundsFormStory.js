const { storiesOf } = require('@storybook/react');
import React from 'react';
import ToggleSwitch from 'src/shared/components/toggleSwitch';
import { Provider } from 'react-redux';
import _ from 'lodash';

import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import TransferTravelFundsForm from 'src/travelFunds/components/transferTravelFundsForm';

const initialFormData = {
  firstName:
    'ThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomas',
  lastName:
    'ShelbyShelbyShelbyShelbyShelbyShelbyShelbyShelbyShelbyShelbyShelbyShelbyShelbyShelbyShelbyShelbyShelbyShelbyShelbyShelbyShelby',
  rapidRewardsNumber: '123456',
  recipientEmailAddress:
    'reallyreallyreallylongreallyreallyreallylongreallyreallyreallylong@longemailreallyreallyreallylongreallyreallyreallylongreallyreallyreallylong@longemail.com',
  personalMessage: 'this is the personal message',
  additionalReceipt:
    'reallyreallyreallylongreallyreallyreallylongreallyreallyreallylong@longemailreallyreallyreallylongreallyreallyreallylongreallyreallyreallylong@longemail.com'
};

const props = {
  formId: '123456',
  onSubmit: () => {},
  onSubmitLabel: 'Transfer Travel Funds',
  receiptEmailAddress:
    'reallyreallyreallylongreallyreallyreallylongreallyreallyreallylong@longemailreallyreallyreallylongreallyreallyreallylongreallyreallyreallylong@longemail.com',
  transferableAmount: {
    amount: '100.00',
    currencyCode: 'USD',
    currencySymbol: '$'
  },
  recipientInfoText:
    'mock First name, mock last name, and mock Rapid Rewards® number must match Rapid Rewards account information on file.',
  personalMsgMaxChar: 340,
  initialFormData
};

storiesOf('components/transferTravelFundsForm', module).add('default', () => (
  <Provider store={createMockedFormStore()}>
    <TransferTravelFundsForm {..._.merge({}, props)} />
  </Provider>
));

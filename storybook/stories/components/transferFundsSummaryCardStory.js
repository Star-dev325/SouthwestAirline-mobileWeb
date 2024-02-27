const { storiesOf } = require('@storybook/react');
import React from 'react';
import _ from 'lodash';

import TransferFundsSummaryCard from 'src/travelFunds/components/transferFundsSummaryCard';

const props = {
  originalTravelFund: {
    expirationDate: '2030-10-20',
    travelFundType: 'TRAVEL_FUNDS',
    displayName:
      'ThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomas Shelby',
    fundIdentifier: '1010AA',
    leisureFund: true,
    transferableAmount: {
      amount: '100.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    }
  },
  recipientDetails: {
    displayName:
      'ArthurArthurArthurArthurArthurArthurArthurArthurArthurArthurArthurArthurArthurArthurArthurArthurArthurArthurArthurArthurArthur Shelby',
    accountNumber: '601940404',
    emailAddress:
      'reallyreallyreallylongreallyreallyreallylongreallyreallyreallylong@longemailreallyreallyreallylongreallyreallyreallylongreallyreallyreallylong@longemail.com',
    personalMessage:
      'really really really reallyasldfkja aslkfdja alsdkfja;lsdkfja;ldksfja;lsdkfj as;ldkfjal;sdkfja;lsdkfja;lsdkfja;lsdkfja;sldkfja;lsdkfja;lsdkfja;lsdkfja;lsdk'
  },
  transferredAmount: {
    amount: '100.00',
    currencyCode: 'USD',
    currencySymbol: '$'
  }
};

storiesOf('components/transferFundsSummaryCard', module).add('default', () => (
  <TransferFundsSummaryCard {..._.merge({}, props)} />
));

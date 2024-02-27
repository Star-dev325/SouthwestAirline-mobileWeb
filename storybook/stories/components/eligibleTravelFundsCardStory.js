const { storiesOf } = require('@storybook/react');
import React from 'react';
import ToggleSwitch from 'src/shared/components/toggleSwitch';
import { Provider } from 'react-redux';
import _ from 'lodash';

import EligibleTravelFundsCard from 'src/travelFunds/components/eligibleTravelFundsCard';

const props = {
  displayName:
    'ThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomasThomas ',
  expirationDate: '2030-03-17',
  fundIdentifier: 'ABC123',
  travelFundType: 'TRAVEL_FUNDS',
  leisureFund: true,
  transferableAmount: {
    amount: '50.00',
    currencyCode: 'USD',
    currencySymbol: '$'
  },
  learnMoreWithLinks: '<a href="https://www.southwest.com/faq/travel-funds-general-info" target="_blank">Learn More</a>'
};

storiesOf('components/eligibleTravelFundsCard', module).add('default', () => (
  <EligibleTravelFundsCard {..._.merge({}, props)} />
));

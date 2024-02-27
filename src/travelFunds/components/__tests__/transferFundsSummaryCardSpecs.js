import React from 'react';
import { shallow } from 'enzyme';

import TransferFundsSummaryCard from 'src/travelFunds/components/transferFundsSummaryCard';

describe('TransferFundsSummaryCard', () => {
  it('should render the component without a personal message', () => {
    const component = createComponent();

    expect(component).toMatchSnapshot();
  });

  it('should render the component with a personal message', () => {
    const component = createComponent('This is a personal message');

    expect(component).toMatchSnapshot();
  });

  const createComponent = (personalMessage = null) => {
    const defaultProps = {
      originalTravelFund: {
        expirationDate: '2030-10-20',
        travelFundType: 'TRAVEL_FUNDS',
        displayName: 'Thomas Shelby',
        fundIdentifier: '1010AA',
        leisureFund: true,
        transferableAmount: {
          amount: '100.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        recipientInfoText: 'mock recipient info text'
      },
      recipientDetails: {
        displayName: 'Arthur Shelby',
        accountNumber: '601940404',
        emailAddress: 'a@s.com',
        personalMessage
      },
      transferredAmount: {
        amount: '100.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    };

    return shallow(<TransferFundsSummaryCard {...defaultProps} />);
  };
});

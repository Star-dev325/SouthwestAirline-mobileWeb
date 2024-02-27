import React from 'react';
import { shallow } from 'enzyme';

import TransferFundsSummarySender from 'src/travelFunds/components/transferFundsSummarySender';

describe('TransferFundsSummarySender', () => {
  it('should render the component', () => {
    const component = createComponent();

    expect(component).toMatchSnapshot();
  });

  it('should render expirationDateString when it exists', () => {
    const component = createComponent({ originalTravelFund: { expirationDateString: 'Expiration: None' } });

    expect(component).toMatchSnapshot();
  });

  it('should not render expirationDateString and expirationDate when their values are falsy', () => {
    const component = createComponent({ originalTravelFund: { expirationDate: null } });

    expect(component).toMatchSnapshot();
  });

  const createComponent = (props) => {
    const defaultProps = {
      originalTravelFund: {
        expirationDate: '2030-10-20',
        travelFundType: 'TRAVEL_FUNDS',
        displayName: 'Thomas Shelby',
        fundIdentifier: '1010AA',
        leisureFund: true,
        recipientInfoText: 'mock recipient info text',
        transferableAmount: {
          amount: '100.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      transferredAmount: {
        amount: '100.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    };

    return shallow(<TransferFundsSummarySender {...defaultProps} {...props} />);
  };
});

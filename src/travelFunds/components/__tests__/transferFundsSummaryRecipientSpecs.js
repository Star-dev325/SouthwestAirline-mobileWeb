import React from 'react';
import { shallow } from 'enzyme';

import TransferFundsSummaryRecipient from 'src/travelFunds/components/transferFundsSummaryRecipient';

describe('TransferFundsSummaryRecipient', () => {
  it('should render the component', () => {
    const component = createComponent();

    expect(component).toMatchSnapshot();
  });

  const createComponent = () => {
    const defaultProps = {
      recipientDetails: {
        displayName: 'Arthur Shelby',
        accountNumber: '601940404',
        emailAddress: 'a@s.com',
        personalMessage: 'This is a personal message'
      }
    };

    return shallow(<TransferFundsSummaryRecipient {...defaultProps} />);
  };
});

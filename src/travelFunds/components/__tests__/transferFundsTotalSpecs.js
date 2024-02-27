import React from 'react';
import { shallow } from 'enzyme';

import TransferFundsTotal from 'src/travelFunds/components/transferFundsTotal';

describe('TransferFundsTotal', () => {
  it('should render the component', () => {
    const component = createComponent();

    expect(component).toMatchSnapshot();
  });

  const createComponent = () => {
    const defaultProps = {
      transferredAmount: {
        amount: '100.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    };

    return shallow(<TransferFundsTotal {...defaultProps} />);
  };
});

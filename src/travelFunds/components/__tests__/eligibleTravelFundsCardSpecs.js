import React from 'react';
import { shallow } from 'enzyme';

import EligibleTravelFundsCard from 'src/travelFunds/components/eligibleTravelFundsCard';

describe('EligibleTravelFundsCard', () => {
  it('should render the component', () => {
    const component = createComponent();

    expect(component).toMatchSnapshot();
  });

  describe('when expirationDateString exists', () => {
    it('should render with expirationDateString value ', () => {
      const component = createComponent({ expirationDateString: 'Expiration: None' });

      expect(component).toMatchSnapshot();
    });

    it('should render with expirationDateString value when expirationDate value is falsy', () => {
      const component = createComponent({ expirationDateString: 'Expiration: None', expirationDate: null });

      expect(component).toMatchSnapshot();
    });
  });

  it('should not render expiration field when expirationDateString and expirationDate values are falsy', () => {
    const component = createComponent({ expirationDate: null });

    expect(component).toMatchSnapshot();
  });

  const createComponent = (props) => {
    const defaultProps = {
      displayName: 'Thomas Shelby',
      expirationDate: '2030-03-17',
      fundIdentifier: 'ABC123',
      travelFundType: 'TRAVEL_FUNDS',
      leisureFund: true,
      transferableAmount: {
        amount: '50.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      learnMoreWithLinks:
        '<a href="https://www.southwest.com/faq/travel-funds-general-info" target="_blank">Learn More</a>'
    };

    return shallow(<EligibleTravelFundsCard {...defaultProps} {...props} />);
  };
});

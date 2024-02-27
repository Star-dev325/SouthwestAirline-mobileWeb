import { render } from '@testing-library/react';
import React from 'react';
import BoundPrice from 'src/shared/components/boundPrice';

describe('BoundPrice', () => {
  const defaultProps = {
    arrivalAirportCode: 'HOU',
    departureAirportCode: 'DAL',
    flight: '4L9D73',
    paxCount: 2,
    price: {
      amount: '40.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    priceString: null,
    totalPrice: {
      amount: '80.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    }
  };

  it('should render correctly', () => {
    const { container } = render(<BoundPrice {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should render a priceString if one is provided', () => {
    const props = {
      ...defaultProps,
      priceString: '#mock-price-string'
    };

    const { container } = render(<BoundPrice {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('it should render points correctly', () => {
    const props = {
      ...defaultProps,
      price: {
        amount: '2,000',
        currencyCode: 'PTS',
        currencySymbol: null
      },
      totalPrice: {
        amount: '4,000',
        currencyCode: 'PTS',
        currencySymbol: null
      }
    };

    const { container } = render(<BoundPrice {...props} />);

    expect(container).toMatchSnapshot();
  });
});

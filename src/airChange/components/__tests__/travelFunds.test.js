import { render } from '@testing-library/react';
import React from 'react';
import TravelFunds from 'src/airChange/components/travelFunds';

describe('TravelFunds', () => {
  it('should show travel funds applied and remaining', () => {
    const { container } = createComponent();

    expect(container.querySelector('div.travel-funds-applied').textContent).toEqual('Travel funds applied-$20.00');
    expect(container.querySelector('div.travel-funds-total-due-now').textContent).toEqual('Total Due Now$15.00');
  });

  const createComponent = (props = {}) => {
    const travelFunds = { item: 'Travel funds applied', fare: { amount: '20.00', currencyCode: 'USD' } };
    const totalDueNow = { item: 'Total Due Now', fare: { amount: '15.00', currencyCode: 'USD' } };

    const defaultProps = {
      travelFunds,
      totalDueNow
    };

    const combinedProps = { ...defaultProps, ...props };

    return render(<TravelFunds {...combinedProps} />);
  };
});

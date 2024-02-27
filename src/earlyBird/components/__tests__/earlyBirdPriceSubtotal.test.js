import React from 'react';
import { render } from '@testing-library/react';
import EarlyBirdPriceSubtotal from 'src/earlyBird/components/earlyBirdPriceSubtotal';

describe('earlyBirdPriceSubTotal', () => {
  it('should render', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should show the departure and arrival airports', () => {
    const { container } = createComponent();

    expect(container.querySelector('.early-bird-price-subtotal--origin-destination').textContent).toEqual('DAL - HOU');
  });

  it('should show earlyBird price for per passenger and passenger count', () => {
    const { container } = createComponent();

    expect(
      container.querySelector(
        '.early-bird-price-subtotal--price-calculator .formatted-currency [data-qa="total-amount"]'
      ).textContent
    ).toEqual('15.00');
  });

  it('should show total price for per bound', () => {
    const { container } = createComponent();

    expect(
      container.querySelector('.early-bird-price-subtotal--total-price .formatted-currency [data-qa="total-amount"]')
        .textContent
    ).toEqual('30.00');
  });

  it('should show the flight numbers', () => {
    const { container } = createComponent();

    expect(container.querySelector('.early-bird-price-subtotal--flight-number').textContent).toEqual('#101/102');
  });

  const createComponent = () => {
    const subtotal = {
      departureAirportCode: 'DAL',
      arrivalAirportCode: 'HOU',
      earlyBirdBoundPrice: {
        amount: '15.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      flight: '101/102',
      selectedPaxCount: 2,
      totalBoundPrice: {
        amount: '30.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    };

    return render(<EarlyBirdPriceSubtotal subtotal={subtotal} />);
  };
});

import React from 'react';
import { render } from '@testing-library/react';
import EarlyBirdPriceFooter from 'src/earlyBird/components/earlyBirdPriceFooter';

describe('earlyBirdPriceFooter', () => {
  it('should render', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it(`should show 'Continue' as the button name`, () => {
    const { container } = createComponent();

    expect(container.querySelector('.continue').textContent).toEqual('Continue');
  });

  it('should show price as the correct format', () => {
    const { container } = createComponent();

    expect(container.querySelector('.early-bird-price-footer--price-total').textContent).toEqual(
      'EARLY_BIRD_PRICE_AMOUNT_TITLE$30.00'
    );
  });

  function createComponent() {
    return render(
      <EarlyBirdPriceFooter
        buttonText="Continue"
        total={{
          amount: '30.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }}
      />
    );
  }
});

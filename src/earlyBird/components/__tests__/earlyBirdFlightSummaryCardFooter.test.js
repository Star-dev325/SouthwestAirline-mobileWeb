import React from 'react';
import { render } from '@testing-library/react';
import EarlyBirdFlightSummaryCardFooter from 'src/earlyBird/components/earlyBirdFlightSummaryCardFooter';

import i18n from '@swa-ui/locale';

describe('EarlyBirdFlightSummaryCardFooter', () => {
  it('should render', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render subtotal', () => {
    const { container } = createComponent();

    expect(
      container.querySelector(
        '.early-bird-flight-summary-footer--subtotal .early-bird-flight-summary-footer--subtotal-title'
      ).textContent
    ).toEqual(i18n('EARLY_BIRD_SUBTOTAL'));

    expect(container.querySelector('.early-bird-flight-summary-footer--passenger-currency').textContent).toEqual(
      '$15.00'
    );
  });

  it('should render EarlyBirdFlightSummaryCardFooter with one passenger', () => {
    const { container } = createComponent();

    expect(container.querySelector('.early-bird-flight-summary-footer--passenger-name').textContent).toEqual(
      'test pax'
    );
  });

  it('should render EarlyBirdFlightSummaryCardFooter with two passengers', () => {
    const { container } = createComponent({
      passengers: [{ name: 'pax one' }, { name: 'pax two' }]
    });

    const passengers = container.querySelectorAll('.early-bird-flight-summary-footer--passenger-name');

    expect(passengers).not.toBeNull();
    expect(passengers).toHaveLength(2);
    expect(passengers[0].textContent).toEqual('pax one');
    expect(passengers[1].textContent).toEqual('pax two');
  });

  const createComponent = (props) => {
    const defaultPrice = { amount: '15.00', currencyCode: 'USD', currencySymbol: '$' };
    const defaultProps = {
      passengers: [{ name: 'test pax' }],
      earlyBirdBoundPrice: defaultPrice,
      earlyBirdSubTotalPrice: defaultPrice
    };

    return render(<EarlyBirdFlightSummaryCardFooter {...defaultProps} {...props} />);
  };
});

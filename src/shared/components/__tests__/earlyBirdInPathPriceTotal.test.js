import { render } from '@testing-library/react';
import i18n from '@swa-ui/locale';
import React from 'react';
import EarlyBirdInPathPriceTotalLine from 'src/shared/components/earlyBirdInPathPriceTotal';

describe('earlyBirdInPathPriceTotalLine', () => {
  const givenProps = {
    unitPrice: {
      amount: '12.50',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    total: {
      amount: '25.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    purchasedCount: 2,
    description: 'EarlyBird Check-In® (ATL/MDW)'
  };

  describe('render', () => {
    it('should show `EarlyBird Check-In` with bounds details in text', () => {
      const { container } = createComponent(givenProps);

      expect(container.textContent).toContain('EarlyBird Check-In® (ATL/MDW)');
    });

    it('should show price for per person on the right side', () => {
      const { container } = createComponent(givenProps);

      expect(container.querySelector('.align-right').textContent).toContain('$12.50');
    });

    it('should show total trips on the right side', () => {
      const { container } = createComponent(givenProps);

      expect(container.querySelector('.medium').textContent).toContain(
        `× ${i18n('SHARED__EARLY_BIRD__CHECK_IN_WAY_TRIPS')} 2`
      );
    });

    it('should show total price on the right side', () => {
      const { container } = createComponent(givenProps);

      expect(container.querySelector('.align-right').textContent).toContain('$25.00');
    });
  });

  function createComponent(props) {
    return render(<EarlyBirdInPathPriceTotalLine {...props} />);
  }
});

import i18n from '@swa-ui/locale';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import SuccessfulPromoBanner from 'src/carBooking/components/successfulPromoBanner';

describe('SuccessfulPromoBanner', () => {
  const createComponent = (numberOfAppliedPromoCodes = 1) =>
    render(<SuccessfulPromoBanner numberOfAppliedPromoCodes={numberOfAppliedPromoCodes} />);

  it('should show singular for promo codes when the number of promo codes applied is 1', () => {
    const { container } = createComponent();

    expect(container).toHaveTextContent(
      `1 ${i18n('CAR_BOOKING__RESULT__PROMOTION_CODE_PROMO_CODE CAR_BOOKING__RESULT__PROMOTION_CODE_APPLIED')}`
    );
  });

  it('should show plural for promo codes when the number of promo codes applied is 2', () => {
    const { container } = createComponent(2);

    expect(container).toHaveTextContent(
      `2 ${i18n('CAR_BOOKING__RESULT__PROMOTION_CODE_PROMO_CODES CAR_BOOKING__RESULT__PROMOTION_CODE_APPLIED')}`
    );
  });
});

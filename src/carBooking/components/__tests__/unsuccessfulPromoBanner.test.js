import i18n from '@swa-ui/locale';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import UnsuccessfulPromoBanner from 'src/carBooking/components/unsuccessfulPromoBanner';

describe('UnsuccessfulPromoBanner', () => {
  const createComponent = (props) => render(<UnsuccessfulPromoBanner {...props} />);

  it('should show promo codes error message when the number of promo codes is 2', () => {
    const { container } = createComponent({
      className: '',
      message: 'message here',
      numberOfPromoCode: 2
    });

    expect(container).toHaveTextContent(
      `${i18n('CAR_BOOKING__RESULT__PROMOTION_CODE_PROMO2 CAR_BOOKING__RESULT__PROMOTION_CODE_INVALID')} - message here`
    );
  });

  it('should show travel alert icon when the number of promo codes is 1', () => {
    const { container } = createComponent({
      className: '',
      message: '',
      numberOfPromoCode: 1
    });

    expect(container.querySelector('.icon_travel-alert')).toBeInTheDocument();
  });

  it('should use class name supplied to component', () => {
    const { container } = createComponent({
      className: 'my-class',
      message: '',
      numberOfPromoCode: 1
    });

    expect(container.querySelector('.my-class')).toBeInTheDocument();
  });
});

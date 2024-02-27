import React from 'react';
import { render } from '@testing-library/react';
import EarlyBirdPurchaseReviewTripDetail from 'src/earlyBird/components/earlyBirdPurchaseReviewTripDetail';
import EarlyBirdBoundsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/earlybird/earlyBirdBoundsBuilder';

describe('earlyBirdPurchaseReviewTripDetail', () => {
  it('should render', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should display proper bound and passenger information', () => {
    const { container } = createComponent();

    expect(container.querySelectorAll('.early-bird-review--trip-passenger')[0].textContent).toEqual('PAUL LIU$15.00');
    expect(container.querySelectorAll('.early-bird-review--trip-passenger')[1].textContent).toEqual(
      'HARRY POTTER$15.00'
    );
  });

  const createComponent = () => {
    const earlyBirdBound = new EarlyBirdBoundsBuilder().build()[0];

    return render(<EarlyBirdPurchaseReviewTripDetail {...earlyBirdBound} />);
  };
});

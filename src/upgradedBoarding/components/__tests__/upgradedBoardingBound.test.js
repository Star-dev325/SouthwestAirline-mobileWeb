import { render } from '@testing-library/react';
import React from 'react';

import UpgradedBoardingBound from 'src/upgradedBoarding/components/upgradedBoardingBound';
import UpgradedBoardingPurchaseFormBuilder from 'test/builders/model/upgradedBoardingPurchaseFormBuilder';

describe('Upgraded Boarding Bound', () => {
  describe('should render', () => {
    it('UpgradedBoardingBound', () => {
      const { container } = createComponent({});

      expect(container).toMatchSnapshot();
    });

    it('UpgradedBoardingBound with more than one passenger', () => {
      const { container } = createComponent({ paxCount: 2 });

      expect(container).toMatchSnapshot();
    });
  });

  const createComponent = (props) => {
    const purchasePageProps = new UpgradedBoardingPurchaseFormBuilder().build();
    const bound = purchasePageProps.upgradedBoardingPurchasePage.upgradedBoardingSegment[0];
    const defaultProps = {
      bound,
      paxCount: 1
    };
    const combinedProps = {
      ...defaultProps,
      ...props
    };

    return render(<UpgradedBoardingBound {...combinedProps} />);
  };
});

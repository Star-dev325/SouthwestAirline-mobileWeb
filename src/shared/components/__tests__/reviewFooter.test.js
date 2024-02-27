import { render } from '@testing-library/react';
import React from 'react';
import ReviewFooter from 'src/shared/components/reviewFooter';

describe('#reviewFooter', () => {
  describe('render the normal size', () => {
    it('should render verbiage', () => {
      const { container } = component();

      expect(container.querySelector('.review-footer--verbiage')).not.toBeNull();
    });

    it('should render hazardous materials link', () => {
      const { getByText } = component();

      expect(getByText('SHARED__REVIEW_FOOTER_VIEW_MORE_DETAILS_LINK')).not.toBeNull();
    });
  });

  describe('render the small size', () => {
    it('should not render verbiage', () => {
      const { container } = component({ size: 'small' });

      expect(container.querySelector('.review-footer--verbiage')).toBeNull();
    });

    it('should not render hazardous materials link', () => {
      const { queryByText } = component({ size: 'small' });

      expect(queryByText('SHARED__REVIEW_FOOTER_VIEW_MORE_DETAILS_LINK')).toBeNull();
    });
  });

  describe('remainingTravelFundsDisclaimerText', () => {
    it('should render travel funds disclaimer text when remainingTravelFundsDisclaimerText is not empty', () => {
      const { container } = component({ remainingTravelFundsDisclaimerText: 'disclaimer text' });

      expect(container.querySelector('.review-footer--travel-funds-verbiage')).not.toBeNull();
    });

    it('should not render travel funds disclaimer text when remainingTravelFundsDisclaimerText is empty', () => {
      const { container } = component({ remainingTravelFundsDisclaimerText: null });

      expect(container.querySelector('.review-footer--travel-funds-verbiage')).toBeNull();
    });
  });

  const component = (props = {}) => render(<ReviewFooter {...props} />);
});

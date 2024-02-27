import React from 'react';
import { render } from '@testing-library/react';
import RapidRewardsComponent from 'src/login/components/rapidRewardsComponent';

const defaultProps = {
  rapidRewardsInfo: {
    product_feature: {
      product_heading: 'Heading',
      product_description: 'Description',
      product_attributes: [
        {
          attribute: 'attribute of rapid rewards'
        }
      ],
      product_tagline: 'tagline'
    }
  }
};

describe('RapidRewardsComponent', () => {
  describe('content is loaded', () => {
    it('should show rapid rewards content', () => {
      const { container } = render(<RapidRewardsComponent {...defaultProps} />);

      expect(container.getElementsByClassName('.wcm-content-container')).not.toBeNull();
      expect(container.getElementsByClassName('.wcm-content')).not.toBeNull();
      expect(container.getElementsByClassName('.heading')).not.toBeNull();
      expect(container.getElementsByClassName('ul[data-qa="rr-results"]')).not.toBeNull();
    });
  });

  describe('content is missing', () => {
    it('should not show rapid rewards content', () => {
      const { container } = render(<RapidRewardsComponent rapidRewardsInfo={null} />);

      expect(container.getElementsByClassName('.wcm-content-container')).not.toBeNull();
      expect(container.getElementsByClassName('.wcm-content')).toHaveLength(0);
      expect(container.getElementsByClassName('.heading')).toHaveLength(0);
      expect(container.getElementsByClassName('ul[data-qa="rr-results"]')).toHaveLength(0);
    });
  });
});

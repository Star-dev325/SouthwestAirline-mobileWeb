import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EarlyBirdCheckInBanner from 'src/earlyBird/components/earlyBirdCheckInBanner';

describe('earlyBirdCheckInBanner', () => {
  describe('when given banner info', () => {
    it('should render', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should render the image', () => {
      const banner = {
        image: 'http://example.com/image.jpg',
        alt: 'EarlyBird'
      };
      const { container } = createComponent({ banner });

      expect(container.querySelector('.early-bird-check-in-banner--background-image')).toHaveAttribute(
        'src',
        'http://example.com/image.jpg'
      );

      expect(container.querySelector('.early-bird-check-in-banner--background-image')).toHaveAttribute(
        'alt',
        'EarlyBird'
      );
    });
  });

  describe('when banner info not given', () => {
    it('should render placeholder instead', () => {
      const banner = {};
      const { container } = createComponent({ banner });

      expect(container.querySelector('.early-bird-check-in--placeholder')).not.toBeNull();

      expect(container.querySelector('.early-bird-check-in-banner--background-image')).toBeNull();
    });
  });
  
  function createComponent(props) {
    return render(<EarlyBirdCheckInBanner {...props} />);
  }
});

import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import TierStatus from 'src/myAccount/components/tierStatus';

describe('TierStatus', () => {
  describe('TierStatus render', () => {
    it('should have the className tier-status', () => {
      const { container } = createComponent();

      expect(container.querySelector('.tier-status')).not.toBeNull();
    });

    it('should have the className tier-status--completed when we set the completed', () => {
      const props = {
        completed: 'completed'
      };
      const { container } = createComponent(props);

      expect(container.querySelector('.tier-status--completed')).not.toBeNull();
    });
  });
});

function createComponent(props) {
  const defaultProps = {
    desc: 'description',
    percentage: 0
  };

  return render(<TierStatus {...defaultProps} {...props} />);
}

import { render } from '@testing-library/react';
import React from 'react';
import SubscriptionDetails from 'src/enroll/components/subscriptionDetails';

describe('SubscriptionDetails', () => {
  describe('render', () => {
    it('should render banner picture successfully', () => {
      const { container } = createComponent();

      expect(container.querySelector('.subscription-details-container--banner img')).toMatchSnapshot();
    });

    it('should render single email subscription details list successfully', () => {
      const { container } = createComponent();

      expect(container.querySelectorAll('.subscription-details-container--list-item')).toMatchSnapshot();
    });
  });

  const createComponent = (props) => render(<SubscriptionDetails {...props} />);
});

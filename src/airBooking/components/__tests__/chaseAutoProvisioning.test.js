import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import ChaseAutoProvisioning from 'src/airBooking/components/chase/chaseAutoProvisioning.jsx';
import { CHASE_AUTO_PROVISIONING } from 'src/airBooking/constants/airBookingConstants';

describe('chaseAutoProvisioning', () => {
  it('should render when cardOrEmail is CHASE_CARD_PROVISION', () => {
    const myPromoCodePageComponent = createComponent({ cardOrEmail: CHASE_AUTO_PROVISIONING.CHASE_CARD_PROVISION });

    expect(myPromoCodePageComponent.baseElement).toMatchSnapshot();
  });

  it('should render when cardOrEmail is CHASE_EMAIL_PROVISION', () => {
    const myPromoCodePageComponent = createComponent({ cardOrEmail: CHASE_AUTO_PROVISIONING.CHASE_EMAIL_PROVISION });

    expect(myPromoCodePageComponent.baseElement).toMatchSnapshot();
  });
  const createComponent = (props = {}) => {
    const defaultProps = {
      ...props,
      header: 'example1',
      body: 'example2'
    };

    return render(<ChaseAutoProvisioning {...defaultProps} />);
  };
});

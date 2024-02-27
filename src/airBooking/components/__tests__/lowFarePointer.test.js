import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import LowFarePointer from 'src/airBooking/components/lowFarePointer';

describe('Low Fare Pointer', () => {
  describe('when outbound flight and', () => {
    it('should have the correct classnames', () => {
      const { container } = createComponent();
      const lowFarePointer = container.querySelector('.low-fare-pointer');

      expect(lowFarePointer).toMatchSnapshot();
    });
  });

  describe('when inbound flight and', () => {
    it('should have the correct classnames', () => {
      const { container } = createComponent({ isInbound: true });
      const lowFarePointer = container.querySelector('.low-fare-pointer');

      expect(lowFarePointer).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = { isInbound: false };
    const finalProps = Object.assign({}, defaultProps, props);

    return render(<LowFarePointer {...finalProps} />);
  };
});

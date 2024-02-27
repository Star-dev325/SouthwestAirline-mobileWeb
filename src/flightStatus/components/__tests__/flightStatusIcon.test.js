import { render } from '@testing-library/react';
import React from 'react';
import FlightStatusIcon from 'src/flightStatus/components/flightStatusIcon';

describe('FlightStatusIcon', () => {
  it('should render home-flight-status icon for on time flights', () => {
    const { container } = createComponent();

    expect(container.querySelector('.icon_home-flight-status')).not.toBeNull();
  });

  it('should render remove icon for cancelled flights', () => {
    const { container } = createComponent({ status: 'CANCELLED', statusType: 'NEGATIVE' });

    expect(container.querySelector('.icon_remove')).not.toBeNull();
  });

  it('should render original time for delayed flights that have original times', () => {
    const { container } = createComponent({ status: 'DELAYED', statusType: 'NEGATIVE', originalTime: '2019-12-27' });

    expect(container.querySelector('.flight-status--sub-text')).not.toBeNull();
  });

  it('should not render original time for delayed flights when no original time is sent', () => {
    const { container } = createComponent({ status: 'DELAYED', statusType: 'NEGATIVE' });

    expect(container.querySelector('.flight-status--sub-text')).toBeNull();
  });

  const createComponent = (props) => {
    const defaultProps = {
      status: 'ON TIME',
      statusType: 'POSITIVE',
      originalTime: null
    };

    const finalProps = { ...defaultProps, ...props };

    return render(<FlightStatusIcon {...finalProps} />);
  };
});

import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import RefundSummaryPassengers from 'src/shared/components/refundSummaryPassengers';

describe('RefundSummaryPassengers', () => {
  it('should render correctly', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render passenger with account number and extra seat when they exist', () => {
    const { container } = createComponent({
      passengers: [
        {
          accountNumber: '497734932',
          displayName: 'YANG LU',
          hasExtraSeat: true
        }
      ]
    });

    expect(container).toMatchSnapshot();
  });

  it('should render with heading when showHeading is true', () => {
    const { container } = createComponent({ showHeading: true });

    expect(container).toMatchSnapshot();
  });

  it('should render with recordLocatorLabel when it exists', () => {
    const { container } = createComponent({ recordLocatorLabel: 'TEST LABEL' });

    expect(container).toMatchSnapshot();
  });
});

const createComponent = (props) => {
  const defaultProps = {
    passengers: [
      {
        displayName: 'YANG LU',
        firstName: 'Yang',
        lastName: 'Lu'
      },
      {
        displayName: 'TEST WANG',
        firstName: 'Test',
        lastName: 'Wang'
      }
    ],
    recordLocator: 'JSBFDK',
    showHeading: false
  };
  const combinedProps = {
    ...defaultProps,
    ...props
  };

  return render(<RefundSummaryPassengers {...combinedProps} />);
};

import { render } from '@testing-library/react';
import React from 'react';
import BoardingInformation from '../boardingInformation';

describe('BoardingInformation', () => {
  it('should render the boarding group and position, but not the boarding gate', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render the boarding gate, group and position', () => {
    const { container } = createComponent({
      boardingGate: '12',
      boardingGroup: 'B',
      boardingPosition: '19'
    });

    expect(container).toMatchSnapshot();
  });

  it('should render the boarding group and position, but render the gate as not yet available', () => {
    const { container } = createComponent({
      boardingGate: '---',
      boardingGroup: 'C',
      boardingPosition: '20'
    });

    expect(container).toMatchSnapshot();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      boardingGroup: 'A',
      boardingPosition: '18'
    };
    const finalProps = { ...defaultProps, ...props };

    return render(<BoardingInformation {...finalProps} />);
  };
});

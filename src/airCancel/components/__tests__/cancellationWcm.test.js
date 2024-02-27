import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import CancellationWcm from 'src/airCancel/components/cancellationWcm';

describe('CancellationWcm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should render with default props', () => {
    const { container } = render(<CancellationWcm />);

    expect(container).toMatchSnapshot();
  });
});

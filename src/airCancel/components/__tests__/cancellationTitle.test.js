import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import CancellationTitle from 'src/airCancel/components/cancellationTitle';

describe('cancellationTitle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with default props without companionComponent', () => {
    const { container } = render(<CancellationTitle title="Cancelled" />);

    expect(container).toMatchSnapshot();
  });

  it('should render with companionComponent', () => {
    const { container } = render(<CancellationTitle title="Cancelled" companionComponent />);

    expect(container).toMatchSnapshot();
  });
});

import { render } from '@testing-library/react';
import React from 'react';
import BoundsHeader from 'src/shared/components/boundsHeader';

describe('BoundsHeader', () => {
  it('should render correctly', () => {
    const dates = {
      first: '2021-12-29',
      second: '2022-01-05'
    };
    const props = {
      dates,
      destinationDescription: 'mock destination description',
      originationDestinationDescription: 'mock origination destination description',
      recordLocator: 'mock record locator'
    };

    const { container } = render(<BoundsHeader {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly if the date is not provided', () => {
    const props = {
      destinationDescription: 'mock destination description',
      originationDestinationDescription: 'mock origination destination description',
      recordLocator: 'mock record locator'
    };

    const { container } = render(<BoundsHeader {...props} />);

    expect(container).toMatchSnapshot();
  });
});

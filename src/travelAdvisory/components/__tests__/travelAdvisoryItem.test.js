import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import TravelAdvisoryItem from 'src/travelAdvisory/components/travelAdvisoryItem';

describe('TravelAdvisoryItem', () => {
  it('should render nav item with title', () => {
    const { container } = render(<TravelAdvisoryItem title="test" />);

    expect(container.textContent).toEqual('test');
  });

  it('should trigger onClick callback when user tap the item', () => {
    const onClickStub = jest.fn();
    const { container } = render(<TravelAdvisoryItem title="test" onClick={onClickStub} />);

    fireEvent.click(container.querySelector('.travel-advisory-item--title'));

    expect(onClickStub).toHaveBeenCalled();
  });
});

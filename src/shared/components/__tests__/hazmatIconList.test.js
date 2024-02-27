import { render } from '@testing-library/react';
import React from 'react';
import HazmatIconList from 'src/shared/components/hazmatIconList';

describe('HazmatIconList', () => {
  it('should render HazmatIconList component', () => {
    const { container } = render(<HazmatIconList />);

    expect(container.querySelector('.hazmat-icon-list-grid')).not.toBeNull();
    expect(container.querySelectorAll('.hazmat-icon-list-row').length).toEqual(3);
  });

  it('should render correct number of HazmatIcon components', () => {
    const { container } = render(<HazmatIconList />);

    expect(container.querySelectorAll('.hazard').length).toEqual(9);
  });
});

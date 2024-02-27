import { render } from '@testing-library/react';
import React from 'react';
import HazmatIcon from 'src/shared/components/hazmatIcon';

describe('HazmatIcon', () => {
  it('should render HazmatIcon component', () => {
    const iconObj = {
      iconClass: 'testClass',
      iconTitle: 'testTitle'
    };

    const { container } = render(<HazmatIcon iconObj={iconObj} />);

    expect(container.querySelector('.testClass')).not.toBeNull();
    expect(container.querySelector('.icon-title').textContent).toContain(iconObj.iconTitle);
  });
});

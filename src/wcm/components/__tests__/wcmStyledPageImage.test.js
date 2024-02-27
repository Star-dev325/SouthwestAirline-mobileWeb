import { render } from '@testing-library/react';
import React from 'react';
import WcmStyledPageImage from 'src/wcm/components/wcmStyledPageImage';

describe('WcmStyledPageImage', () => {
  it('should always have a "fit" css-class', () => {
    const { container } = render(<WcmStyledPageImage image="something.png" className="some custom classes" />);

    expect(container.querySelector('img').classList.contains('fit')).toBeTruthy();
  });
});

import { render } from '@testing-library/react';
import React from 'react';
import Banner from 'src/shared/components/banner';

describe('Banner', () => {
  describe('when pass all the props', () => {
    const bannerProps = {
      className: 'className',
      text: 'word',
      type: 'POSITIVE'
    };

    it('should render correctly', () => {
      const { container } = render(<Banner {...bannerProps} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('when just pass required prop', () => {
    const bannerProps = {
      text: 'word'
    };

    it('should only have the default className', () => {
      const { container } = render(<Banner {...bannerProps} />);

      expect(container.querySelector('.banner')).not.toBeNull();
    });
  });
});

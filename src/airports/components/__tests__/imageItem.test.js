import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import ImageItem from 'src/airports/components/imageItem';

describe('ImageItem', () => {
  it('should render the the title correctly', () => {
    const { container } = createComponent();

    expect(container.querySelector('.title').textContent).toContain('MSP');
  });

  it('should render the subtitle correctly', () => {
    const { container } = createComponent();

    expect(container.querySelector('.subtitle').textContent).toContain('Minneapolis/St. Paul, MN - MSP');
  });

  it('should render the image alt text correctly', () => {
    const { container } = createComponent();

    expect(container.querySelector('img.image')).toHaveAttribute('alt', 'Picture representing MSP');
  });

  it('should render the image src value correctly', () => {
    const { container } = createComponent();

    expect(container.querySelector('img.image')).toHaveAttribute(
      'src',
      '/content/mkt/images/airport_info/MSP_aiport_info.jpg'
    );
  });

  function createComponent() {
    const props = {
      image: {
        alt: 'Picture representing MSP',
        src: '/content/mkt/images/airport_info/MSP_aiport_info.jpg'
      },
      title: 'MSP',
      subtitle: 'Minneapolis/St. Paul&#44; MN - MSP'
    };

    return render(<ImageItem {...props} />);
  }
});

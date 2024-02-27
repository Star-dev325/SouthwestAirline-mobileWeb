import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import Item from 'src/airports/components/item';

describe('Item', () => {
  function createComponent() {
    const props = {
      content: '<p>120 Minutes&amp;</p>',
      icon: {
        alt: '',
        src: '/content/mkt/images/airport_info/info.jpg'
      },
      subtitle: '<p>Mon-Fri:&amp;</p>',
      title: 'TRAVEL TIPS'
    };

    return render(<Item {...props} />);
  }

  it('should render the title correctly', () => {
    const { container } = createComponent();

    expect(container.querySelector('.title').textContent).toContain('TRAVEL TIPS');
  });

  it('should render the subtitle correctly', () => {
    const { container } = createComponent();

    expect(container.querySelector('[data-qa="airport-info-item-subtitle"]').textContent).toContain('Mon-Fri:&');
  });

  it('should render the icon src value correctly', () => {
    const { container } = createComponent();

    expect(container.querySelector('[data-qa="airport-info-icon"]')).toBeInTheDocument();
  });

  it('should render the icon alt value correctly', () => {
    const { container } = createComponent();

    expect(container.querySelector('[data-qa="airport-info-icon"]')).toHaveAttribute('alt', '');
  });

  it('should render the content correctly', () => {
    const { container } = createComponent();

    expect(container.querySelector('.content').textContent).toContain('120 Minutes&');
  });
});

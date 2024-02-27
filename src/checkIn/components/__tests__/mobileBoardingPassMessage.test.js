import { render } from '@testing-library/react';
import React from 'react';
import MobileBoardingPassMessage from 'src/checkIn/components/mobileBoardingPassMessage';

describe('MobileBoardingPassMessage', () => {
  it('should display body text from greyBoxMessage object', () => {
    const { container } = createComponent({
      greyBoxMessage: {
        body: 'This is a greybox body.',
        header: null
      }
    });

    expect(container.textContent).toEqual('This is a greybox body.');
  });

  it('should not display header if no header is present', () => {
    const { container } = createComponent();

    expect(container.querySelector('strong')).toBeNull();
  });

  it('should display header if header is present', () => {
    const { container } = createComponent({
      greyBoxMessage: {
        body: 'This is a greybox body.',
        header: 'This is a greybox header'
      }
    });

    expect(container.querySelector('[data-qa="passenger-kiosk-message"]')).not.toBeNull();
    expect(container.querySelector('strong').textContent).toContain('This is a greybox header');
  });

  const createComponent = (props = {}) => render(<MobileBoardingPassMessage {...props} />);
});

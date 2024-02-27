import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import EditContactMethodMessage from 'src/shared/components/editContactMethodMessage';

describe('EditContactMethodMessage', () => {
  it('should create a contact method message with the passed in text', () => {
    const noop = () => {};
    const props = {
      body: 'bodytext',
      linkText: 'linktext',
      onClick: noop()
    };

    const { container } = createComponent(props);

    expect(container.querySelector('.contact-info-messages')).not.toBeNull();
    expect(container.querySelector('.contact-info-messages--link')).not.toBeNull();
    expect(container.querySelector('[data-qa="body-text"]').textContent).toContain('bodytext');
    expect(container.querySelector('[data-qa="link-text"]').textContent).toContain('linktext');
  });
});

const createComponent = (props) => render(<EditContactMethodMessage {...props} />);

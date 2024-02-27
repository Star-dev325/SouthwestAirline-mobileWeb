import { render } from '@testing-library/react';
import React from 'react';
import MyAccountPanel from 'src/myAccount/components/myAccountPanel';

describe('MyAccountPanel', () => {
  it('should not render heading if it does not exist', () => {
    const { container } = render(
      <MyAccountPanel>
        <h1>H1</h1>
      </MyAccountPanel>
    );

    expect(container.querySelector('.text')).toBeNull();
  });

  it('should render heading if it exists', () => {
    const props = { heading: 'heading' };
    const { container } = render(
      <MyAccountPanel {...props}>
        <h1>H1</h1>
      </MyAccountPanel>
    );

    expect(container.querySelector('.text').textContent).toContain(props.heading);
  });
});

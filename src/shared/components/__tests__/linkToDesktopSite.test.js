import { render } from '@testing-library/react';
import React from 'react';
import LinkToDesktopSite from 'src/shared/components/linkToDesktopSite';

describe('linkToDesktopSite', () => {
  it('should render', () => {
    const { container } = render(<LinkToDesktopSite>child</LinkToDesktopSite>);

    expect(container).toMatchSnapshot();
  });

  it('should link to the full site', () => {
    const { container } = render(<LinkToDesktopSite>child</LinkToDesktopSite>);

    expect(container.querySelector('a').getAttribute('href')).toBe(
      'https://www.southwest.com/?ref=LinkMobileWeb&clk=LinkMobileWeb'
    );
  });
});

import { render } from '@testing-library/react';
import React from 'react';
import IconAndBriefInfo from 'src/shared/components/iconAndBriefInfo';

describe('iconAndBriefInfo', () => {
  it('should show icon with brief info', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      linkIcon: "Circle",
      linkSuffixClickableText: "SWA",
      linkTitle: "SWA",
      linkUrl: 'https://www.southwest.com/'
    };
    const finalProps = { ...defaultProps, ...props };

    return render(<IconAndBriefInfo {...finalProps} />);
  };
});

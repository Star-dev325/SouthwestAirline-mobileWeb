import { render } from '@testing-library/react';
import React from 'react';
import Icon from 'src/shared/components/icon';

describe('Icon', () => {
  it('Icon should render when with prop `type` ', () => {
    const { container } = render(<Icon type="cloud" />);

    expect(container).toMatchSnapshot();
  });
});

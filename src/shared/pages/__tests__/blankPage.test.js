jest.mock('src/shared/config/environmentConfig', () => ({
  getAppVersion: jest.fn()
}));

import React from 'react';
import { render } from '@testing-library/react';
import { getAppVersion } from 'src/shared/config/environmentConfig';
import BlankPage from 'src/shared/pages/blankPage';

describe('blank page', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should match snapshot', () => {
    getAppVersion.mockReturnValue('0.0.0.1');
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  const createComponent = () => render(<BlankPage />);
});

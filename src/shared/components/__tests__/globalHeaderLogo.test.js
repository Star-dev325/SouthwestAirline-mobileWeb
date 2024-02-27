import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import GlobalHeaderLogo from 'src/shared/components/globalHeaderLogo';

describe('GlobalHeaderLogo', () => {
  it('should trigger onClick callback when user tap the logo', () => {
    const onClickStub = jest.fn();
    const { container } = render(<GlobalHeaderLogo onClick={onClickStub} />);

    fireEvent.click(container.querySelector('div'));

    expect(onClickStub).toHaveBeenCalled();
  });
});

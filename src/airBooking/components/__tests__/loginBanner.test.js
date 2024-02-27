import React from 'react';
import LoginBanner from 'src/airBooking/components/loginBanner';
import { fireEvent, render } from '@testing-library/react';

describe('LoginBanner', () => {
  it('should call the onClick property when the banner is clicked', () => {
    const onClickStub = jest.fn();
    const { container } = render(<LoginBanner onClick={onClickStub} />);

    fireEvent.click(container.querySelector('div[data-qa="loginBanner"]'));

    expect(onClickStub).toHaveBeenCalled();
  });
});

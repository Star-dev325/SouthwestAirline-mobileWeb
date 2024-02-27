import { fireEvent, render } from '@testing-library/react';
import LoginBannerClose from 'src/homeAndNav/components/loginBannerClose';
import * as Cookie from 'src/shared/swa-persistence/cookie';
import React from 'react';

describe('LoginBannerClose', () => {
  beforeEach(() => {
    Cookie.setValue('show_login_banner', 'true');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should set the show_login_banner cookie to false when clicked', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelector('.login-banner-close-icon'));

    const newCookieValue = Cookie.getValue('show_login_banner');

    expect(newCookieValue).toEqual('false');
  });

  it('should add a hidden class to the LoginBanner component when clicked', () => {
    const { container } = createComponent();

    const { container: loginBanner } = render(<LoginBannerMock />);

    fireEvent.click(container.querySelector('.login-banner-close-icon'));

    expect(loginBanner.querySelector('.login-banner').classList.contains('login-banner--hidden')).toBe(true);
  });

  const createComponent = () => render(
    <LoginBannerClose />
  );
});

const LoginBannerMock = () => <div className="login-banner"></div>;

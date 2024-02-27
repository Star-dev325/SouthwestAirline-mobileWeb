// @flow

import React from 'react';
import Icon from 'src/shared/components/icon';
import { COOKIE_DURATION_DAYS, COOKIES } from 'src/shared/constants/webViewConstants';
import * as Cookie from 'src/shared/swa-persistence/cookie';

const LoginBannerClose = () => {
  const handleHideLoginBanner = () => {
    const loginBanner = document.querySelector('.login-banner');

    Cookie.setValue(COOKIES.SHOW_LOGIN_BANNER, 'false', COOKIE_DURATION_DAYS.LOGIN_BANNER);

    if (loginBanner) {
      loginBanner.classList.add('login-banner--hidden');
    }
  };

  return (
    <Icon
      className="login-banner-close-icon"
      onClick={() => handleHideLoginBanner()}
      type="delete"
    />
  );
};

export default LoginBannerClose;

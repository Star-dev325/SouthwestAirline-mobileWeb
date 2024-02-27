// @flow
import React from 'react';

import Icon from 'src/shared/components/icon';
import i18n from '@swa-ui/locale';

type Props = {
  onClick: () => void
};

const LoginBanner = ({ onClick }: Props) => (
  <div onClick={onClick} data-qa="loginBanner" className="p5 bgwhite flex flex-cross-center login-banner">
    <div className="larger pblue flex11">{i18n('AIR_BOOKING__PASSENGERS__LOGIN_BANNER_TITLE')}</div>
    <Icon type="keyboard-arrow-right" className="xxlarge gray4 flex1" />
  </div>
);

export default LoginBanner;

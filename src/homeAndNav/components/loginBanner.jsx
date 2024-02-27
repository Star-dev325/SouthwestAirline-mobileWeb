// @flow

import React from 'react';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';
import { HOME_PAGE_ID } from 'src/wcm/constants/wcmConstants';

const LoginBanner = ({ content }: *) => (
  <div className="login-banner">
    <DynamicPlacement {...content} data-qa="home-login-banner" pageId={HOME_PAGE_ID} />
    <div className="up-arrow" />
  </div>
);

export default LoginBanner;

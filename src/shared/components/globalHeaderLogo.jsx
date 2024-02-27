// @flow
import React from 'react';
import _ from 'lodash';

const LOGO_WIDTH = 112;
const LOGO_HEIGHT = 17;

type Props = {
  onClick?: () => void
};

const globalHeaderLogo = ({ onClick }: Props) => (
  <div
    className="home-link item"
    onClick={onClick ? onClick : _.noop}
  >
    <img
      src="/content/mkt/images/landing_pages/swa_logo_light.svg"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      alt="Southwest"
    />
  </div>
);

export default globalHeaderLogo;

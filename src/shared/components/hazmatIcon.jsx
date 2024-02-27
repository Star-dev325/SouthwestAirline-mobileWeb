// @flow
import React from 'react';
import cx from 'classnames';

import type { HazmatIconType } from 'src/shared/flow-typed/shared.types';

type Props = {
  iconObj: HazmatIconType
};

const HazmatIcon = (props: Props) => {
  const {
    iconObj: { iconClass, iconTitle }
  } = props;

  return (
    <div className="hazard">
      <div className={cx('hazmat-icon', iconClass)} />
      <div className="icon-title">{iconTitle}</div>
    </div>
  );
};

export default HazmatIcon;

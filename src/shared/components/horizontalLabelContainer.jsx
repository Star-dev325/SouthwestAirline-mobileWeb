// @flow
import React from 'react';
import cx from 'classnames';

import type { Node } from 'react';

type Props = {
  label: string,
  labelClassName?: string,
  children: Node
};

const HorizontalLabelContainer = (props: Props) => {
  const { label, labelClassName, children, ...others } = props;

  return (
    <div className="clearfix mt2" {...others}>
      <div className={cx('left large pr7', labelClassName)}>{label}</div>
      <div className="gray5 large overflow-hidden align-right">{children}</div>
    </div>
  );
};

export default HorizontalLabelContainer;

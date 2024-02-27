// @flow

import React from 'react';
import cx from 'classnames';

type Props = {
  type?: string,
  className?: string
};

const Icon = (props: Props) => {
  const { type = '', className, ...restProps } = props;

  return (
    <i
      {...restProps}
      className={cx(className, 'icon', {
        [`icon_${type}`]: !!type
      })}
    />
  );
};

export default Icon;

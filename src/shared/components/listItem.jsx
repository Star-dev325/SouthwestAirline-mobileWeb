// @flow
import React from 'react';
import cx from 'classnames';

import type { Node } from 'react';

type Props = {
  children?: Node,
  className?: string
};

const ListItem = (props: Props) => {
  const { children, className, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={cx(className, {
        item: true
      })}
    >
      {children}
    </div>
  );
};

export default ListItem;

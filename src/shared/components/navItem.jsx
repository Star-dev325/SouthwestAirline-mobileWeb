// @flow

import React from 'react';
import cx from 'classnames';

import Icon from 'src/shared/components/icon';

import type { Node } from 'react';

type Props = {
  iconFixed?: boolean,
  noIcon?: boolean,
  className?: string,
  children?: Node
};

const NavItem = (props: Props) => {
  const { noIcon, iconFixed, className, children, ...restProps } = props;
  const defaultClassNames = {
    'nav-item': true,
    'nav-item--icon-fixed': iconFixed,
    'nav-item--no-icon': noIcon
  };

  return (
    <div {...restProps} className={cx(defaultClassNames, className)}>
      {children}
      <Icon type="keyboard-arrow-right" />
    </div>
  );
};

export default NavItem;

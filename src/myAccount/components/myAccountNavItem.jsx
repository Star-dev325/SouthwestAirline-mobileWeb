// @flow
import React from 'react';
import NavItem from 'src/shared/components/navItem';
import cx from 'classnames';

type Props = {
  className?: string,
  onClick: () => void
};

const MyAccountNavItem = (props: Props) => (
  <NavItem {...props} className={cx(props.className, 'my-account-nav-item')} />
);

export default MyAccountNavItem;

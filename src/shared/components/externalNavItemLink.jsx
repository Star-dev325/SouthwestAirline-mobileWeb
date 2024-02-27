// @flow
import React from 'react';
import type { Node } from 'react';
import cx from 'classnames';
import Icon from './icon';

type Props = {|
  href: string,
  className: string,
  children: Node,
  disabled?: boolean
|};

const ExternalNavItemLink = (props: Props) => {
  const { href, children, className, disabled = false } = props;

  return React.createElement(
    'a',
    {
      href,
      target: '_blank',
      className: cx('nav-item-link', className, { 'nav-item-link_disabled': disabled })
    },
    children,
    <Icon type="keyboard-arrow-right" className="nav-item-link--icon" />
  );
};

export default ExternalNavItemLink;

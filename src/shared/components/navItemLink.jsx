// @flow
import _ from 'lodash';
import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Icon from 'src/shared/components/icon';
import filterDOMProps from 'src/shared/helpers/dom-whitelist/filterDomProps';
import type { NavItemLinkType } from 'src/shared/flow-typed/shared.types';

const NavItemLink = (props: NavItemLinkType) => {
  const { link, href, children, className, disabled, icon, iconClassName, ...others } = props;
  const style = cx('nav-item-link', className, { 'nav-item-link_disabled': disabled });

  if (link) {
    return (
      <Link to={link} className={style} {...others}>
        {children}
        <Icon type={icon} className={iconClassName} />
      </Link>
    );
  }

  return (
    <a href={href} className={style} {...filterDOMProps(_.omit(others, ['params', 'query']))}>
      {children}
      <Icon type={icon} className={iconClassName} />
    </a>
  );
};

NavItemLink.defaultProps = {
  icon: 'keyboard-arrow-right',
  iconClassName: 'nav-item-link--icon'
};

export default NavItemLink;

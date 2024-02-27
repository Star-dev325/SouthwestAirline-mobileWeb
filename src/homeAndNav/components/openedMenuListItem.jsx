// @flow
import React, { Component } from 'react';
import _ from 'lodash';

import Icon from 'src/shared/components/icon';
import cx from 'classnames';
import { toggleDrawer } from 'src/homeAndNav/actions/drawerActions';
import LoginButton from 'src/shared/components/loginButton';

import type { MenuListItemType, Site } from 'src/homeAndNav/flow-typed/homeAndNav.types';

type OnLinkClick = (item: MenuListItemType | Site) => void;
type Props = {
  className?: string,
  menuItem: MenuListItemType,
  onLinkClick: OnLinkClick,
  isLoggedIn: boolean,
  onLogoutClick: () => void
};

class OpenedMenuListItem extends Component<Props> {
  _renderHeader = (menuItem: MenuListItemType) => {
    const titleClassName =
      menuItem && menuItem.titleClassName ? `${menuItem.titleClassName}` : 'menu-list-item--heading-title';

    return (
      <div
        className={'menu-list-item--heading float-none'}
        onClick={() => {
          this._onHeaderClick(menuItem);
        }}
      >
        {!!menuItem.iconType && <Icon type={menuItem.iconType} className="menu-list-item--heading-icon mr4" />}
        <span className={titleClassName}>{menuItem.menuTitle}</span>
      </div>
    );
  };

  _onHeaderClick = (menuItem: MenuListItemType) => {
    const { link, routeName } = menuItem;

    if (link || routeName) {
      this.props.onLinkClick && this.props.onLinkClick(menuItem);
    }
  };

  _openInSameTab = (index: number, site: Site) => (
    <a className="flex flex-cross-center py1" key={index} href={site.href}>
      <Icon type={site.icon} />
      <div className="larger">{site.title}</div>
    </a>
  );

  _openInNewTab = (index: number, site: Site) => {
    const titleClassName = site.className ? site.className : 'larger';

    return (
      <div
        className="flex flex-cross-center py1"
        key={index}
        onClick={() => {
          this.props.onLinkClick(site);
        }}
      >
        <Icon type={site.icon} />
        <div className={titleClassName}>{site.title}</div>
      </div>
    );
  };

  _renderBody = () => {
    const { menuItem } = this.props;

    return (
      !_.isEmpty(menuItem.childList) && (
        <div className="flex flex-column mb4 xlarge">
          {_.map(menuItem.childList, (site: Site, index: number) => {
            if (site.href) {
              return this._openInSameTab(index, site);
            }

            return this._openInNewTab(index, site);
          })}
        </div>
      )
    );
  };

  _closeDrawer = () => {
    toggleDrawer(true);
  };

  _renderLogoutButton = () => {
    const { onLogoutClick, isLoggedIn } = this.props;

    return (
      <div className="menu-list-item--heading float-none" onClick={this._closeDrawer}>
        <LoginButton isLoggedIn={isLoggedIn} onLogoutClick={onLogoutClick} />
      </div>
    );
  };

  render() {
    const { className, menuItem, isLoggedIn } = this.props;
    const showOnlyLogoutButton = menuItem.routeName === 'logout';

    return (
      <div data-qa={menuItem.dataQa} className={cx('container', className)}>
        {showOnlyLogoutButton && isLoggedIn && this._renderLogoutButton()}
        {!showOnlyLogoutButton && this._renderHeader(menuItem)}
        {!showOnlyLogoutButton && this._renderBody()}
      </div>
    );
  }
}

export default OpenedMenuListItem;

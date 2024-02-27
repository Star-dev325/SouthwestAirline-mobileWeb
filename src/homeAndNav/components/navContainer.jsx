// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MenuList from 'src/homeAndNav/components/menuList';
import DrawerLogin from 'src/homeAndNav/components/drawerLogin';
import MenuFooter from 'src/homeAndNav/components/menuFooter';
import { toggleDrawer } from 'src/homeAndNav/actions/drawerActions';
import { updateContentBlockIdsFromMenuList } from 'src/shared/analytics/actions/analyticsActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';

import type { NavClickItem, UserInfo } from 'src/homeAndNav/flow-typed/homeAndNav.types';

type Props = {
  userInfo?: UserInfo,
  onNavClick: (NavClickItem) => void,
  isLoggedIn: boolean,
  onLoginClick: (NavClickItem) => void,
  onLogoutClick: () => void,
  toggleDrawerFn: (boolean) => void,
  menuList: Array<*>,
  isDrawerOpen: boolean,
  updateContentBlockIdsFromMenuListFn: (Array<*>) => void
};

export const NavContainer = ({
  userInfo,
  isLoggedIn,
  onLoginClick,
  onLogoutClick,
  onNavClick,
  toggleDrawerFn,
  menuList,
  isDrawerOpen,
  updateContentBlockIdsFromMenuListFn
}: Props) => {
  useEffect(() => {
    if (isDrawerOpen) {
      updateContentBlockIdsFromMenuListFn(menuList);
      raiseSatelliteEvent('overlay:hamburger navigation');
    }
  }, [isDrawerOpen]);

  const _onDrawerLoginClicked = (to, params, query) => {
    const navItem = {
      routeName: to,
      params,
      query,
      isWcmLink: false
    };

    onLoginClick(navItem);
  };

  const _onLinkClick = (item) => {
    onNavClick(item);
    toggleDrawerFn(true);
  };

  return (
    <div className="nav-container">
      <DrawerLogin
        userInfo={userInfo}
        isLoggedIn={isLoggedIn}
        onDrawerLoginClicked={_onDrawerLoginClicked}
        toggleDrawer={toggleDrawerFn}
      />
      <MenuList
        onLinkClick={_onLinkClick}
        isLoggedIn={isLoggedIn}
        listData={menuList}
        onLogoutClick={onLogoutClick}
        toggleDrawer={toggleDrawerFn}
      />
      <MenuFooter />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.app.account.isLoggedIn,
  userInfo: state.app.account,
  menuList: state.app.homeAndNav.menuList.listData,
  isDrawerOpen: state.app.homeAndNav.drawer.isDrawerOpen
});
const mapDispatchToProps = {
  toggleDrawerFn: toggleDrawer,
  updateContentBlockIdsFromMenuListFn: updateContentBlockIdsFromMenuList
};

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);

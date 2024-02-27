// @flow
import homeAndNavActionTypes from 'src/homeAndNav/actions/homeAndNavActionTypes';

const { HOME_NAV__TOGGLE_MENU_DRAWER, HOME_NAV__RESET_DRAWER_SCROLL } = homeAndNavActionTypes;

export const toggleDrawer = (drawerState: boolean) => ({
  type: HOME_NAV__TOGGLE_MENU_DRAWER,
  payload: !drawerState
});

export const setResetDrawerScroll = (scrollDrawerToTop: boolean) => ({
  type: HOME_NAV__RESET_DRAWER_SCROLL,
  payload: scrollDrawerToTop
});

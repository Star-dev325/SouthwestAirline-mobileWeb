import { toggleDrawer, setResetDrawerScroll } from 'src/homeAndNav/actions/drawerActions';
import homeAndNavActionTypes from 'src/homeAndNav/actions/homeAndNavActionTypes';

const { HOME_NAV__TOGGLE_MENU_DRAWER, HOME_NAV__RESET_DRAWER_SCROLL } = homeAndNavActionTypes;

describe('DrawerActions', () => {
  it('toggleDrawer', () => {
    expect(toggleDrawer(false)).to.deep.equal({
      type: HOME_NAV__TOGGLE_MENU_DRAWER,
      payload: true
    });
  });

  it('setResetDrawerScroll', () => {
    expect(setResetDrawerScroll(true)).to.deep.equal({
      type: HOME_NAV__RESET_DRAWER_SCROLL,
      payload: true
    });
  });
});

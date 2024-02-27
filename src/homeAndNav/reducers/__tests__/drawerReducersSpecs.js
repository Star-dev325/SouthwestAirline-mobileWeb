import reducer, { initialState } from 'src/homeAndNav/reducers/drawerReducers';
import types from 'src/homeAndNav/actions/homeAndNavActionTypes';

describe('Drawer Reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).to.equal(initialState);
  });

  it('should toggle the menu drawer with the given payload', () => {
    const action1 = { type: types.HOME_NAV__TOGGLE_MENU_DRAWER, payload: true };
    const expectedState1 = { ...initialState, isDrawerOpen: true };
    const action2 = { type: types.HOME_NAV__TOGGLE_MENU_DRAWER, payload: false };
    const expectedState2 = { ...initialState, isDrawerOpen: false };

    expect(reducer(undefined, action1)).to.deep.equal(expectedState1);
    expect(reducer(undefined, action2)).to.deep.equal(expectedState2);
  });

  it('should set the drawer to the top', () => {
    const action = { type: types.HOME_NAV__RESET_DRAWER_SCROLL, payload: true };
    const expected = { ...initialState, scrollDrawerToTop: true };

    expect(reducer(undefined, action)).to.deep.equal(expected);
  });

  it('should return default state when action is undefined', () => {
    expect(reducer()).to.deep.equal(initialState);
  });

  it('should set the drawer to close', () => {
    const setDrawerOpen = { type: types.HOME_NAV__TOGGLE_MENU_DRAWER, payload: true };
    const action = { type: '@@router/LOCATION_CHANGE' };
    const expected = { ...initialState, isDrawerOpen: false };

    reducer(undefined, setDrawerOpen);
    expect(reducer(undefined, action)).to.deep.equal(expected);
  });
});

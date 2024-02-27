import reducer, { initialState } from 'src/homeAndNav/reducers/menuListReducers';
import types from 'src/homeAndNav/actions/homeAndNavActionTypes';

describe('Menu List reducer', () => {
  it('should return initial reducer state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState);
  });

  it('should update the active menu index', () => {
    const action = { type: types.HOME_NAV__UPDATE_ACTIVE_LINK_INDEX, payload: 0 };
    const expected = { ...initialState, activeMenuIndex: 0 };

    expect(reducer(undefined, action)).to.deep.equal(expected);
  });

  it('should have a list with clean flow', () => {
    const newList = [{ query: 'SOMETHING', cleanFlow: true }];
    const action = { type: types.HOME_NAV__ADD_CLEAN_FLOW_TO_ROUTE, payload: newList };
    const expected = { ...initialState, listData: newList };

    expect(reducer(undefined, action)).to.deep.equal(expected);
  });

  it('should initialize list data when HOME_NAV__RESET_MENUS_TO_INIT action is triggered', () => {
    expect(reducer({}, { type: types.HOME_NAV__RESET_MENUS_TO_INIT })).to.deep.equal(initialState);
  });

  it('should return default state when action is undefined', () => {
    expect(reducer()).to.deep.equal(initialState);
  });
});

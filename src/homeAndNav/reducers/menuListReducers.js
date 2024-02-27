import { MenuListData } from 'src/homeAndNav/constants/menuListData';
import types from 'src/homeAndNav/actions/homeAndNavActionTypes';

export const initialState = {
  activeMenuIndex: 1,
  listData: MenuListData
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.HOME_NAV__UPDATE_ACTIVE_LINK_INDEX:
      return { ...state, activeMenuIndex: action.payload };

    case types.HOME_NAV__ADD_CLEAN_FLOW_TO_ROUTE:
      return { ...state, listData: action.payload };

    case types.HOME_NAV__RESET_MENUS_TO_INIT:
      return initialState;

    default:
      return state;
  }
};

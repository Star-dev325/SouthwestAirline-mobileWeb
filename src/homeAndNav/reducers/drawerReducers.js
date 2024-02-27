import types from 'src/homeAndNav/actions/homeAndNavActionTypes';

export const initialState = {
  isDrawerOpen: false,
  scrollDrawerToTop: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.HOME_NAV__TOGGLE_MENU_DRAWER:
      return { ...state, isDrawerOpen: action.payload };

    case '@@router/LOCATION_CHANGE':
      return { ...state, isDrawerOpen: false };

    case types.HOME_NAV__RESET_DRAWER_SCROLL:
      return { ...state, scrollDrawerToTop: action.payload };

    default:
      return state;
  }
};

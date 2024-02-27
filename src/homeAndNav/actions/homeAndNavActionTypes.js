import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('homeNav');

const types = {
  sync: [
    'CLEAR_UPCOMING_TRIPS_COUNT',
    'UPDATE_ACTIVE_LINK_INDEX',
    'ADD_CLEAN_FLOW_TO_ROUTE',
    'TOGGLE_MENU_DRAWER',
    'RESET_DRAWER_SCROLL',
    'RESET_HERO_CONTENTS',
    'RESET_MENUS_TO_INIT',
    'SAVE_OFFERS_PAGE_PLACEMENTS',
    'SAVE_OFFERS_PAGE_TEMPLATE_DATA'
  ],
  async: ['FETCH_OFFERS_PAGE_PLACEMENTS', 'FETCH_HOMEPAGE_PLACEMENTS', 'NAVIGATE_TO_EMAIL_US']
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

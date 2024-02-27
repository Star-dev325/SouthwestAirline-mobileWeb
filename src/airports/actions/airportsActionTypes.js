import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('airports');

const types = {
  sync: [
    'CLEAR_MULTI_SELECT_GROUP_FORM_ID',
    'CLEAR_MULTI_SELECT_GROUP',
    'CLEAR_UNAVAILABLE_MULTI_SELECT_GROUP',
    'LOAD_MULTI_SELECT_GROUP',
    'RESET_AIRPORTS',
    'RESET_RECENT_AIRPORT_SEARCH',
    'SAVE_MULTI_SELECT_GROUP',
    'UPDATE_AIRPORT_INFO',
    'UPDATE_MULTI_SELECT_GROUP_CURRENT_DIRECTION',
    'UPDATE_MULTI_SELECT_GROUP',
    'UPDATE_RECENT_AIRPORT_SEARCH',
    'UPDATE_UNAVAILABLE_MULTI_SELECT_GROUP'
  ],
  async: ['FETCH_ALL_AIRPORTS', 'FETCH_AIRPORT_INFO']
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

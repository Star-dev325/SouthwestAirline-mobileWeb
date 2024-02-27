import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('airUpgrade');

const types = {
  sync: [
    'CHANGE_SELECTED_BOUND',
    'SELECT_BOUND_RESUME_AFTER_LOGIN',
    'SAVE_UPGRADE_TYPE',
    'SEARCH_REQUEST',
    'UPGRADE_INDEX'
  ],
  async: ['FETCH_RESERVATION', 'FETCH_AIR_UPGRADE_PLACEMENTS']
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

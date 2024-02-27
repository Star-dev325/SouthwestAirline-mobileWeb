import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('history');

const types = {
  sync: [],
  async: ['SAVE_CHANGE', 'UPDATE_ALL', 'CLEAR_ALL', 'ADD_FORCE_REDIRECT', 'ADD_BACK_HOME', 'ESCAPE_FORCE_REDIRECT']
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('globalHeader');

const types = {
  sync: [
    'SHOW_EDIT_BUTTON',
    'SHOW_CANCEL_BUTTON',
    'CLICK_EDIT_BUTTON',
    'CLICK_CANCEL_BUTTON',
    'HIDE_GLOBAL_HEADER',
    'SHOW_ONLY_LOGIN',
    'HIDE_BUTTON',
    'RESET_GLOBAL_HEADER'
  ],
  async: []
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

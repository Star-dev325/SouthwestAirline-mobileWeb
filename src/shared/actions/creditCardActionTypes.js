import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('creditCard');

const types = {
  sync: ['SET_SAVED_CREDIT_CARDS', 'RESET_SAVED_CREDIT_CARDS'],
  async: [
    'FETCH_UPDATE_CREDIT_CARD',
    'FETCH_SAVED_CREDIT_CARDS_AFTER_UPDATE',
    'FETCH_CREDIT_CARD_BY_ID',
    'MAKE_CC_PRIMARY_AND_UPDATE_CARD',
    'DELETE_CC_AND_UPDATE_CARD',
    'SAVE_CREDIT_CARD',
    'FETCH_SAVED_CREDIT_CARDS'
  ]
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

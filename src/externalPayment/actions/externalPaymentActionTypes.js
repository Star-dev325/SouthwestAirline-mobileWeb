import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('externalPayment');

const types = {
  sync: ['COMPLETE_EXTERNAL_PAYMENT', 'SET_DISPLAY_BUTTON'],
  async: ['SET_UP_EXTERNAL_PAYMENT', 'INITIATE_EXTERNAL_PAYMENT']
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

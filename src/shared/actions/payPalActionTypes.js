import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('paypal');

const types = {
  sync: ['RESUME_APP_STATE'],
  async: ['CREATE_PAYPAL_TOKEN']
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

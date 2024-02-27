import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('contactMethod');

const types = {
  sync: [],
  async: ['UPDATE_SAVED_CONTACT_METHOD']
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

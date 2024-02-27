import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('enroll');

const types = {
  sync: [],
  async: ['FETCH_SECURITY_QUESTIONS', 'CREATE_ACCOUNT']
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

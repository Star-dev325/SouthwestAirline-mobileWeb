import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('standby');

const types = {
  sync: ['SAVE_IS_REVENUE'],
  async: ['FETCH_CHECK_STANDBY_NEAR_AIRPORT']
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

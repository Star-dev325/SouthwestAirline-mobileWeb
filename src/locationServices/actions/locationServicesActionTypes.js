import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('location_service');

const types = {
  sync: [],
  async: ['FETCH_LOCATION']
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

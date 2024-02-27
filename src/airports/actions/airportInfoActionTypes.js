import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('airportInfo');

const types = {
  sync: ['RESET_SELECTED_AIRPORT_INFO', 'UPDATE_SELECTED_AIRPORT_INFO'],
  async: []
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

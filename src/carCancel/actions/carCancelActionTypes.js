import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('carCancel');

const types = {
  async: ['FETCH_CAR_CANCEL_RESERVATION']
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

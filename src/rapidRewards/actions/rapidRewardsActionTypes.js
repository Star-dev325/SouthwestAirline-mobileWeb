import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('rapidRewards');

const types = {
  async: ['FETCH_SEGMENT_IDS']
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

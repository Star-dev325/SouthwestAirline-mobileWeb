import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('travelAdvisory');

const types = {
  async: ['FETCH_TRAVEL_ADVISORIES']
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

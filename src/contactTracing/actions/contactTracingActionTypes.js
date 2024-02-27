import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('contactTracing');

const types = {
  sync: ['SEARCH_REQUEST', 'PASSENGER_INDEX', 'PASSENGER_TO_APPLY_TO_ALL', 'RESET_DATA'],
  async: ['FETCH_CONTACT_TRACING', 'SAVE_CONTACT_TRACING']
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('flightStatus');

const types = {
  sync: ['RESET_FLOW_DATA', 'SAVE_SELECTED_RECENT_SEARCH_REQUEST', 'SAVE_RECENT_SEARCH_REQUESTS'],
  async: ['FETCH_SEARCH_FLIGHT_STATUS', 'FETCH_SEARCH_FLIGHT_DETAILS', 'LOOKUP_FLIGHT_DETAILS']
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('airCancel');

const types = {
  sync: ['RESET_FLOW_DATA', 'SET_FLOW_STATUS', 'SELECT_BOUND_ANALYTICS'],
  async: [
    'FETCH_CANCEL_BOUND_CONFIRMATION',
    'FETCH_CONFIRMATION',
    'FETCH_FLIGHT_AND_CANCEL_BOUND_WITH_SEARCH_TOKEN',
    'FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND',
    'FETCH_RESERVATION_FOR_CANCEL_BOUND',
    'FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL'
  ]
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

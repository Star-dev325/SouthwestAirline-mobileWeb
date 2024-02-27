import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('travelFunds');

const types = {
  sync: [
    'RESET_LOOK_UP_FUNDS_FLOW_DATA',
    'UPDATE_SELECTED_LOOKUP_TAB',
    'UPDATE_SELECTED_APPLY_TAB',
    'SAVE_PREV_SEARCH',
    'RESUME_AFTER_LOGIN'
  ],
  async: [
    'LOOK_UP_TRAVEL_FUNDS',
    'FETCH_UNUSED_FUNDS',
    'FETCH_VALIDATE_FUNDS',
    'FETCH_TRANSFER_TRAVEL_FUNDS',
    'ASSOCIATE_TRAVEL_FUNDS',
    'FETCH_TRAVEL_FUNDS_PAGE_PLACEMENTS'
  ]
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

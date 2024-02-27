import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('earlyBird');

const types = {
  sync: ['SAVE_PAYMENT_INFO', 'SET_FLOW_STATUS', 'SAVE_REVIEW_PAGE_DATA', 'RESET_FLOW_DATA', 'RESET_PAYMENT_INFO'],
  async: ['FETCH_RESERVATION', 'RETRIEVE_EARLY_BIRD_BANNER', 'FETCH_PAYMENT_OPTIONS', 'FETCH_EARLYBIRD_BANNER_PLACEMENTS', 'FETCH_PURCHASE']
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

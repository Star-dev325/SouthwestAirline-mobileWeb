import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('sameDay');

const types = {
  async: [
    'FETCH_CONFIRMATION_PAGE_PLACEMENTS',
    'FETCH_SAME_DAY_FLIGHT_DETAILS_INFO',
    'FETCH_SAME_DAY_PRICING_INFO',
    'FETCH_SAME_DAY_SHOPPING_INFO',
    'UPDATE_SAME_DAY_CANCELLATION',
    'UPDATE_SAME_DAY_CONFIRMATION_REFUND',
    'UPDATE_SAME_DAY_CONFIRMATION'
  ],
  sync: [
    'RESET_FLOW_DATA',
    'RESET_PAYMENT_INFO',
    'SAVE_CHANGE_FLOW',
    'SAVE_PAYMENT_INFO',
    'SAVE_SELECTED_FLIGHT',
    'SHOPPING_PAGE_APPLY_SORT_FILTER'
  ]
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

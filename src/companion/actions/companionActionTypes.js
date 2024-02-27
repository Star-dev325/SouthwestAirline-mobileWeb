import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('companion');

const types = {
  sync: [
    'RESET_CONTACT_METHOD',
    'UPDATE_CONTACT_METHOD',
    'UPDATE_SPECIAL_ASSISTANCE',
    'UPDATE_PASSENGER_INFO',
    'PREFILL_PASSENGER_INFO',
    'SET_INTERNATIONAL_BOOKING_FLAG',
    'SAVE_PAYMENT_INFO',
    'RESET_PAYMENT_INFO',
    'SET_FLOW_STATUS',
    'RESET_SPECIAL_ASSISTANCE',
    'SAVE_TRAVEL_FUNDS_ADDRESS'
  ],
  async: [
    'FETCH_PRICING_PAGE',
    'FETCH_COMPANION_INFORMATION',
    'FETCH_PAYMENT_PAGE',
    'FETCH_CONFIRMATION_PAGE',
    'FETCH_EARLY_BIRD_IN_PATH_INFO'
  ]
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

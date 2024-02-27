import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('myAccount');

const types = {
  sync: [
    'RESET_FLOW_DATA',
    'CLEAR_PAST_FLIGHTS',
    'CLEAR_SAVED_FLIGHTS',
    'SET_TRIP_TYPE',
    'CLEAR_UPCOMING_TRIPS',
    'CLEAR_RAPID_REWARDS_INFO',
    'CLEAR_PROMO_CODES'
  ],
  async: [
    'FETCH_UPCOMING_TRIPS',
    'FETCH_PAST_FLIGHTS',
    'FETCH_SAVED_FLIGHTS',
    'FETCH_RAPID_REWARDS_INFO',
    'ENROLL_CUSTOMER_ACCOUNT',
    'FETCH_ACCOUNT_INFO',
    'FETCH_EXCLUSIVE_PROMOTIONS',
    'REGISTER_EXCLUSIVE_PROMOTION',
    'FETCH_PROMOTION_DETAILS',
    'FETCH_ACCOUNT_PAGE_PLACEMENTS',
    'FETCH_RAPID_REWARDS_PAGE_PLACEMENTS',
    'FETCH_PROMO_CODES',
    'FETCH_PROMO_CODES_PAGE_PLACEMENTS'
  ]
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

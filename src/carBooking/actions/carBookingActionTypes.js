import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('carBooking');

const types = {
  sync: [
    'RESET_FLOW_DATA',
    'SAVE_FETCH_CARS_REQUEST',
    'SAVE_SELECTED_CAR',
    'SAVE_CAR_RESERVATION',
    'SAVE_SELECTED_EXTRAS',
    'SAVE_USER_ACCOUNT_DRIVER_INFO',
    'SAVE_USER_ACCOUNT_CONTACT_INFO',
    'SAVE_SELECTED_RECENT_SEARCH_REQUEST',
    'SAVE_RECENT_SEARCH_REQUESTS',
    'SAVE_CAR_RESULTS'
  ],
  async: [
    'FETCH_CAR_LOCATIONS',
    'FETCH_CARS',
    'FETCH_CAR_VENDORS',
    'FETCH_CAR_PRICING',
    'FETCH_VENDOR_TERMS_AND_CONDITIONS',
    'BOOK_CAR',
    'FETCH_USER_ACCOUNT_INFO'
  ]
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

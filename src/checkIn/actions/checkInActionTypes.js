import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('checkIn');

const types = {
  sync: [
    'RESET_FLOW_DATA',
    'SET_FLOW_STATUS',
    'CLEAR_CHECK_IN_SESSION_TOKEN',
    'SHOW_SHARE_LINK',
    'CLEAR_BOARDING_PASSES',
    'CLEAR_CONFIRMATION_PAGE',
    'CLEAN_APIS_DATA',
    'UPDATE_APIS_DATA',
    'PREFILL_NEXT_PAX_INFO',
    'SAVE_EMERGENCY_CONTACT_FOR_ALL'
  ],
  async: [
    'FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS',
    'FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK',
    'FETCH_CONFIRMATION_PAGE',
    'FETCH_BOARDING_PASS',
    'ADD_NATIONALITY_AND_EMERGENCY_DOCS',
    'ADD_ADDITIONAL_PASSPORT_INFO_DOCS',
    'FETCH_CONFIRMATION_PAGE_PLACEMENTS'
  ]
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

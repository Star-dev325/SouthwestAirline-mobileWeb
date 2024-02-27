import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('viewReservation');

const types = {
  sync: ['CLEAR_FLIGHT_RESERVATION', 'SAVE_CAR_RESERVATION', 'SAVE_SEARCH_REQUEST', 'TRAVEL_INFORMATION_ANALYTICS'],
  async: [
    'FETCH_FLIGHT_RESERVATION',
    'FETCH_DAY_OF_TRAVEL_CONTACT_INFO',
    'UPDATE_DAY_OF_TRAVEL_CONTACT_INFO',
    'FETCH_CAR_RESERVATION',
    'FETCH_TRAVEL_INFORMATION',
    'UPDATE_TRAVEL_INFORMATION',
    'FETCH_SAME_DAY_BOUND_INFO'
  ]
};

export const apiActionCreator = createApiActions;
export default createTypes(types);

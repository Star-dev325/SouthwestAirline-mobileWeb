import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';

const {
  SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO_SUCCESS,
  SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION
} = SameDayActionTypes;

export default (state = {}, action = {}) => {
  switch (action.type) {
    case SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO_SUCCESS:
      return {
        ...state,
        [action.response.flightIdentifier]: action.response.sameDayFlightDetails
      };
      
    case SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO:
    case SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION:
      return {};

    default:
      return state;
  }
};

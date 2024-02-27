import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';

const { SAME_DAY__UPDATE_SAME_DAY_CANCELLATION, SAME_DAY__UPDATE_SAME_DAY_CANCELLATION_SUCCESS } =
  SameDayActionTypes;

export default (state = {}, action = {}) => {
  switch (action.type) {
    case SAME_DAY__UPDATE_SAME_DAY_CANCELLATION:
      return {};
    
    case SAME_DAY__UPDATE_SAME_DAY_CANCELLATION_SUCCESS:
      return { ...action.response };

    default:
      return state;
  }
};

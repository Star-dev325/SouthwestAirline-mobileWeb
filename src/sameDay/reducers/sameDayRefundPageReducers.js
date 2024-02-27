import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';

const { 
  SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND, 
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND_SUCCESS 
} = SameDayActionTypes;

export default (state = {}, action = {}) => {
  switch (action.type) {
    case SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO:
    case SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND:
      return {};

    case SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND_SUCCESS:
      return { ...action.response };

    default:
      return state;
  }
};

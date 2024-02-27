import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';

const {
  SAME_DAY__FETCH_SAME_DAY_PRICING_INFO,
  SAME_DAY__FETCH_SAME_DAY_PRICING_INFO_SUCCESS,
  SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_SUCCESS
} = SameDayActionTypes;

export default (state = {}, action = {}) => {
  switch (action.type) {
    case SAME_DAY__FETCH_SAME_DAY_PRICING_INFO:
    case SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO:
    case SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_SUCCESS:
      return {};

    case SAME_DAY__FETCH_SAME_DAY_PRICING_INFO_SUCCESS:
      return { ...action.response };

    default:
      return state;
  }
};

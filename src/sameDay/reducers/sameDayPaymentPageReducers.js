import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';

const { SAME_DAY__RESET_PAYMENT_INFO, SAME_DAY__SAVE_PAYMENT_INFO } = SameDayActionTypes;

export default (state = {}, action = {}) => {
  switch (action.type) {
    case SAME_DAY__RESET_PAYMENT_INFO:
      return {};

    case SAME_DAY__SAVE_PAYMENT_INFO:
      return action.paymentInfo;

    default:
      return state;
  }
};

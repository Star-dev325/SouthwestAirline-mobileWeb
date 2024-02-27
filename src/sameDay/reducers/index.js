import { combineReducers } from 'redux';
import sameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';
import sameDayConfirmationPageReducers from 'src/sameDay/reducers/sameDayConfirmationPageReducers';
import sameDayPaymentPageReducers from 'src/sameDay/reducers/sameDayPaymentPageReducers';
import sameDayPricingPageReducers from 'src/sameDay/reducers/sameDayPricingPageReducers';
import sameDayRefundPageReducers from 'src/sameDay/reducers/sameDayRefundPageReducers';
import sameDaySelectFarePageReducers from 'src/sameDay/reducers/sameDaySelectFarePageReducers';
import sameDayShoppingPageReducers from 'src/sameDay/reducers/sameDayShoppingPageReducers';

const { SAME_DAY__RESET_FLOW_DATA } = sameDayActionTypes;

export const sameDayPageReducers = combineReducers({
  sameDayConfirmationPage: sameDayConfirmationPageReducers,
  sameDayPaymentPage: sameDayPaymentPageReducers,
  sameDayPricingPage: sameDayPricingPageReducers,
  sameDayRefundPage: sameDayRefundPageReducers,
  sameDaySelectFarePage: sameDaySelectFarePageReducers,
  sameDayShoppingPage: sameDayShoppingPageReducers
});

const sameDay = (state, action) => {
  if (action?.type === SAME_DAY__RESET_FLOW_DATA) {
    return sameDayPageReducers(undefined, action);
  }

  return sameDayPageReducers(state, action);
};

export default sameDay;

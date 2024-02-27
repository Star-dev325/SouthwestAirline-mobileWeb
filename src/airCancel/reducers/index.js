import { combineReducers } from 'redux';
import cancelBoundPage from 'src/airCancel/reducers/cancelBoundPageReducers';
import cancelRefundQuotePage from 'src/airCancel/reducers/cancelRefundQuotePageReducers';
import cancelBoundConfirmationPage from 'src/airCancel/reducers/cancelBoundConfirmationPageReducers';
import cancelAnalytics from 'src/airCancel/reducers/cancelAnalyticsReducers';
import AirCancelActionTypes from 'src/airCancel/actions/airCancelActionTypes';

const { AIR_CANCEL__RESET_FLOW_DATA } = AirCancelActionTypes;

const airCancelReducers = combineReducers({
  cancelAnalytics,
  cancelBoundConfirmationPage,
  cancelBoundPage,
  cancelRefundQuotePage
});

const airCancel = (state, action) => {
  if (action.type === AIR_CANCEL__RESET_FLOW_DATA) {
    return airCancelReducers(undefined, action);
  }

  return airCancelReducers(state, action);
};

export default airCancel;

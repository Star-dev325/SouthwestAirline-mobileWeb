import cancelAnalyticsReducers from 'src/airCancel/reducers/cancelAnalyticsReducers';
import airCancelActionTypes from 'src/airCancel/actions/airCancelActionTypes';

const {
  AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_SUCCESS,
  AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS,
  AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS,
  AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS
} = airCancelActionTypes;

describe('cancelAnalyticsReducers', () => {
  it('should return initial state', () => {
    const action = { type: '@@INIT' };

    expect(cancelAnalyticsReducers({}, action).data).is.deep.equal(null);
  });

  it('should return response when AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_SUCCESS action type is triggered', () => {
    const response = { viewCancelReservationPage: { viewForCancelAnalytics: 'some analytics data' } };
    const action = { type: AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_SUCCESS, response };

    expect(cancelAnalyticsReducers({}, action).data).is.deep.equal(
      response.viewCancelReservationPage.viewForCancelAnalytics
    );
  });

  it('should return response when AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS action type is triggered', () => {
    const response = { viewForCancelBoundPage: { _analytics: 'some analytics data' } };
    const action = { type: AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS, response };

    expect(cancelAnalyticsReducers({}, action).data).is.deep.equal(response.viewForCancelBoundPage._analytics);
  });

  it('should return response when AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS action type is triggered', () => {
    const response = { cancelRefundQuotePage: { _analytics: 'some analytics data' } };
    const action = { type: AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS, response };

    expect(cancelAnalyticsReducers({}, action).data).is.deep.equal(response.cancelRefundQuotePage._analytics);
  });

  it('should return response when AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS action type is triggered', () => {
    const response = { cancelBoundConfirmationPage: { _analytics: 'some analytics data' } };
    const action = { type: AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS, response };

    expect(cancelAnalyticsReducers({}, action).data).is.deep.equal(response.cancelBoundConfirmationPage._analytics);
  });

  it('should return default state when action is undefined', () => {
    expect(cancelAnalyticsReducers().data).to.deep.equal(null);
  });
});

import cancelRefundQuotePageReducer from 'src/airCancel/reducers/cancelRefundQuotePageReducers';

describe('cancelRefundQuotePageReducer', () => {
  it('should return initial state', () => {
    const action = { type: '@@INIT' };

    expect(cancelRefundQuotePageReducer({}, action).response).is.deep.equal({});
  });

  it('should return response when FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS action type is triggered', () => {
    const response = { cancelRefundQuotePage: 'some test data' };
    const action = { type: 'AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS', response };

    expect(cancelRefundQuotePageReducer({}, action).response).is.deep.equal(response.cancelRefundQuotePage);
  });

  it('should return default state when action is undefined', () => {
    expect(cancelRefundQuotePageReducer().response).to.deep.equal({});
  });
});

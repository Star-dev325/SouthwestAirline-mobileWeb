import cancelBoundPageReducer from 'src/airCancel/reducers/cancelBoundPageReducers';

describe('cancelBoundPageReducer', () => {
  it('should return initial state', () => {
    const action = { type: '@@INIT' };

    expect(cancelBoundPageReducer({}, action).response).is.deep.equal(null);
  });

  it('should return response when FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS action type is triggered', () => {
    const response = { viewForCancelBoundPage: 'some test data' };
    const action = { type: 'AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS', response };

    expect(cancelBoundPageReducer({}, action).response).is.deep.equal(response.viewForCancelBoundPage);
  });

  it('should return response when AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL_SUCCESS action type is triggered', () => {
    const action = {
      type: 'AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL_SUCCESS',
      response: { viewForCancelBoundPage: 'with split pnr test response' }
    };

    expect(cancelBoundPageReducer({}, action).response).to.eql('with split pnr test response');
  });

  it('should return default state when action is undefined', () => {
    expect(cancelBoundPageReducer().response).to.deep.equal(null);
  });
});

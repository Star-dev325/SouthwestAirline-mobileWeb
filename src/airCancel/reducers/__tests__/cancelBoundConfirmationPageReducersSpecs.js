import cancelBoundConfirmationPageReducer from 'src/airCancel/reducers/cancelBoundConfirmationPageReducers';

describe('cancelBoundConfirmationPageReducer', () => {
  it('should return initial state', () => {
    const action = { type: '@@INIT' };

    expect(cancelBoundConfirmationPageReducer({}, action).response).is.deep.equal(null);
  });

  it('should return response when AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS action type is triggered', () => {
    const response = { cancelBoundConfirmationPage: 'some test data' };
    const action = { type: 'AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS', response };

    expect(cancelBoundConfirmationPageReducer({}, action).response).is.deep.equal(response.cancelBoundConfirmationPage);
  });

  it('should return default state when action is undefined', () => {
    expect(cancelBoundConfirmationPageReducer().response).to.deep.equal(null);
  });
});

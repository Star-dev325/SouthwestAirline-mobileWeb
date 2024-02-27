import standbyPageReducer from 'src/standby/reducers/standbyPageReducer';

describe('StandbyPage Reducers', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      response: {}
    };
  });

  it('should return initial state when @@INIT action is triggered', () => {
    const action = {
      type: '@@INIT'
    };

    expect(standbyPageReducer(undefined, action)).to.deep.equal(initialState);
  });

  it('should return response populated STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT_SUCCESS action is triggered', () => {
    const action = {
      type: 'STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT_SUCCESS',
      response: 'response'
    };

    expect(standbyPageReducer(undefined, action)).to.deep.equal({ response: 'response' });
  });

  it('should return default state when action is undefined', () => {
    expect(standbyPageReducer().response).to.deep.equal({});
  });
});

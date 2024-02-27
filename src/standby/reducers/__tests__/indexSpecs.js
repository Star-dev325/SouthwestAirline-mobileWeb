import standbyReducers from 'src/standby/reducers';
import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';

const { SAME_DAY__UPDATE_SAME_DAY_CANCELLATION_SUCCESS } = SameDayActionTypes;

describe('Standby Reducers', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      cancelStandbyListConfirmationPage: {},
      isRevenue: null,
      standbyPage: {
        response: {}
      }
    };
  });

  it('should return initial state when @@INIT action is triggered', () => {
    const action = {
      type: '@@INIT'
    };

    expect(standbyReducers(undefined, action)).to.deep.equal(initialState);
  });

  it('should return isRevenue value when STANDBY__SAVE_IS_REVENUE action is triggered', () => {
    const action = {
      type: 'STANDBY__SAVE_IS_REVENUE',
      isRevenue: true
    };

    expect(standbyReducers(undefined, action)).to.deep.equal({
      cancelStandbyListConfirmationPage: {},
      isRevenue: true,
      standbyPage: {
        response: {}
      }
    });
  });

  it('should return default state when action is undefined', () => {
    expect(standbyReducers().isRevenue).to.deep.equal(null);
  });

  it('should return initial state when SAME_DAY__UPDATE_SAME_DAY_CANCELLATION_SUCCESS action is triggered', () => {
    const action = {
      type: SAME_DAY__UPDATE_SAME_DAY_CANCELLATION_SUCCESS,
      response: { val: 'response' }
    };

    expect(standbyReducers(undefined, action)).to.deep.equal({
      cancelStandbyListConfirmationPage: {
        val: 'response'
      },
      isRevenue: null,
      standbyPage: { response: {} }
    });
  });
});

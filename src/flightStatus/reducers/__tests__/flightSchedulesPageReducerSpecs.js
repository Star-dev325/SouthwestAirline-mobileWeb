import flightStatusActionTypes from 'src/flightStatus/actions/flightStatusActionTypes';
import flightSchedulesPageReducer from 'src/flightStatus/reducers/flightSchedulesPageReducer';

const { FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS_SUCCESS } = flightStatusActionTypes;

describe('flightSchedulesPageReducer', () => {
  it('should return flightSchedulesPage when action FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS_SUCCESS is triggered', () => {
    const action = {
      type: FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS_SUCCESS,
      response: {
        flightSchedulesPage: {
          flights: [],
          header: {}
        }
      }
    };

    expect(flightSchedulesPageReducer({}, action)).to.deep.equal({
      response: {
        flights: [],
        header: {}
      }
    });
  });

  it('should return default state when action is undefined', () => {
    expect(flightSchedulesPageReducer().response).to.deep.equal({});
  });

  it('should return default state when an action besides FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS_SUCCESS is triggered', () => {
    const action = {
      type: '@@INIT'
    };

    expect(flightSchedulesPageReducer(undefined, action)).to.deep.equal({
      response: {}
    });
  });
});

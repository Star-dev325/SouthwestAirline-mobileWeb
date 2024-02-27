import flightStatusActionTypes from 'src/flightStatus/actions/flightStatusActionTypes';
import flightStatusDetailsPageReducer from 'src/flightStatus/reducers/flightStatusDetailsPageReducer';

const { FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS_SUCCESS, FLIGHT_STATUS__LOOKUP_FLIGHT_DETAILS_SUCCESS } =
  flightStatusActionTypes;

describe('flightStatusDetailsPageReducer', () => {
  const response = {
    flightStatusDetailsPage: {
      flightCards: [],
      header: {}
    }
  };

  it('should return the flightStatusDetailsPage when action FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS_SUCCESS is triggered', () => {
    const action = {
      type: FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS_SUCCESS,
      response
    };

    expect(flightStatusDetailsPageReducer({}, action)).to.deep.equal({
      response: {
        flightCards: [],
        header: {}
      }
    });
  });

  it('should return default state when action is undefined', () => {
    expect(flightStatusDetailsPageReducer().response).to.deep.equal({});
  });

  it('should return the flightStatusDetailsPage when action FLIGHT_STATUS__LOOKUP_FLIGHT_DETAILS_SUCCESS is triggered', () => {
    const action = {
      type: FLIGHT_STATUS__LOOKUP_FLIGHT_DETAILS_SUCCESS,
      response
    };

    expect(flightStatusDetailsPageReducer({}, action)).to.deep.equal({
      response: {
        flightCards: [],
        header: {}
      }
    });
  });

  it('should return default state when not triggered by FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS_SUCCESS or FLIGHT_STATUS__LOOKUP_FLIGHT_DETAILS_SUCCESS', () => {
    const action = {
      type: '@@INIT'
    };

    expect(flightStatusDetailsPageReducer(undefined, action)).to.deep.equal({
      response: {}
    });
  });
});

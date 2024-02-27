import flightStatus from 'src/flightStatus/reducers';
import flightStatusActionTypes from 'src/flightStatus/actions/flightStatusActionTypes';

import _ from 'lodash';

describe('index - flightStatusReducers', () => {
  const defaultState = {
    flightSchedulesPage: {
      response: {}
    },
    flightStatusDetailsPage: {
      response: {}
    },
    flightStatusRecentPage: {
      searches: []
    },
    selectedRecentSearchRequest: null
  };

  it('should create default store structure when @@INIT action is triggered', () => {
    const action = {
      type: '@@INIT'
    };

    expect(flightStatus({}, action)).to.deep.equal(defaultState);
  });

  it('should reset air booking flow data except search request and recent search pages when action type is RESET_AIR_BOOKING_FLOW_DATA', () => {
    const modifiedState = _.merge({}, defaultState, {
      flightSchedulesPage: { test: 'test' },
      flightStatusRecentPage: { searches: ['123'] }
    });

    const updatedState = flightStatus(modifiedState, { type: flightStatusActionTypes.FLIGHT_STATUS__RESET_FLOW_DATA });

    const expectedDefaultStateWithNonDefaultSearchRequest = _.merge({}, defaultState, {
      flightStatusRecentPage: { searches: ['123'] }
    });

    expect(updatedState).to.deep.equal(expectedDefaultStateWithNonDefaultSearchRequest);
  });
});

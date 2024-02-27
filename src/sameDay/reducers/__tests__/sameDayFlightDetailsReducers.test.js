import sameDayFlightDetails from 'src/sameDay/reducers/sameDayFlightDetailsReducers';
import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';

const {
  SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO,
  SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO_SUCCESS,
  SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION
} = SameDayActionTypes;

describe('sameDayFlightDetails', () => {
  it('should return initial state when action is undefined', () => {
    const initialState = { test: 'test' };

    expect(sameDayFlightDetails(initialState, undefined)).toEqual(initialState);
  });

  it('should return initial state when action type is not recognized', () => {
    const initialState = { test: 'test' };

    expect(sameDayFlightDetails(initialState, { type: 'TEST' })).toEqual(initialState);
  });

  it('should return initial state when action is fetch flight details info', () => {
    const actionSameDayFlightDetailsInfo = {
      type: SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO
    };
    const initialState = { test: 'test' };

    expect(sameDayFlightDetails(initialState, actionSameDayFlightDetailsInfo)).toEqual(initialState);
  });

  it('should reset data when new shopping data is requested', () => {
    const initialState = { WN1999: { } };
    const shoppingAction = { type: SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO };

    expect(sameDayFlightDetails(initialState, shoppingAction)).toEqual({});
  });

  it('should reset data when standby is confirmed', () => {
    const initialState = { WN1999: { } };
    const shoppingAction = { type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION };

    expect(sameDayFlightDetails(initialState, shoppingAction)).toEqual({});
  });

  it('should update the state with new information when details are received', () => {
    const actionSameDayFlightDetailsInfoSuccess = {
      type: SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO_SUCCESS,
      response: {
        sameDayFlightDetails: 'WN2000',
        flightIdentifier: 'WN2000'
      }
    };
    const expectedState = {
      WN1999: 'WN1999',
      WN2000: 'WN2000'
    };
    const initialState = { WN1999: 'WN1999' };

    expect(sameDayFlightDetails(initialState, actionSameDayFlightDetailsInfoSuccess))
      .toEqual(expectedState);
  });
});

import sameDayShoppingPageReducers from 'src/sameDay/reducers/sameDayShoppingPageReducers';
import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';

const {
  SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO,
  SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_SUCCESS,
  SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO_SUCCESS
} = SameDayActionTypes;

describe('SameDayShoppingPageReducers', () => {
  it('should return empty {} when SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO action is triggered with state is undefined', () => {
    const action = {
      type: SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO
    };

    expect(sameDayShoppingPageReducers(undefined, action)).toEqual({
      sameDayFlightDetails: {},
      sameDayShoppingInformation: {}
    });
  });

  it('should return initial state when SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_SUCCESS action is triggered', () => {
    const action = {
      type: SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_SUCCESS,
      response: { val: 'response' }
    };

    expect(sameDayShoppingPageReducers(undefined, action)).toEqual({
      sameDayFlightDetails: {},
      sameDayShoppingInformation: { val: 'response' }
    });
  });

  it('should return initial state when SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO_SUCCESS action is triggered', () => {
    const action = {
      type: SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO_SUCCESS,
      response: { val: 'response' }
    };

    expect(sameDayShoppingPageReducers(undefined, action)).toEqual({
      sameDayFlightDetails: { undefined: undefined },
      sameDayShoppingInformation: {}
    });
  });

  it('should return default state when action is undefined', () => {
    const initialState = {
      sameDayShoppingPage: {
        sameDayFlightDetails: {},
        sameDayShoppingInformation: {}
      }
    };

    expect(sameDayShoppingPageReducers(initialState, undefined)).toEqual({
      sameDayFlightDetails: {},
      sameDayShoppingInformation: {}
    });
  });
});

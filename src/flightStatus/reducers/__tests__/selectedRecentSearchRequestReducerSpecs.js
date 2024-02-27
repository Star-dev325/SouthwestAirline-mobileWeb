import { selectedRecentSearchRequest } from 'src/flightStatus/reducers/selectedRecentSearchRequestReducer';
import flightStatusActionTypes from 'src/flightStatus/actions/flightStatusActionTypes';

const { FLIGHT_STATUS__SAVE_SELECTED_RECENT_SEARCH_REQUEST } = flightStatusActionTypes;

describe('selectedRecentSearchRequestReducer', () => {
  it('should return search request when FLIGHT_STATUS__SAVE_SEARCH_REQUEST action is triggered', () => {
    const searchRequest = {
      from: 'DAL',
      to: 'AUS',
      date: '2018-03-23',
      flightNumber: '1001'
    };

    const action = {
      type: FLIGHT_STATUS__SAVE_SELECTED_RECENT_SEARCH_REQUEST,
      selectedRecentSearchRequest: searchRequest
    };

    expect(selectedRecentSearchRequest({}, action)).to.deep.equal(searchRequest);
  });

  it('should return default state when action is undefined', () => {
    expect(selectedRecentSearchRequest()).to.deep.equal(null);
  });

  it('should return default state when INIT action is triggered', () => {
    const action = {
      type: '@@INIT'
    };

    expect(selectedRecentSearchRequest(undefined, action)).to.equal(null);
  });
});

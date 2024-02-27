import flightStatusActionTypes from 'src/flightStatus/actions/flightStatusActionTypes';
import recentSearchesPageReducer from 'src/flightStatus/reducers/recentSearchesPageReducer';

const { FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS } = flightStatusActionTypes;

describe('recentSearchesPageReducer', () => {
  it('should return flightSchedulesPage when action FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS_SUCCESS is triggered', () => {
    const searches = [
      {
        from: 'DAL',
        to: 'HOU',
        date: '2018-01-01'
      },
      {
        from: 'HOU',
        to: 'CVG',
        date: '2018-03-23',
        flight: '1001'
      }
    ];
    const action = {
      type: FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS,
      searches
    };

    expect(recentSearchesPageReducer({}, action)).to.deep.equal({ searches });
  });

  it('should return default state when action is undefined', () => {
    expect(recentSearchesPageReducer().response).to.deep.equal(undefined);
  });

  it('should return default state when an action besides FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS_SUCCESS is triggered', () => {
    const action = {
      type: '@@INIT'
    };

    expect(recentSearchesPageReducer(undefined, action)).to.deep.equal({
      searches: []
    });
  });
});

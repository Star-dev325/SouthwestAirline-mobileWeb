import sinonModule from 'sinon';
import recentSearchesPageReducers from 'src/airBooking/reducers/recentSearchesPageReducers';
import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';

const sinon = sinonModule.sandbox.create();

describe('recentSearchesPageReducers', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should init state', () => {
    expect(recentSearchesPageReducers(undefined, {})).to.deep.equal({
      searches: []
    });
  });

  context('searches', () => {
    it('should set searches after fetch success', () => {
      const response = ['test'];
      const state = recentSearchesPageReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_RECENT_SEARCH_PAGE_SUCCESS,
        searches: response
      });

      expect(state.searches).to.deep.equal(response);
    });

    it('should return default state when action is undefined', () => {
      expect(recentSearchesPageReducers().searches).to.be.empty;
    });

    it('should set searches when delete one search request', () => {
      const response = ['test'];
      const state = recentSearchesPageReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__DELETE_CURRENT_SEARCH_REQUEST,
        searches: response
      });

      expect(state.searches).to.deep.equal(response);
    });
  });
});

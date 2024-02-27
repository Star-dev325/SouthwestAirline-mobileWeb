import reducer, { initialState } from 'src/homeAndNav/reducers/homepageReducers';
import types from 'src/homeAndNav/actions/homeAndNavActionTypes';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';

describe('Home Page reducer', () => {
  it('should return the new hero contents', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState);
  });

  it('should return hero promotions', () => {
    const homeContents = { heroes: ['something', 'new', 'promotion'], banners: ['new', 'banners'], loginBanner: 'banner' };
    const action = { type: types.HOME_NAV__FETCH_HOMEPAGE_PLACEMENTS_SUCCESS, response: homeContents };
    const expected = {
      ...initialState,
      heroContents: homeContents.heroes,
      homeBanners: homeContents.banners,
      loginBanner: homeContents.loginBanner
    };

    expect(reducer(undefined, action)).to.deep.equal(expected);
  });

  it('should clear the upcoming trips count', () => {
    const action = { type: types.HOME_NAV__CLEAR_UPCOMING_TRIPS_COUNT, payload: 0 };
    const expected = { ...initialState, upcomingTripsCount: 0 };

    expect(reducer(undefined, action)).to.deep.equal(expected);
  });

  it('should get the upcoming trips count', () => {
    const action = {
      type: SharedActionTypes.SHARED__FETCH_UPCOMING_TRIPS_SUCCESS,
      response: { upcomingTripsPage: [1, 2, 3] }
    };
    const expected = { ...initialState, upcomingTripsCount: 3 };

    expect(reducer(undefined, action)).to.deep.equal(expected);
  });

  it('should delete the hero contents', () => {
    const action = {
      type: types.HOME_NAV__RESET_HERO_CONTENTS,
      heroContents: []
    };
    const expected = { ...initialState, heroContents: [] };

    expect(reducer(undefined, action)).to.deep.equal(expected);
  });

  it('should return default state when action is undefined', () => {
    expect(reducer()).to.deep.equal(initialState);
  });
});

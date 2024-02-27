import types from 'src/homeAndNav/actions/homeAndNavActionTypes';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';

export const initialState = {
  homeBanners: [],
  heroContents: [],
  upcomingTripsCount: 0,
  homepagePromotions: [],
  entertainmentPortalUrl: undefined,
  trip: null
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.HOME_NAV__FETCH_HOMEPAGE_PLACEMENTS_FAILED:
      return { ...state };
    case SharedActionTypes.SHARED__FETCH_UPCOMING_TRIPS_SUCCESS: {
      const trips = action.response.upcomingTripsPage;
      const trip = trips.length > 1 ? null : trips[0];

      return { ...state, upcomingTripsCount: action.response.upcomingTripsPage.length, trip };
    }
    case types.HOME_NAV__FETCH_HOMEPAGE_PLACEMENTS_SUCCESS:
      return {
        ...state,
        heroContents: action.response.heroes,
        homeBanners: action.response.banners,
        loginBanner: action.response.loginBanner
      };
    case types.HOME_NAV__RESET_HERO_CONTENTS:
      return { ...state, heroContents: initialState.heroContents, homeBanners: initialState.homeBanners };
    case types.HOME_NAV__CLEAR_UPCOMING_TRIPS_COUNT:
      return { ...state, upcomingTripsCount: action.payload };
    default:
      return state;
  }
};

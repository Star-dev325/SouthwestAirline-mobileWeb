// @flow
import homeAndNavActionTypes, { apiActionCreator } from 'src/homeAndNav/actions/homeAndNavActionTypes';
import { transformHomeHeroesToHeroContents } from 'src/homeAndNav/transformers/heroShotsTransformers';
import { getMboxConfig, getSegments, getTargetParams } from 'src/shared/actions/adobeTargetActions';
import AdobeTargetConstants from 'src/shared/constants/adobeTargetConstants';
import { getPlacements } from 'src/wcm/actions/wcmActions';
import { HOME_PAGE_ID } from 'src/wcm/constants/wcmConstants';

const { HOME_PAGE_MBOX1_ID, HOME_PAGE_MBOX2_ID } = AdobeTargetConstants;
const {
  HOME_NAV__CLEAR_UPCOMING_TRIPS_COUNT,
  HOME_NAV__FETCH_HOMEPAGE_PLACEMENTS,
  HOME_NAV__RESET_HERO_CONTENTS,
  HOME_NAV__RESET_MENUS_TO_INIT
} = homeAndNavActionTypes;

const { fetchHomepagePlacements, fetchHomepagePlacementsSuccess, fetchHomepagePlacementsFailed } = apiActionCreator(
  HOME_NAV__FETCH_HOMEPAGE_PLACEMENTS
);

export const loadHomepagePlacements = (nearestStation: string = '') => (dispatch: *) => {
  dispatch(fetchHomepagePlacements());
  const station = { nearestStation };
  const defaultMboxes = [HOME_PAGE_MBOX1_ID, HOME_PAGE_MBOX2_ID];

  return dispatch(getTargetParams({}, HOME_PAGE_ID))
    .then((params) => dispatch(getMboxConfig(HOME_PAGE_ID, params, defaultMboxes)))
    .then((config) => dispatch(getSegments(config)))
    .then((segments) => dispatch(getPlacements(HOME_PAGE_ID, [], segments, station)))
    .then((content) => dispatch(fetchHomepagePlacementsSuccess(transformHomeHeroesToHeroContents(content))))
    .catch((error) => dispatch(fetchHomepagePlacementsFailed(error)));
};

export const clearUpcomingTripsCount = () => ({
  type: HOME_NAV__CLEAR_UPCOMING_TRIPS_COUNT,
  payload: 0
});

export const resetHeroContents = () => ({
  type: HOME_NAV__RESET_HERO_CONTENTS
});

export const resetNavMenus = () => ({
  type: HOME_NAV__RESET_MENUS_TO_INIT
});

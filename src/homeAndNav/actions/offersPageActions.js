// @flow
import _ from 'lodash';
import homeAndNavActionTypes, { apiActionCreator } from 'src/homeAndNav/actions/homeAndNavActionTypes';
import { getSegments, getTargetParams, getMboxConfig } from 'src/shared/actions/adobeTargetActions';
import { getPlacements } from 'src/wcm/actions/wcmActions';
import AdobeTargetConstants from 'src/shared/constants/adobeTargetConstants';
import { OFFERS_PAGE_ID } from 'src/wcm/constants/wcmConstants';

import type { Dispatch as ThunkDispatch } from 'src/shared/flow-typed/shared.types';
import type { WcmContentResponse, TemplateDataType } from 'src/wcm/flow-typed/wcm.types';

const { OFFERS_PAGE_OFFER1_MBOX_ID, OFFERS_PAGE_OFFER2_MBOX_ID } = AdobeTargetConstants;
const {
  HOME_NAV__FETCH_OFFERS_PAGE_PLACEMENTS,
  HOME_NAV__SAVE_OFFERS_PAGE_PLACEMENTS,
  HOME_NAV__SAVE_OFFERS_PAGE_TEMPLATE_DATA
} = homeAndNavActionTypes;

const { fetchOffersPagePlacements, fetchOffersPagePlacementsSuccess, fetchOffersPagePlacementsFailed } =
  apiActionCreator(HOME_NAV__FETCH_OFFERS_PAGE_PLACEMENTS);

export const loadOffersPagePlacements =
  () =>
    (dispatch: ThunkDispatch, getState: () => *): Promise<*> => {
      const placements = _.get(_.cloneDeep(getState()), 'app.homeAndNav.offersPage.placements');

      if (!_.isEmpty(placements)) {
        return Promise.resolve();
      }
      const defaultMboxes = [OFFERS_PAGE_OFFER1_MBOX_ID, OFFERS_PAGE_OFFER2_MBOX_ID];

      dispatch(fetchOffersPagePlacements());

      return dispatch(getTargetParams({}, OFFERS_PAGE_ID))
        .then((params) => dispatch(getMboxConfig(OFFERS_PAGE_ID, params, defaultMboxes)))
        .then((config) => dispatch(getSegments(config)))
        .then((segments) => dispatch(getPlacements(OFFERS_PAGE_ID, [], segments)))
        .then((content) => dispatch(fetchOffersPagePlacementsSuccess(content)))
        .catch(() => dispatch(fetchOffersPagePlacementsFailed()));
    };

export const saveOffersPagePlacements = (response: WcmContentResponse) => ({
  type: HOME_NAV__SAVE_OFFERS_PAGE_PLACEMENTS,
  response
});

export const saveOffersPageTemplateData = (templateData: TemplateDataType) => ({
  type: HOME_NAV__SAVE_OFFERS_PAGE_TEMPLATE_DATA,
  templateData
});

// @flow

import AdobeTargetConstants from 'src/shared/constants/adobeTargetConstants';
import WcmConfigConstants from 'src/wcm/constants/wcmConfig';
import { getMboxConfig, getSegments, getTargetParams } from 'src/shared/actions/adobeTargetActions';
import { getPlacements, getFormattedActions } from 'src/wcm/actions/wcmActions';
import { RAPID_REWARDS_PAGE_ID } from 'src/wcm/constants/wcmConstants';
import { transformPromoBannerContentToPromotion } from 'src/rapidRewards/transformers/promoBannersTransformer';

const { rapidRewardsPromotions } = WcmConfigConstants;

export const retrievePromotions = () => {
  const defaultMboxes = [AdobeTargetConstants.RAPID_REWARDS_MBOX_ID];
  const { fetchSuccess, fetchFailed } = getFormattedActions(rapidRewardsPromotions.actionType,
    { isSpinnerNeeded: false });

  return (dispatch: *) =>
    dispatch(getTargetParams({}, RAPID_REWARDS_PAGE_ID))
      .then((params) => dispatch(getMboxConfig(RAPID_REWARDS_PAGE_ID, params, defaultMboxes)))
      .then((config) => dispatch(getSegments(config)))
      .then((segments) => dispatch(getPlacements(RAPID_REWARDS_PAGE_ID, [], segments)))
      .then((content) => dispatch(fetchSuccess(transformPromoBannerContentToPromotion(content))))
      .catch(() => { dispatch(fetchFailed()); });
};

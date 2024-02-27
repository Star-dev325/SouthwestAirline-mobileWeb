// @flow
import _ from 'lodash';
import type { ChaseCodes } from 'src/shared/flow-typed/shared.types';

type earlyBirdType = {
  earlyBirdEligible: boolean,
  earlyBirdSelected: boolean
};

export const toAdobeParams = (
  chaseCodes: ChaseCodes,
  oauthLoginResponse: *,
  earlyBird: earlyBirdType,
  chaseVisaRrEnrolled: boolean = false
) => ({
  ...chaseCodes,
  ...earlyBird,
  redeemablePoints: _.get(oauthLoginResponse, 'customers.UserInformation.redeemablePoints'),
  companionRemainingPoints: _.get(
    oauthLoginResponse,
    'customers.UserInformation.companionPassInfo.companionRemainingPoints'
  ),
  chaseVisaRrEnrolled
});

export const parseMbox = (content: string): any => {
  try {
    return JSON.parse(content);
  } catch (e) {
    return {};
  }
};

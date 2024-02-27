// @flow
import _ from 'lodash';

export function transformUserInfo(oauthLoginResponse: *) {
  const transformedUserInfo = _.unflatten(oauthLoginResponse);

  const companionQualifyingPoints = _.get(
    transformedUserInfo,
    'customers.UserInformation.companionPassInfo.companionQualifyingPoints'
  );
  const companionQualifyingPointsRequired = _.get(
    transformedUserInfo,
    'customers.UserInformation.companionPassInfo.companionQualifyingPointsRequired'
  );

  _.set(
    transformedUserInfo,
    'customers.UserInformation.companionPassInfo.companionRemainingPoints',
    companionQualifyingPointsRequired - companionQualifyingPoints || undefined
  );

  return transformedUserInfo;
}

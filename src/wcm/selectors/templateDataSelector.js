// @flow
import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { toFormattedStringFromNumber, toNumberFromFormattedString } from 'src/shared/helpers/currencyValueHelper';

const getCompanionRemainingPoints = (state) =>
  _.get(state, 'app.account.userInfo.customers.UserInformation.companionPassInfo.companionRemainingPoints');
const getDestinationAirport = (state) =>
  _.get(state, 'app.account.userInfo.customers.UserInformation.recentFlightDestinationAirport', '');
const getFirstName = (state) => state?.app?.account?.userInfo?.customers?.UserInformation?.firstName ?? '';
const getRedeemablePoints = (state) =>
  state?.app?.account?.userInfo?.customers?.UserInformation?.redeemablePoints ??
  state?.app?.account?.accountInfo?.rapidRewardsDetails?.redeemablePoints;

export const getBaseTemplateData = createSelector(
  [getRedeemablePoints, getCompanionRemainingPoints, getDestinationAirport, getFirstName],
  (redeemablePoints: number, companionRemainingPoints: number, destinationAirport: string, firstName: string) => ({
    companionRemainingPoints: toFormattedStringFromNumber(companionRemainingPoints),
    destinationAirport,
    firstName,
    redeemablePoints: toFormattedStringFromNumber(redeemablePoints)
  })
);

export const getAugmentedTemplateData = (baseTemplateData: *, additionalTemplateData: *, placementData: *) => {
  const templateData = { ...baseTemplateData, ...additionalTemplateData };

  const { redeemablePoints = '' } = templateData;
  const { offerTotal = '' } = placementData || {};

  return {
    ...templateData,
    offerTotal,
    totalPoints: calculateTotalPoints(redeemablePoints, offerTotal)
  };
};

const calculateTotalPoints = (redeemablePoints, offerTotal) => {
  const redeemablePointsAmt = toNumberFromFormattedString(redeemablePoints);
  const offerTotalAmt = toNumberFromFormattedString(offerTotal);

  return toFormattedStringFromNumber(redeemablePointsAmt + offerTotalAmt);
};

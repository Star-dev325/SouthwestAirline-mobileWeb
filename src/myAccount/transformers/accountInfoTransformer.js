import _ from 'lodash';
import { createSha256Hash } from 'src/shared/helpers/hashHelper';
import dayjs from 'dayjs';
import { DAYJS_TIMESTAMP_FORMAT } from 'src/shared/constants/dayjsConstants';

export default (apiResponse, ACCOUNT_INFO_TIMEOUT_MIN = 1) => {
  const userName = _.chain(apiResponse)
    .get(['customerInfo', 'name', 'preferredName'], _.get(apiResponse, ['customerInfo', 'name', 'firstName']))
    .split(' ')
    .map(_.capitalize)
    .join(' ')
    .value();
  const { companionInfo, customerInfo, rapidRewardsDetails, contactInfo, isTierStatusPending } = apiResponse;
  const { firstName, lastName } = _.get(customerInfo, 'name', {});
  const birthDate = _.get(customerInfo, 'birthDate');
  const tier = _.get(rapidRewardsDetails, 'tierInfo.tier');
  const userAlreadyHasChaseRRVisa = _.get(rapidRewardsDetails, 'chaseVisaRrEnrolled');
  const redeemablePoints = _.get(rapidRewardsDetails, 'redeemablePoints');
  const isEnrolledInRapidRewards = _.get(rapidRewardsDetails, 'isEnrolledInRapidRewards');
  const companionPassInfo = _.get(rapidRewardsDetails, 'companionPassInfo');
  const countryCode = _.get(contactInfo, 'address.isoCountryCode');
  const emailAddress = createSha256Hash(_.get(contactInfo, 'emailAddress'));
  const expirationMinutes = _.toNumber(ACCOUNT_INFO_TIMEOUT_MIN);
  const expirationDate = dayjs().add(expirationMinutes, 'minutes').format(DAYJS_TIMESTAMP_FORMAT);
  const accountInfoWithoutCompanionInfo = {
    customerInfo: {
      accountNumber: _.get(customerInfo, 'accountNumber'),
      name: {
        userName,
        firstName,
        lastName
      },
      emailAddress,
      birthDate,
      countryCode
    },
    isTierStatusPending: !!isTierStatusPending,
    rapidRewardsDetails: {
      userAlreadyHasChaseRRVisa,
      tierInfo: {
        tier
      },
      isEnrolledInRapidRewards,
      redeemablePoints,
      companionPassInfo
    },
    contactInfo,
    expirationDate
  };
  const companionName = _.get(companionInfo, 'name');

  if (!companionName) {
    return accountInfoWithoutCompanionInfo;
  }

  const companionAccountNumber = _.get(companionInfo, 'accountNumber');
  const companionFullName = `${companionName.firstName} ${companionName.lastName}`;

  return _.assign({}, accountInfoWithoutCompanionInfo, { companionName, companionFullName, companionAccountNumber });
};

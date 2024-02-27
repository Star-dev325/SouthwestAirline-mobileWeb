import React from 'react';
import _ from 'lodash';
import Icon from 'src/shared/components/icon';
import TierStatusGroupLabel from 'src/myAccount/components/tierStatusGroupLabel';
import i18n from '@swa-ui/locale';

const NON_ELITE_VALUE = 'NON_ELITE';
const A_LIST_VALUE = 'A_LIST';
const A_LIST_PREFERRED_VALUE = 'A_LIST_PREFERRED';
const COMPANION_PASS_VALUE = 'COMPANION_PASS';

const tierMap = [
  {
    label: i18n('MY_ACCOUNT__A_LIST'),
    value: A_LIST_VALUE,
    points: 35000,
    flights: 20
  },
  {
    label: i18n('MY_ACCOUNT__A_LIST_PREFERRED'),
    value: A_LIST_PREFERRED_VALUE,
    points: 70000,
    flights: 40
  }
];

const companionPassMap = {
  label: i18n('MY_ACCOUNT__COMPANION_PASS'),
  value: COMPANION_PASS_VALUE,
  points: 110000,
  flights: 100
};

export const getTierStatusByTierInfo = (tierInfo) => {
  const status = {
    current: {
      label: i18n('MY_ACCOUNT__RAPID_REWARDS_MEMBER'),
      value: NON_ELITE_VALUE
    },
    next: tierMap[0]
  };

  _.forEach(tierMap, (item, index, list) => {
    if (tierInfo && item.value === tierInfo.tier) {
      status.current = _.clone(item);

      let nextIndex = index < list.length - 1 ? index + 1 : index;

      if (tierInfo.tier === A_LIST_VALUE && !_hasAListQualifyingPointsOrFlights(tierInfo)) {
        nextIndex = 0;
      }

      status.next = _.clone(list[nextIndex]);
    }
  });

  return status;
};

export const getTierStatusGroupLabel = (tierInfo) => {
  const { current, next } = getTierStatusByTierInfo(tierInfo);

  return (
    <TierStatusGroupLabel
      next={next}
      current={current}
      isAList={tierInfo.tier === A_LIST_VALUE}
      earnedAListThisYear={_hasAListQualifyingPointsOrFlights(tierInfo)}
      isAListPreferred={tierInfo.tier === A_LIST_PREFERRED_VALUE}
      earnedAListPreferredThisYear={_hasAListPreferredQualifyingPointsOrFlights(tierInfo)}
    />
  );
};

const _hasAListQualifyingPointsOrFlights = (tierInfo) =>
  tierInfo.tierQualifyingPoints >= getTierMapProperty(A_LIST_VALUE, 'points') ||
  tierInfo.tierQualifyingFlights >= getTierMapProperty(A_LIST_VALUE, 'flights');

const _hasAListPreferredQualifyingPointsOrFlights = (tierInfo) =>
  tierInfo.tierQualifyingPoints >= getTierMapProperty(A_LIST_PREFERRED_VALUE, 'points') ||
  tierInfo.tierQualifyingFlights >= getTierMapProperty(A_LIST_PREFERRED_VALUE, 'flights');

export const getCompanionPassStatusGroupLabel = (companionPassInfo) => {
  let preString = '';

  if (_hasCompanionQualifyingPointsOrFlights(companionPassInfo)) {
    preString = i18n('MY_ACCOUNT__YOUVE_EARNED_YOUR');
  } else {
    preString = companionPassInfo.companionPassAchieved
      ? i18n('MY_ACCOUNT__EARN_YOUR_NEXT')
      : i18n('MY_ACCOUNT__CLIMBING_TOWARDS');
  }

  return (
    <span>
      {preString}
      <b> {i18n('MY_ACCOUNT__COMPANION_PASS')}. </b>
    </span>
  );
};

const _hasCompanionQualifyingPointsOrFlights = (companionPassInfo) =>
  companionPassInfo.companionQualifyingPoints >= companionPassMap.points ||
  companionPassInfo.companionQualifyingFlights >= companionPassMap.flights;

export const shouldShowCongratulationForTier = (tierInfo) => {
  const isAListPreferred = tierInfo.tier === A_LIST_PREFERRED_VALUE;

  return isAListPreferred && _hasAListPreferredQualifyingPointsOrFlights(tierInfo);
};

const _shouldShowCongratulationsForCompanionPass = (companionPassInfo) =>
  companionPassInfo && _hasCompanionQualifyingPointsOrFlights(companionPassInfo);

export const getCongratulationForTier = (tierInfo) =>
  (shouldShowCongratulationForTier(tierInfo) ? (
    <span>
      <Icon type="check" />
      {i18n('MY_ACCOUNT__CONGRATULATIONS')}
    </span>
  ) : null);

export const getCongratulationForCompanionPass = (companionPassInfo) =>
  (_shouldShowCongratulationsForCompanionPass(companionPassInfo) ? (
    <span>
      <Icon type="check" />
      {i18n('MY_ACCOUNT__CONGRATULATIONS')}
    </span>
  ) : null);

const getTierMapProperty = (tier, property) => _.chain(tierMap).find({ value: tier }).result(property).value();

// @flow
import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

import type { ApplicationInfo } from 'src/airBooking/flow-typed/airBooking.types';

const getIsLoggedIn = (state) => _.get(state, 'app.account.isLoggedIn', false);
const getChasePrequalToggle = (state) => _.get(state, 'app.toggles.CHASE_PREQUAL', false);
const getChasePrequalWithoutLogin = (state) => _.get(state, 'app.toggles.CHASE_PREQUAL_WITHOUT_LOGIN', false);
const getCountryCode = (state) => _.get(state, 'app.account.accountInfo.customerInfo.countryCode', 'US');
const getApplicationInfo = (state) => _.get(state, 'app.chase.applicationInfo');
const getIsChaseExistingCardMember = (state) => _.get(state, 'app.chase.isChaseExistingCardMember', false);
const getEarlyBirdSelected = (state: *) => _.get(state, 'app.airBooking.earlyBirdSelected', false);

export const getUserAlreadyHasChaseRRVisa = (state: *) =>
  _.get(state, 'app.account.accountInfo.rapidRewardsDetails.userAlreadyHasChaseRRVisa', false);

export const shouldShowChasePlacements = (state: *) => baseSelector(state);

export const shouldCheckPrequal = (state: *) => prequalSelector(state) && baseSelector(state);

export const getAudienceWcmAppContext = createSelector(
  [getUserAlreadyHasChaseRRVisa, getIsChaseExistingCardMember],
  (userAlreadyHasChaseRRVisa, isChaseExistingCardMember) => {
    const audience = userAlreadyHasChaseRRVisa || isChaseExistingCardMember ? 'ecm' : 'acq';

    return `aud-${audience}`;
  }
);

export const getChaseWcmAppContext = createSelector(
  [getUserAlreadyHasChaseRRVisa, getIsChaseExistingCardMember, getEarlyBirdSelected, getCountryCode],
  (userAlreadyHasChaseRRVisa, isChaseExistingCardMember, earlyBirdSelected, countryCode) => {
    const audience = userAlreadyHasChaseRRVisa || isChaseExistingCardMember ? 'ecm' : 'acq';
    const internationalAddress = countryCode !== 'US' ? 'true' : 'false';

    return `aud-${audience}_eb-${earlyBirdSelected}_intl-${internationalAddress}`;
  }
);

const baseSelector = createSelector([getApplicationInfo], (applicationInfo: ?ApplicationInfo) => {
  const { chaseApplicationCompleted = false } = applicationInfo ?? {};

  return !chaseApplicationCompleted;
});

const prequalSelector = createSelector(
  [getIsLoggedIn, getChasePrequalToggle, getChasePrequalWithoutLogin],
  (isLoggedIn: boolean, CHASE_PREQUAL: boolean, CHASE_PREQUAL_WITHOUT_LOGIN: boolean) =>
    (isLoggedIn ? CHASE_PREQUAL : CHASE_PREQUAL_WITHOUT_LOGIN)
);

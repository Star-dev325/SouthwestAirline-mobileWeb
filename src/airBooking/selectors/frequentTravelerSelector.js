// @flow
import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

import type { FrequentTravelerType } from 'src/shared/flow-typed/shared.types';

const getIsLoggedIn = (state) => _.get(state, 'app.account.isLoggedIn');
const getFrequentTravelerList = (state) => _.get(state, 'app.airBooking.accountInfo.frequentTravelerList') || [];

export const shouldShowFrequentTravelers = createSelector(
  [getIsLoggedIn, getFrequentTravelerList],
  (isLoggedIn: boolean, frequentTravelerList: Array<FrequentTravelerType>) =>
    isLoggedIn && frequentTravelerList.length > 0
);

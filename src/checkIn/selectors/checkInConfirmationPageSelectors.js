// @flow
import _ from 'lodash';

import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getCheckInViewReservationPage = (state) => _.get(state, 'app.checkIn.checkInViewReservationPage');
const getCheckInSessionToken = (state) => _.get(state, 'app.checkIn.checkInFlowData.checkInSessionToken');
const getIsLoggedIn = (state) => _.get(state, 'app.account.isLoggedIn');

export const getCheckInRequest = createSelector(
  [getCheckInViewReservationPage, getCheckInSessionToken, getIsLoggedIn],
  (checkInViewReservationPage, checkInSessionToken, isLoggedIn) => {
    const checkInRequest = _.cloneDeep(_.get(checkInViewReservationPage, '_links.checkIn'));

    if (_.isEmpty(checkInRequest)) {
      return null;
    }

    _.merge(checkInRequest.body, { checkInSessionToken });

    return { ...checkInRequest, isLoggedIn };
  }
);

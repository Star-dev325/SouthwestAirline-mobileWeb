import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getAccountInfo = (state) => _.get(state, 'app.airBooking.accountInfo');
const isInternationalBooking = (state) => _.get(state, 'app.airBooking.isInternationalBooking');

export const isAlreadyHasContactMethod = createSelector(
  [getAccountInfo, isInternationalBooking],
  (accountInfo, internationalBooking) => {
    const contactMethod = _.get(accountInfo, 'contactMethod');

    if (internationalBooking && contactMethod === 'CALL_ME') {
      return false;
    }

    return !_.isEmpty(_.get(accountInfo, 'contactMethod'));
  }
);

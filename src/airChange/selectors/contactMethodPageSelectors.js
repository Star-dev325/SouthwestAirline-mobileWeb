import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getContactMethod = (state) => _.get(state, 'app.airChange.accountInfo.contactMethod');
const getIsInternationalBooking = (state) =>
  _.get(state, 'app.airChange.changePricingPage.response._meta.isInternational');

export const isAlreadyHasContactMethod = createSelector(
  [getContactMethod, getIsInternationalBooking],
  (contactMethod, isInternationalBooking) => {
    if (isInternationalBooking && contactMethod === 'CALL_ME') {
      return false;
    }

    return !_.isEmpty(contactMethod);
  }
);

import _ from 'lodash';
import * as contactMethodPageHelper from 'src/shared/helpers/contactMethodPageHelper';

const getContactMethod = (state) =>
  _.get(state, 'app.companion.companionPassengerPage.response.companionDetailsPage.contactMethod');
const isInternationalBooking = (state) => _.get(state, 'app.companion.flightPricingPage._meta.internationalBooking');

export const isAlreadyHasContactMethod = (state) =>
  contactMethodPageHelper.hasSavedContactMethod(getContactMethod(state), isInternationalBooking(state));

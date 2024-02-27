import _ from 'lodash';
import { getContactMethodContent } from 'src/shared/selectors/contactMethodSelectors';

export const isDeclineNotifications = (state) => {
  const airBookingState = _.get(state, 'app.airBooking');
  const { isInternationalBooking, contactMethodInfo = {} } = airBookingState;
  let declineNotifications = _.toBoolean(contactMethodInfo.declineNotifications);

  if (isInternationalBooking) {
    declineNotifications = declineNotifications || _.isEmpty(_.omit(contactMethodInfo, 'declineNotifications'));
  }

  return declineNotifications;
};

export const getAirBookingContactMethodInfo = (state) => {
  let contactMethodInfo = _.get(state, 'app.airBooking.contactMethodInfo');

  if (isDeclineNotifications(state)) {
    contactMethodInfo = {
      ...contactMethodInfo,
      declineNotifications: true
    };
  }

  return contactMethodInfo;
};

export const getAirBookingContactMethodContent = getContactMethodContent(getAirBookingContactMethodInfo);

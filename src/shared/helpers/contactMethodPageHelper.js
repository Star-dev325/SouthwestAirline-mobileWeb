import _ from 'lodash';
import contactMethodTypes from 'src/shared/constants/contactMethodTypes';
import optionsHelper from 'src/shared/helpers/optionsHelper';
import { LANGUAGES, TRAVEL_MANAGER_OPTIONS } from 'src/shared/constants/contactMethodOptions';

const contactMethodLanguageKeys = optionsHelper.keyMirror(LANGUAGES);
const contactMethodKeys = optionsHelper.keyMirror(TRAVEL_MANAGER_OPTIONS);

function shouldPrefillContactMethod(contactMethod, isInternationalBooking) {
  if (isInternationalBooking && contactMethod === 'CALL_ME') {
    return false;
  }

  return !_.isEmpty(contactMethod);
}

export const hasSavedContactMethod = shouldPrefillContactMethod;

export const _addHyphenForUSPhoneNumber = (countryCode, phoneNumber) => {
  if (countryCode === '1') {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  return phoneNumber;
};

export const convertContactTravelMangerInfo = (info) => {
  const { contactEmail, contactMethod, contactPhone, declineNotifications, email, phoneCountryCode, phoneNumber } = info;
  const travelInfo = {};

  if (declineNotifications) return travelInfo;

  if (contactPhone || contactEmail) return info;

  travelInfo.contactMethod = contactMethod;

  if (contactMethod === contactMethodKeys.CALL_ME) {
    travelInfo.contactPhone = {
      number: phoneNumber,
      countryCode: phoneCountryCode
    };
  } else {
    travelInfo.contactEmail = email;
  }

  return travelInfo;
};

export const isInternationalBookingHelper = (action) =>
  _.get(action, 'response.flightPricingPage._meta.internationalBooking');

export const prefillPassengerInfoHelper = function (contactInfo, isInternationalBooking) {
  const { contactMethod, contactPhone, contactEmail } = contactInfo;

  if (shouldPrefillContactMethod(contactMethod, isInternationalBooking)) {
    const phoneNumber = _.get(contactPhone, 'number');
    const countryCode = _.get(contactPhone, 'countryCode');

    return {
      contactMethod: contactMethodTypes[contactMethod],
      email: contactEmail,
      phoneNumber: _addHyphenForUSPhoneNumber(countryCode, phoneNumber),
      phoneCountryCode: countryCode,
      preferredLanguage: contactMethodLanguageKeys.EN,
      declineNotifications: false,
      isNotificationsEnabled: true
    };
  } else {
    return {};
  }
};

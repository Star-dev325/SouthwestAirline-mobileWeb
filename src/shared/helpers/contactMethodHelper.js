// @flow
import _ from 'lodash';
import optionsHelper from 'src/shared/helpers/optionsHelper';
import { DOMESTIC_OPTIONS } from 'src/shared/constants/contactMethodOptions';
import type { ContactMethodInfo } from 'src/shared/flow-typed/shared.types';
import ContactMethodConstants from 'src/shared/constants/contactMethodConstants';
import contactMethodTypes from 'src/shared/constants/contactMethodTypes';
import i18n from '@swa-ui/locale';

const { CONTACT_METHOD_HELPER_I18N_MAP } = ContactMethodConstants;
const ContactMethodKeys = optionsHelper.keyMirror(DOMESTIC_OPTIONS);

export const generateContactNavigatorLabel = (contactMethodInfo: ContactMethodInfo): ?string => {
  if (_.isEmpty(contactMethodInfo) || _.toBoolean(contactMethodInfo.declineNotifications)) return;
  const { contactMethod, email = '', phoneNumber = '', phoneCountryCode = '' } = contactMethodInfo;

  const formattedPhoneNumber = phoneCountryCode && phoneNumber && `(${phoneCountryCode}) ${phoneNumber}`;

  const content = contactMethod === ContactMethodKeys.EMAIL ? email : formattedPhoneNumber;

  return contactMethod && content && `${DOMESTIC_OPTIONS[contactMethod]}, ${content}`;
};

export const getContactMethodMessage = (contactMethod: ?string): string =>
  `${i18n(CONTACT_METHOD_HELPER_I18N_MAP[contactMethod])}`;

export const omitUselessContactInfoFields = (
  contactMethodInfo: ContactMethodInfo,
  isInternationalBooking: boolean
): ?ContactMethodInfo => {
  const { isNotificationsEnabled } = contactMethodInfo;
  const { declineNotifications = false } = contactMethodInfo;

  if (
    declineNotifications ||
    (isInternationalBooking && !isNotificationsEnabled && isNotificationsEnabled !== undefined)
  ) {
    return {
      declineNotifications: true,
      isNotificationsEnabled: false
    };
  }

  const omitFields =
    contactMethodInfo.contactMethod === ContactMethodKeys.EMAIL ? ['phoneCountryCode', 'phoneNumber'] : ['email'];

  return _.omit(contactMethodInfo, omitFields);
};

export const isContactMethodMissing = (
  contactMethodValue: string,
  emailFieldValue: string,
  numberFieldValue: string,
  countryCodeFieldValue: string
): boolean => {
  if (_.isEmpty(contactMethodValue)) {
    return true;
  }

  if (contactMethodValue === contactMethodTypes.EMAIL_ME) {
    return _.isEmpty(emailFieldValue);
  } else {
    return _.isEmpty(numberFieldValue) || _.isEmpty(countryCodeFieldValue);
  }
};

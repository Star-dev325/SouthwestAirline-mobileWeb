import _ from 'lodash';
import contactMethodTypes from 'src/shared/constants/contactMethodTypes';
import { removeSeparator } from 'src/shared/helpers/separatorHelper';
import countryCodes from 'src/shared/constants/countryCode';

export function transformToSaveContactMethodRequest({ number, contactEmail, countryCode, contactMethod }) {
  const isContactByEmail = contactMethod === 'EMAIL' || contactMethod === 'MAIL';

  return {
    contactMethodUpdate: {
      contactMethod: _.invert(contactMethodTypes)[contactMethod === 'MAIL' ? 'EMAIL' : contactMethod],
      contactPhone: isContactByEmail
        ? null
        : {
          number: _.parseInt(removeSeparator(number)),
          countryCodeNumber: _.parseInt(countryCode) || countryCodes.US
        },
      contactEmail: isContactByEmail ? contactEmail : null
    }
  };
}

import _ from 'lodash';
import validator from 'src/shared/form/formValidators/validator';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import countryCodes from 'src/shared/constants/countryCode';
import { emailReceiptTo, getPhoneNumberRule } from 'src/shared/form/formValidators/sharedFieldValidatorRules';
import { baseFieldRules, basePostal } from 'src/shared/form/constants/baseFormFieldRules';

import i18n from '@swa-ui/locale';

const isRequired = true;

export default () => (formData) => {
  const isCountryCodeNumberEqualOne = countryCodes[formData.phoneCountryCode] === 1;
  const isUS = formData.isoCountryCode === 'US';
  const fieldRules = {
    ...baseFieldRules,
    stateProvinceRegion: _.concat(
      [
        {
          isRequired
        }
      ],
      isUS ? basePostal.stateProvince : []
    ),
    zipOrPostalCode: _.concat(
      [
        {
          isRequired
        }
      ],
      isUS ? basePostal.isUSPostal : basePostal.postalCode
    ),
    phoneNumber: getPhoneNumberRule(isCountryCodeNumberEqualOne),
    email: emailReceiptTo,
    confirmedEmail: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__INVALID_REENTER_EMAIL'),
        validator: (value) => validator.isSameValue(value, formData.email)
      }
    ]
  };
  const formRules = {
    ...sharedFormValidators
  };

  return executeValidators(formData, formRules, fieldRules);
};

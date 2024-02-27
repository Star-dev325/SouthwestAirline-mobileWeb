import _ from 'lodash';
import validator from 'src/shared/form/formValidators/validator';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import { getPhoneNumberRule } from 'src/shared/form/formValidators/sharedFieldValidatorRules';
import countryCodes from 'src/shared/constants/countryCode';
import i18n from '@swa-ui/locale';

const isRequired = true;

export default () => (formData) => {
  const isCountryCodeNumberEqualOne = countryCodes[formData.phoneCountryCode] === 1;
  const isUS = formData.isoCountryCode === 'US';

  const fieldRules = {
    addressLine1: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ADDRESS_LINE_1'),
        validator: validator.isAddress
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ADDRESS_LINE_1_LENGTH'),
        validator: validator.isLengthLessOrEqual(40)
      }
    ],
    addressLine2: [
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ADDRESS_LINE_2'),
        validator: validator.isAddress
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ADDRESS_LINE_2_LENGTH'),
        validator: validator.isLengthLessOrEqual(40)
      }
    ],
    city: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__CITY'),
        validator: validator.isCity
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__CITY_LENGTH'),
        validator: validator.isLengthLessOrEqual(30)
      }
    ],
    stateProvinceRegion: _.concat(
      [
        {
          isRequired
        }
      ],
      isUS
        ? [
          {
            msg: i18n('SHARED__ERROR_MESSAGES__STATE_PROVINCE_REGION'),
            validator: validator.isStateProvinceRegion
          },
          {
            msg: i18n('SHARED__ERROR_MESSAGES__STATE_PROVINCE_REGION_LENGTH'),
            validator: validator.isLengthLessThan(50)
          }
        ]
        : []
    ),
    zipOrPostalCode: _.concat(
      [
        {
          isRequired
        }
      ],
      isUS
        ? [
          {
            msg: i18n('SHARED__ERROR_MESSAGES__ZIP_FOR_US'),
            validator: (value) => validator.isNumeric(value) && validator.isLengthEql(5)(value)
          }
        ]
        : [
          {
            msg: i18n('SHARED__ERROR_MESSAGES__POSTAL_CODE'),
            validator: validator.isPostalCode
          },
          {
            msg: i18n('SHARED__ERROR_MESSAGES__POSTAL_CODE_LENGTH'),
            validator: validator.isLengthLessOrEqual(10)
          }
        ]
    ),
    phoneNumber: getPhoneNumberRule(isCountryCodeNumberEqualOne)
  };
  const formRules = {
    ...sharedFormValidators
  };

  return executeValidators(formData, formRules, fieldRules);
};

// @flow

import _ from 'lodash';

import validator from 'src/shared/form/formValidators/validator';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import i18n from '@swa-ui/locale';

import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';
import {
  emailRules,
  getPhoneNumberRuleWithoutRequired
} from 'src/shared/form/formValidators/sharedFieldValidatorRules';

const destinationFormValidator = (props: *) => (formData: FormData) => {
  const isRequired = true;
  const options = _.get(props, 'destinationConfig', {});
  const contactPhone1IsUS = _.get(formData, 'contactPhone1CountryCode') === '1';
  const contactPhone2IsUS = _.get(formData, 'contactPhone2CountryCode') === '1';
  const isUS = _.get(formData, 'isoCountryCode') === 'US';
  const isRequiredField = (requiredField) => (requiredField ? [{ isRequired }] : []);

  const fieldRules: FieldValidationRules = {
    contactEmail: [...isRequiredField(options.contactEmailRequired), ...emailRules],
    contactPhone1Number: [
      ...isRequiredField(options.contactPhone1Required),
      ...getPhoneNumberRuleWithoutRequired(contactPhone1IsUS)
    ],
    contactPhone2Number: [
      ...isRequiredField(options.contactPhone2Required),
      ...getPhoneNumberRuleWithoutRequired(contactPhone2IsUS)
    ],
    isoCountryCode: [
      {
        isRequired
      }
    ],
    addressLine: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ADDRESS_LINE'),
        validator: validator.isAddress
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ADDRESS_LINE_LENGTH'),
        validator: validator.isLengthLessOrEqual(35)
      }
    ],
    city: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__CITY'),
        validator: validator.isCity
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
    )
  };

  const formRules = {
    ...sharedFormValidators
  };

  return executeValidators(formData, formRules, fieldRules);
};

export default destinationFormValidator;

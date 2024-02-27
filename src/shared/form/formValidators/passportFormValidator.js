// @flow
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import validator from 'src/shared/form/formValidators/validator';
import { getPhoneNumberRuleWithoutRequired } from 'src/shared/form/formValidators/sharedFieldValidatorRules';
import countryCodes from 'src/shared/constants/countryCode';
import i18n from '@swa-ui/locale';

import type { FieldValidationRules } from 'src/shared/form/flow-typed/form.types';
import type { PassportFormData } from 'src/shared/flow-typed/shared.types';

type Props = {
  enableUserToHideEmergencyContact?: boolean
};

const passportFormValidator = (props: Props) => (formData: PassportFormData) => {
  const isEmergencyContactMethodRequired =
    props.enableUserToHideEmergencyContact ||
    formData.emergencyContactName !== '' ||
    formData.emergencyContactPhoneNumber !== '';
  const isUS = countryCodes[formData.emergencyContactCountryCode] === 1;

  const fieldRules: FieldValidationRules = {
    passportNumber: [
      {
        isRequired: true
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__INVALID_PASSPORT_NUMBER'),
        validator: validator.isLengthBetweenOrEqual(4, 15)
      }
    ],
    passportIssuedBy: [
      {
        isRequired: true
      }
    ],
    nationality: [
      {
        isRequired: true
      }
    ],
    passportExpirationDate: [
      {
        isRequired: true
      }
    ],
    countryOfResidence: [
      {
        isRequired: true
      }
    ],
    emergencyContactName: [
      {
        isRequired: isEmergencyContactMethodRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__FULL_NAME_VALID'),
        validator: validator.isFullNameOrFirstNameNoHyphens
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__FULL_NAME_LENGTH_VALID'),
        validator: validator.isFullNameLengthValid
      }
    ],
    emergencyContactPhoneNumber: [
      ...getPhoneNumberRuleWithoutRequired(isUS),
      { isRequired: isEmergencyContactMethodRequired }
    ]
  };

  const formRules = {
    ...sharedFormValidators
  };

  return executeValidators(formData, formRules, fieldRules);
};

export default passportFormValidator;

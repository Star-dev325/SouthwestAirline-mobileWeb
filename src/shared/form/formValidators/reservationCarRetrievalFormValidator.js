// @flow
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import validator from 'src/shared/form/formValidators/validator';
import i18n from '@swa-ui/locale';

import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';

export default () => (formData: FormData) => {
  const fieldRules: FieldValidationRules = {
    confirmationNumber: [
      {
        isRequired: true
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__RESERVATION_CONFIRMATION_NUMBER_INVALID'),
        validator: validator.isAlphanumeric
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__RESERVATION_CONFIRMATION_NUMBER_INVALID'),
        validator: validator.isLengthBetweenOrEqual(1, 20)
      }
    ],
    firstName: [
      {
        isRequired: true
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__CHECK_IN_FIRST_NAME_ERROR'),
        validator: validator.isName
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__CHECK_IN_FIRST_NAME_ERROR'),
        validator: validator.isLengthBetweenOrEqual(1, 30)
      }
    ],
    lastName: [
      {
        isRequired: true
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__CHECK_IN_LAST_NAME_ERROR'),
        validator: validator.isName
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__CHECK_IN_LAST_NAME_ERROR'),
        validator: validator.isLengthBetweenOrEqual(2, 30)
      }
    ],
    pickupDate: [
      {
        isRequired: true
      }
    ]
  };
  const formRules = {
    ...sharedFormValidators
  };

  return executeValidators(formData, formRules, fieldRules);
};

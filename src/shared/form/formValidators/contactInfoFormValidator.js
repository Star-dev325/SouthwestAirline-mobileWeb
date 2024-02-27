// @flow
import validator from 'src/shared/form/formValidators/validator';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidatorRules from 'src/shared/form/formValidators/sharedFormValidatorRules';
import i18n from '@swa-ui/locale';

import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';

export default () => (formData: FormData) => {
  const fieldRules: FieldValidationRules = {
    email: [
      {
        isRequired: true
      },
      {
        validator: validator.isEmail,
        msg: i18n('SHARED__ERROR_MESSAGES__INVALID_EMAIL')
      }
    ],
    sms: [
      {
        isRequired: true
      },
      {
        validator: validator.isFormattedMobilePhone,
        msg: i18n('SHARED__ERROR_MESSAGES__INVALID_PHONE_NUMBER')
      },
      {
        validator: validator.isValidNumericPhoneNumber,
        msg: i18n('SHARED__ERROR_MESSAGES__INVALID_PHONE_NUMBER')
      }
    ]
  };

  const formRules = { ...sharedFormValidatorRules };

  return executeValidators(formData, formRules, fieldRules);
};

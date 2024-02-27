// @flow
import validator from 'src/shared/form/formValidators/validator';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';
import i18n from '@swa-ui/locale';

export default () => (formData: FormData) => {
  const fieldRules: FieldValidationRules = {
    rulesAndRegulationsCheckbox: [
      {
        isRequired: true
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_ACCEPT_RULES_AND_REGULATIONS'),
        validator: (value) => validator.isChecked(value)
      }
    ]
  };

  const formRules = {
    ...sharedFormValidators
  };

  return executeValidators(formData, formRules, fieldRules);
};

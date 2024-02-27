// @flow
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import type { FieldValidationRules } from 'src/shared/form/flow-typed/form.types';
import type { LoginFormDataType } from 'src/login/flow-typed/login.types';

export default () => (formData: LoginFormDataType) => {
  const fieldRules: FieldValidationRules = {
    userNameOrAccountNumber: [
      {
        isRequired: true
      }
    ],
    password: [
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

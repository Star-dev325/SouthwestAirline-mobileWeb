// @flow

import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';

import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';

export const visaFormValidator = () => (formData: FormData) => {
  const fieldRules: FieldValidationRules = {
    number: [
      {
        isRequired: true
      }
    ],
    country: [
      {
        isRequired: true
      }
    ],
    issuedBy: [
      {
        isRequired: true
      }
    ],
    expiration: [
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

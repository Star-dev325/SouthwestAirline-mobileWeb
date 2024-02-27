// @flow

import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';

import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';

const permanentResidentCardFormValidator = () => (formData: FormData) => {
  const fieldRules: FieldValidationRules = {
    type: [
      {
        isRequired: true
      }
    ],
    number: [
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

export default permanentResidentCardFormValidator;

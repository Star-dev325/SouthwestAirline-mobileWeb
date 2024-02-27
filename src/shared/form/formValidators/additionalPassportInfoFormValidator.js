// @flow

import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidatorRules from 'src/shared/form/formValidators/sharedFormValidatorRules';

import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';

export default () => (formData: FormData) => {
  const isRequired = true;

  const fieldRules: FieldValidationRules = {
    permanentResidentCard: [{ isRequired }],
    visa: [{ isRequired }],
    destination: [{ isRequired }]
  };

  const formRules = { ...sharedFormValidatorRules };

  return executeValidators(formData, formRules, fieldRules);
};

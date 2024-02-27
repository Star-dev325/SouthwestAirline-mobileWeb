// @flow
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import {
  firstName,
  getContactInformationRules,
  lastName,
  relationship
} from 'src/shared/form/formValidators/sharedFieldValidatorRules';

import type {
  FieldValidationRules,
  FormData,
  FormValidationErrors,
  FormValidationRules
} from 'src/shared/form/flow-typed/form.types';

export default () =>
  (formData: FormData): FormValidationErrors => {
    const fieldRules: FieldValidationRules = {
      firstName,
      lastName,
      relationship,
      ...getContactInformationRules(formData)
    };
    const formRules: FormValidationRules = { ...sharedFormValidators };

    return executeValidators(formData, formRules, fieldRules);
  };

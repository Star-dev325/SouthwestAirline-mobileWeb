// @flow
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import { fulfillmentEmail } from 'src/shared/form/formValidators/sharedFieldValidatorRules';

import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';

export default ({ needsEmailAddress }: { [string]: boolean }) =>
  (formData: FormData) => {
    const fieldRules: FieldValidationRules = {
      fulfillmentEmail: needsEmailAddress
        ? fulfillmentEmail
        : [
          {
            isRequired: false
          }
        ]
    };
    const formRules = {
      ...sharedFormValidators
    };

    return executeValidators(formData, formRules, fieldRules);
  };

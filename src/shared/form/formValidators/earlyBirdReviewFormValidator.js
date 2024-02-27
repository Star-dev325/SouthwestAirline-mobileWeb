// @flow

import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import { emailRules, securityCodeRule } from 'src/shared/form/formValidators/sharedFieldValidatorRules';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';

import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';

export default ({ receiptEmail }: { receiptEmail: string }) =>
  (formData: FormData) => {
    const isRequired = true;
    const fieldRules: FieldValidationRules = {
      paymentInfo: [{ isRequired }],
      securityCode: [{ isRequired }, securityCodeRule],
      receiptEmail: !receiptEmail ? [{ isRequired }, ...emailRules] : []
    };
    const formRules = {
      ...sharedFormValidators
    };

    return executeValidators(formData, formRules, fieldRules);
  };

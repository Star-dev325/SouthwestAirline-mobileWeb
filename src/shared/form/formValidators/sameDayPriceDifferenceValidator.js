// @flow
import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';
import { emailRules, securityCodeRule } from 'src/shared/form/formValidators/sharedFieldValidatorRules';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';

export default ({ showEmailReceiptTo }: { showEmailReceiptTo: boolean }) =>
  (formData: FormData) => {
    const fieldRules: FieldValidationRules = {
      paymentInfo: [{ isRequired: true }],
      recipientEmail: showEmailReceiptTo ? [{ isRequired: true }, ...emailRules] : [{ isRequired: false }],
      securityCode: [{ isRequired: true }, securityCodeRule]
    };

    const formRules = {
      ...sharedFormValidators
    };

    return executeValidators(formData, formRules, fieldRules);
  };

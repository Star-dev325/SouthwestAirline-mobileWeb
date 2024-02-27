// @flow
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import { emailReceiptTo, securityCodeRule } from 'src/shared/form/formValidators/sharedFieldValidatorRules';

import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';

export default ({ declineNotifications }: { [string]: boolean }) =>
  (formData: FormData) => {
    const fieldRules: FieldValidationRules = {
      contactMethodContent: [
        {
          isRequired: !declineNotifications
        }
      ],
      paymentInfo: [
        {
          isRequired: true
        }
      ],
      refundMethod: [
        {
          isRequired: true
        }
      ],
      emailReceiptTo,
      securityCode: [{ isRequired: true }, securityCodeRule]
    };
    const formRules = {
      ...sharedFormValidators
    };

    return executeValidators(formData, formRules, fieldRules);
  };

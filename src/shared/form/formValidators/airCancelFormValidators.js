// @flow
import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import { emailRules } from 'src/shared/form/formValidators/sharedFieldValidatorRules';

import type { CurrencyLabelType } from 'src/airCancel/flow-typed/airCancel.types';

const isRequired = true;

export const airCancelSummaryFormValidator =
  ({ requireEmailReceipt, refundableFunds }: { requireEmailReceipt: boolean, refundableFunds: ?CurrencyLabelType }) =>
    (formData: FormData) => {
      const fieldRules: FieldValidationRules = {
        refundMethod: refundableFunds ? [{ isRequired }] : [],
        emailReceiptTo: requireEmailReceipt ? [{ isRequired }, ...emailRules] : []
      };

      const formRules = {
        ...sharedFormValidators
      };

      return executeValidators(formData, formRules, fieldRules);
    };

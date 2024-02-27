// @flow
import _ from 'lodash';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';

import { SIMPLE_ERROR_POPUP } from 'src/shared/form/constants/validationErrorTypes';
import i18n from '@swa-ui/locale';

import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';
import { emailReceiptTo, securityCodeRule } from 'src/shared/form/formValidators/sharedFieldValidatorRules';

export const hasSelectedProductValidator = (formData: FormData) => {
  const paxFormData = _.omit(formData, 'paymentInfo', emailReceiptTo, 'receiptEmail', 'securityCode');

  return _.some(paxFormData);
};

export default () => (formData: FormData) => {
  const fieldRules: FieldValidationRules = {
    paymentInfo: [
      {
        isRequired: true
      }
    ],
    receiptEmail: emailReceiptTo,
    securityCode: [{ isRequired: true }, securityCodeRule]
  };
  const hasSelectedProduct = [
    {
      type: SIMPLE_ERROR_POPUP,
      msg: i18n('UB_NO_SELECTION_ERROR_MESSAGE'),
      validator: hasSelectedProductValidator
    }
  ];

  const formRules = {
    ...sharedFormValidators,
    hasSelectedProduct
  };

  return executeValidators(formData, formRules, fieldRules);
};

// @flow
import validator from 'src/shared/form/formValidators/validator';
import i18n from '@swa-ui/locale';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidatorRules from 'src/shared/form/formValidators/sharedFormValidatorRules';

import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';

export default () => (formData: FormData) => {
  const fieldRules: FieldValidationRules = {
    manualIrn: [
      {
        validator: validator.isIrn,
        msg: i18n('SHARED__ERROR_MESSAGES__INVALID_INFO')
      }
    ]
  };

  const formRules = { ...sharedFormValidatorRules };

  return executeValidators(formData, formRules, fieldRules);
};

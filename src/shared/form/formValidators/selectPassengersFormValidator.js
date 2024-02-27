// @flow
import i18n from '@swa-ui/locale';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import { ERROR_HEADER } from 'src/shared/form/constants/validationErrorTypes';
import { emailReceiptTo } from 'src/shared/form/formValidators/sharedFieldValidatorRules';
import { getSelectedPassengerIds } from 'src/shared/helpers/selectPassengersHelper';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';

const fieldRules: FieldValidationRules = { receiptEmail: emailReceiptTo };

const hasSelectedPassengerValidator = (formData: FormData) => {
  const selectedPassengerIds = getSelectedPassengerIds(formData);

  return selectedPassengerIds.length > 0;
};

const hasSelectedPassenger = [
  {
    msg: i18n('SHARED__SELECT_PASSENGERS__NO_SELECTION_ERROR_MESSAGE'),
    type: ERROR_HEADER,
    validator: hasSelectedPassengerValidator
  }
];

export default () => (formData: FormData) => {
  const formRules = { hasSelectedPassenger, ...sharedFormValidators };

  return executeValidators(formData, formRules, fieldRules);
};

import _ from 'lodash';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import { ERROR_HEADER } from 'src/shared/form/constants/validationErrorTypes';
import i18n from '@swa-ui/locale';

export const hasPassesSelected = [
  {
    msg: i18n('SHARED__ERROR_MESSAGES__CHECKIN_MP_PASSES_NONE_SELECTED'),
    type: ERROR_HEADER,
    validator: (formData) => _.some(_.values(formData))
  }
];

export default () => (formData) => {
  const formRules = {
    ...sharedFormValidators,
    hasPassesSelected
  };

  return executeValidators(formData, formRules, {});
};

import _ from 'lodash';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import i18n from '@swa-ui/locale';
import { ERROR_HEADER } from 'src/shared/form/constants/validationErrorTypes';

export const hasSelectedBound = [
  {
    msg: i18n('SHARED__ERROR_MESSAGES__AIR_UPGRADE_SELECT_BLANK'),
    type: ERROR_HEADER,
    validator: (formData) => _.some(_.values(formData))
  }
];

export default () => (formData) => {
  const formRules = {
    hasSelectedBound
  };

  return executeValidators(formData, formRules, {});
};

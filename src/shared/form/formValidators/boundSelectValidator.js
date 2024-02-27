import _ from 'lodash';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import i18n from '@swa-ui/locale';

import { ERROR_HEADER } from 'src/shared/form/constants/validationErrorTypes';

export const hasSelectedFlightChange = [
  {
    msg: i18n('SHARED__ERROR_MESSAGES__AIR_CHANGE_SELECT_BLANK'),
    type: ERROR_HEADER,
    validator: (formData) => _.some(_.values(formData))
  }
];

export const hasSelectedFlightCancel = [
  {
    msg: i18n('SHARED__ERROR_MESSAGES__AIR_CANCEL_BOUND_SELECT_BLANK'),
    type: ERROR_HEADER,
    validator: (formData) => _.some(_.values(formData))
  }
];

export default (props) => (formData) => {
  const { boundCancel } = props;

  const formRules = {
    hasSelectedFlight: boundCancel ? hasSelectedFlightCancel : hasSelectedFlightChange
  };

  return executeValidators(formData, formRules, {});
};

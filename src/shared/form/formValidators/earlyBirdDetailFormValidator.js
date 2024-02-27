import _ from 'lodash';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import { ERROR_HEADER } from 'src/shared/form/constants/validationErrorTypes';
import i18n from '@swa-ui/locale';

export const isPassengerCheckedEarlyBird = [
  {
    type: ERROR_HEADER,
    msg: i18n('SHARED__ERROR_MESSAGES__NO_PASSENGER_CHECKED_ERROR_MESSAGE'),
    validator: (formData) => _.some(formData)
  }
];

export default () => (formData) => {
  const formRules = {
    isPassengerCheckedEarlyBird
  };

  return executeValidators(formData, formRules, {});
};

import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import validator from 'src/shared/form/formValidators/validator';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import { SIMPLE_ERROR_POPUP } from 'src/shared/form/constants/validationErrorTypes';
import i18n from '@swa-ui/locale';

const isRequired = true;

export default () => (formData) => {
  const fieldRules = {
    origin: [
      {
        isRequired
      }
    ],
    destination: [
      {
        isRequired
      }
    ]
  };
  const formRules = {
    ...sharedFormValidators,
    isDepartureAndArrivalNotSame: [
      {
        type: SIMPLE_ERROR_POPUP,
        msg: i18n('SHARED__ERROR_MESSAGES__DEPARTURE_AND_ARRIVAL_NOT_BE_SAME'),
        validator: validator.isValidDepartureAndArrival
      }
    ]
  };

  return executeValidators(formData, formRules, fieldRules);
};
